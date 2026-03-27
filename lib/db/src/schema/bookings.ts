import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingRequests = pgTable("booking_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  requestType: text("request_type").default("Intro Call"),
  timezone: text("timezone").notNull().default("America/Chicago"),
  meetingType: text("meeting_type").notNull().default("Zoom"),
  timeWindow1: text("time_window_1").notNull().default(""),
  timeWindow2: text("time_window_2").notNull().default(""),
  timeWindow3: text("time_window_3").notNull().default(""),
  phone: text("phone"),
  notes: text("notes"),
  website: text("website"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookingRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email is required"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  notes: z.string().min(10, "Please describe your current Salesforce challenge"),
  timeWindow1: z.string().default(""),
  timeWindow2: z.string().default(""),
  timeWindow3: z.string().default(""),
  website: z.string().optional(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingRequests.$inferSelect;
