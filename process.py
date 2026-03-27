import os

schema_code = """import { z } from "zod";

const insertBookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  requestType: z.string(),
  timezone: z.string(),
  meetingType: z.string(),
  timeWindow1: z.string().optional(),
  timeWindow2: z.string().optional(),
  timeWindow3: z.string().optional(),
  notes: z.string().min(10, "Please provide more details (at least 10 characters)"),
});

type InsertBooking = z.infer<typeof insertBookingSchema>;"""

def replace_schema(file_path, dest_path):
    with open(file_path, "r") as f:
        content = f.read()
    content = content.replace('import { insertBookingSchema, type InsertBooking } from "@shared/schema";', schema_code)
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, "w") as f:
        f.write(content)

replace_schema("/tmp/salesforce-restore/2026-03-25/home.tsx", "artifacts/salesforcemark/src/pages/home.tsx")
replace_schema("/tmp/salesforce-restore/2026-03-25/bridge.tsx", "artifacts/salesforcemark/src/pages/bridge.tsx")

with open("artifacts/salesforcemark/src/index.css", "r") as f:
    css_content = f.read()

replacements = {
    "--background": "0 0% 100%",
    "--foreground": "222.2 84% 4.9%",
    "--primary": "225 73% 32%",
    "--primary-foreground": "0 0% 100%",
    "--secondary": "210 40% 96.1%",
    "--secondary-foreground": "222.2 47.4% 11.2%",
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "215.4 16.3% 46.9%",
    "--accent": "210 40% 96.1%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "0 0% 98%",
    "--border": "214.3 31.8% 91.4%",
    "--input": "214.3 31.8% 91.4%",
    "--ring": "225 73% 32%",
    "--card": "0 0% 100%",
    "--card-foreground": "222.2 84% 4.9%",
    "--card-border": "214.3 31.8% 91.4%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "222.2 84% 4.9%",
    "--popover-border": "214.3 31.8% 91.4%",
    "--sidebar": "0 0% 98%",
    "--sidebar-foreground": "240 5.3% 26.1%",
    "--sidebar-border": "220 13% 91%",
    "--sidebar-primary": "240 5.9% 10%",
    "--sidebar-primary-foreground": "0 0% 98%",
    "--sidebar-accent": "240 4.8% 95.9%",
    "--sidebar-accent-foreground": "240 5.9% 10%",
    "--sidebar-ring: red; /*replace with H S L */": "--sidebar-ring: 217.2 91.2% 59.8%;",
    "--chart-1: red; /*replace with H S L */": "--chart-1: 220 70% 50%;",
    "--chart-2: red; /*replace with H S L */": "--chart-2: 220 70% 50%;",
    "--chart-3: red; /*replace with H S L */": "--chart-3: 220 70% 50%;",
    "--chart-4: red; /*replace with H S L */": "--chart-4: 220 70% 50%;",
    "--chart-5: red; /*replace with H S L */": "--chart-5: 220 70% 50%;"
}

for key, value in replacements.items():
    if key.endswith("*/"):
        css_content = css_content.replace(key, value)
    else:
        css_content = css_content.replace(f"{key}: red; /*replace with H S L */", f"{key}: {value};")

with open("artifacts/salesforcemark/src/index.css", "w") as f:
    f.write(css_content)
