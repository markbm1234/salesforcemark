import { Router, type IRouter } from "express";
import { db, bookingRequests, insertBookingSchema } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function titleCase(str: string): string {
  return str.trim().replace(/\s+/g, " ").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

function cleanEmail(email: string): string {
  return email.trim().toLowerCase();
}

function cleanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10) return phone.trim();
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

function sanitizeFormData(data: Record<string, unknown>): Record<string, unknown> {
  return {
    ...data,
    name: titleCase((data.name as string) || ""),
    email: cleanEmail((data.email as string) || ""),
    company: data.company ? titleCase(data.company as string) : "",
    phone: data.phone ? cleanPhone(data.phone as string) : "",
  };
}

async function getLocationFromIp(ip: string): Promise<{ city: string; state: string }> {
  const empty = { city: "", state: "" };
  try {
    const cleaned = ip.replace("::ffff:", "").trim();
    if (!cleaned || cleaned === "127.0.0.1" || cleaned === "::1") return empty;
    const res = await fetch(`http://ip-api.com/json/${cleaned}?fields=status,city,regionName,country`);
    if (!res.ok) return empty;
    const geo = await res.json() as { status?: string; city?: string; regionName?: string; country?: string };
    if (geo.status !== "success") return empty;
    return { city: geo.city || "", state: geo.regionName || "" };
  } catch {
    return empty;
  }
}

async function addToMailerLite(data: Record<string, unknown>, clientIp: string): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) {
    logger.warn("MailerLite not configured — skipping subscriber push");
    return false;
  }

  try {
    const { city, state } = await getLocationFromIp(clientIp);
    const nameParts = ((data.name as string) || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

    const fields: Record<string, string> = {
      name: firstName,
      last_name: lastName,
      company: (data.company as string) || "",
      phone: (data.phone as string) || "",
      salesforce_challenge: (data.notes as string) || "",
    };
    if (city) fields.city = city;
    if (state) fields.state = state;

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: data.email,
        fields,
        groups: [groupId],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      logger.error({ status: res.status, body }, "MailerLite API error");
      return false;
    }
    logger.info({ email: data.email }, "MailerLite: subscriber added");
    return true;
  } catch (err) {
    logger.error({ err }, "MailerLite request failed");
    return false;
  }
}

router.post("/bookings", async (req, res): Promise<void> => {
  const cleaned = sanitizeFormData(req.body);
  const parsed = insertBookingSchema.safeParse(cleaned);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.message });
    return;
  }

  const [booking] = await db.insert(bookingRequests).values(parsed.data).returning();

  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "";
  addToMailerLite(parsed.data as Record<string, unknown>, clientIp).catch(() => {});

  res.status(201).json({
    success: true,
    id: booking.id,
    message: "Your request was saved. Mark will reply with a calendar invite and agenda.",
  });
});

router.get("/robots.txt", (_req, res): void => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nSitemap: https://salesforcemark.com/sitemap.xml\n`
  );
});

router.get("/sitemap.xml", (_req, res): void => {
  res.type("application/xml").send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://salesforcemark.com/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`
  );
});

export default router;
