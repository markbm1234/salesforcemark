import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const insertBookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  requestType: z.string().optional(),
  timezone: z.string().optional(),
  meetingType: z.string().optional(),
  timeWindow1: z.string().optional().default(""),
  timeWindow2: z.string().optional().default(""),
  timeWindow3: z.string().optional().default(""),
  notes: z.string().min(10, "Please describe your current Salesforce challenge"),
  website: z.string().optional(),
});
type InsertBooking = z.infer<typeof insertBookingSchema>;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, CheckCircle2, Menu, X, BarChart3, Users, Database, Zap, Search, Wrench, Rocket, TrendingUp, ChevronRight, AlertTriangle, Mail, Award, Building2, Briefcase, Shield, XCircle, MapPin } from "lucide-react";
import headshotImg from "@assets/mark-salesforce-digital-marketing-ecommerce-consultant_1772681804917.jpeg";
import aboutHeadshotImg from "@assets/salesforce-mark_1773059465958.jpg";
import logoImg from "@assets/salesforce-mark-trans_1772743593281.png";
import certBannerImg from "@assets/certifications-and-skills2_1772747632293.png";
import heroCertBadges from "@assets/certified-salesforce-professional_1773064053755.png";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.04]" viewBox="0 0 800 800" fill="none">
        <circle cx="600" cy="200" r="300" stroke="#1E3A8A" strokeWidth="1.5" />
        <circle cx="600" cy="200" r="200" stroke="#2563EB" strokeWidth="1" />
        <circle cx="600" cy="200" r="100" stroke="#1E3A8A" strokeWidth="0.8" />
        <path d="M400 100 L700 100 L700 350 L400 350 Z" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="8 6" fill="none" />
        <path d="M450 150 L650 150 L650 300 L450 300 Z" stroke="#1E3A8A" strokeWidth="0.6" fill="none" />
        <line x1="500" y1="300" x2="500" y2="170" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="530" y1="300" x2="530" y2="200" stroke="#1E3A8A" strokeWidth="1.5" />
        <line x1="560" y1="300" x2="560" y2="180" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="590" y1="300" x2="590" y2="220" stroke="#1E3A8A" strokeWidth="1.5" />
        <line x1="620" y1="300" x2="620" y2="190" stroke="#2563EB" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.03]" viewBox="0 0 600 600" fill="none">
        <path d="M50 500 Q150 300 300 350 Q450 400 500 200" stroke="#1E3A8A" strokeWidth="2" fill="none" />
        <path d="M80 520 Q180 320 330 370 Q480 420 530 220" stroke="#2563EB" strokeWidth="1" fill="none" strokeDasharray="6 4" />
        <circle cx="150" cy="400" r="6" fill="#1E3A8A" opacity="0.3" />
        <circle cx="300" cy="350" r="6" fill="#2563EB" opacity="0.3" />
        <circle cx="450" cy="280" r="6" fill="#1E3A8A" opacity="0.3" />
      </svg>
      <div className="absolute top-20 left-[10%] w-[400px] h-[400px] rounded-full bg-[#2563EB]/[0.03] blur-3xl" />
      <div className="absolute bottom-10 right-[5%] w-[300px] h-[300px] rounded-full bg-[#1E3A8A]/[0.04] blur-3xl" />
    </div>
  );
}

function BookCallBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <svg className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.04]" viewBox="0 0 500 500" fill="none">
        <circle cx="100" cy="100" r="180" stroke="#1E3A8A" strokeWidth="1" />
        <circle cx="100" cy="100" r="120" stroke="#2563EB" strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M60 200 L60 100 L160 100" stroke="#1E3A8A" strokeWidth="1.5" fill="none" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-[0.03]" viewBox="0 0 600 400" fill="none">
        <path d="M200 380 Q300 200 400 250 Q500 300 580 150" stroke="#2563EB" strokeWidth="1.5" fill="none" />
        <rect x="350" y="250" width="120" height="80" rx="4" stroke="#1E3A8A" strokeWidth="0.6" fill="none" />
        <line x1="370" y1="310" x2="370" y2="270" stroke="#2563EB" strokeWidth="2" />
        <line x1="390" y1="310" x2="390" y2="285" stroke="#1E3A8A" strokeWidth="2" />
        <line x1="410" y1="310" x2="410" y2="275" stroke="#2563EB" strokeWidth="2" />
        <line x1="430" y1="310" x2="430" y2="260" stroke="#1E3A8A" strokeWidth="2" />
        <line x1="450" y1="310" x2="450" y2="280" stroke="#2563EB" strokeWidth="2" />
      </svg>
      <div className="absolute top-10 right-[15%] w-[350px] h-[350px] rounded-full bg-[#2563EB]/[0.03] blur-3xl" />
      <div className="absolute bottom-20 left-[10%] w-[250px] h-[250px] rounded-full bg-[#1E3A8A]/[0.03] blur-3xl" />
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Services", id: "services" },
    { label: "Process", id: "process" },
    { label: "About", id: "about" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "book-a-call" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]" data-testid="navbar">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[72px] md:h-[110px]">
          <button onClick={() => scrollTo("hero")} className="shrink-0" data-testid="link-logo">
            <img src={logoImg} alt="Salesforce Mark — Salesforce Consultant" className="h-[56px] md:h-[100px] w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-[15px] font-medium text-[#6B7280] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 rounded-md"
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => scrollTo("book-a-call")} size="sm" className="border-0 bg-[#F59E0B] hover:bg-[#FBBF24] text-white font-bold shadow-sm px-4" data-testid="button-book-call-nav">
              <span className="hidden sm:inline">Free Salesforce Review</span>
              <span className="sm:hidden">Free Review</span>
            </Button>
            <button
              className="md:hidden p-2 text-[#6B7280]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E7EB] px-6 pb-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left px-3 py-3 min-h-[48px] text-[15px] font-medium text-[#6B7280] rounded-md"
              data-testid={`link-mobile-${link.id}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-[92px] pb-20 sm:pt-[130px] sm:pb-24 md:pt-[150px] md:pb-24 bg-[#F8FAFC]" data-testid="section-hero">
      <HeroBackground />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-16">
          <div className="shrink-0 order-1 md:order-1">
            <div className="relative">
              <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-[#1E3A8A]/[0.08] rounded-[20px]" />
              <img
                src={headshotImg}
                alt="Mark Mathis — Salesforce Consultant specializing in data cleanup, lead routing, and CRM automation"
                className="relative w-[220px] sm:w-[340px] lg:w-[420px] aspect-[4/5] object-cover rounded-[20px] border border-[#E5E7EB] shadow-sm"
                data-testid="img-headshot"
              />
            </div>
            <div className="flex justify-center mt-4">
              <img
                src={heroCertBadges}
                alt="Salesforce Certified Administrator and AI Associate badges"
                className="w-[216px] sm:w-[270px] lg:w-[324px] opacity-90"
                data-testid="img-hero-cert-badges"
              />
            </div>
          </div>

          <div className="order-2 md:order-2 text-center md:text-left">
            <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#2563EB] mb-4" data-testid="text-eyebrow">
              Salesforce Consultant &bull; RevOps Automation
            </p>

            <h1 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-[#111827] leading-[1.2] tracking-tight" data-testid="text-hero-title">
              Salesforce Data Cleanup,<br />
              Lead Automation, and<br />
              <span className="text-[#1E3A8A]">Reporting Support</span>
            </h1>

            <p className="mt-6 text-[17px] text-[#6B7280] leading-[1.6] max-w-[540px]" data-testid="text-hero-subtitle">
              I help Salesforce consulting firms, RevOps teams, and growing companies clean up messy data, automate lead flow, improve reporting, and stabilize Salesforce after implementation.
            </p>

            <ul className="mt-5 space-y-2 text-center md:text-left max-w-[480px] mx-auto md:mx-0">
              {[
                "Available for project-based and subcontract Salesforce work",
                "Data cleanup, deduplication, and CRM normalization",
                "Lead routing, automation, reporting, and integrations",
                "Zapier and Clay workflow support",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 justify-center md:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <span className="text-[14px] text-[#111827] leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-1 text-center md:text-left" data-testid="text-experience">
              <p className="text-[14px] text-[#111827] font-medium leading-[1.5]">
                25+ years in technology, digital marketing, CRM, and automation
              </p>
              <p className="text-[14px] text-[#6B7280] leading-[1.5]">
                Experience includes Accenture, Chevron, Halliburton, and Duke Energy
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <Button size="lg" onClick={() => scrollTo("book-a-call")} className="border-0 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[16px] px-7 shadow-lg shadow-[#F59E0B]/25" data-testid="button-hero-book">
                Discuss a Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <button
                onClick={() => scrollTo("consulting-firms")}
                className="text-[15px] font-medium text-[#1E3A8A] border border-[#1E3A8A]/30 px-5 py-2.5 rounded-lg hover:bg-[#1E3A8A]/[0.05] transition-colors"
                data-testid="button-hero-consulting"
              >
                For Consulting Firms
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ConsultingFirmsSection() {
  const cards = [
    {
      title: "Consulting Firms",
      copy: "Need help delivering part of a Salesforce project? I can support data cleanup, dashboards, automation, lead flow, and org optimization work as a subcontract or overflow resource.",
      icon: Briefcase,
    },
    {
      title: "RevOps / Marketing Ops Teams",
      copy: "I help internal teams improve lead management, routing, reporting visibility, campaign tracking, and Salesforce data quality without requiring a full rebuild.",
      icon: BarChart3,
    },
    {
      title: "Direct Companies",
      copy: "If your company finds me directly, I also take on targeted Salesforce projects involving cleanup, automation, reporting, and marketing-to-Salesforce workflow improvements.",
      icon: Building2,
    },
  ];

  return (
    <section id="consulting-firms" className="py-20 sm:py-24 bg-white" data-testid="section-consulting-firms">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-consulting-title">
          Support for Consulting Firms, Agencies, and Internal Teams
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-12 leading-[1.6]">
          I frequently support Salesforce consulting firms, RevOps teams, and marketing agencies with specialized project work. This includes data cleanup, reporting builds, lead routing logic, Salesforce optimization, Zapier integrations, and post-implementation cleanup.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#EEF4FF] p-6 border border-[#DBEAFE]"
              style={{ boxShadow: "0 4px 6px -1px rgba(30,58,138,0.07), 0 10px 20px -5px rgba(30,58,138,0.10)" }}
              data-testid={`card-consulting-${i}`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <h3 className="text-[17px] font-bold text-[#111827] mb-3">{card.title}</h3>
              <p className="text-[15px] text-[#6B7280] leading-[1.6]">{card.copy}</p>
            </div>
          ))}
        </div>

        <p className="text-[14px] text-[#6B7280] text-center italic">
          Best fit: scoped projects, cleanup work, reporting/dashboard builds, automation projects, and Salesforce stabilization work.
        </p>
      </div>
    </section>
  );
}

const whoWeHelpCards = [
  {
    title: "Salesforce Consulting Firms",
    copy: "Overflow project work, subcontract support, cleanup tasks, dashboard/reporting builds, automation support, and implementation follow-through.",
    icon: Briefcase,
  },
  {
    title: "Internal RevOps / Marketing Ops Teams",
    copy: "Support for lead routing, CRM data cleanup, reporting visibility, campaign tracking, and operational automation.",
    icon: Users,
  },
  {
    title: "Growing Companies with Messy Salesforce Setups",
    copy: "Best for companies needing cleanup, process improvement, practical automation, and better reporting without a massive consulting engagement.",
    icon: Building2,
  },
];

function WhoWeHelpSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-who-we-help">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-who-title">
          Who We Work Best With
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-12 leading-[1.6]">
          Most clients come to us after Salesforce has been running for a while and their data, lead routing, or reporting has become messy.
        </p>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {whoWeHelpCards.map((card, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-6 border border-[#E5E7EB]"
              style={{ boxShadow: "0 4px 6px -1px rgba(30,58,138,0.06), 0 10px 20px -5px rgba(30,58,138,0.08)" }}
              data-testid={`card-who-${i}`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-[#D97706]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#111827] mb-2">{card.title}</h3>
              <p className="text-[14px] text-[#6B7280] leading-[1.6]">{card.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const problems = [
  { text: "Duplicate leads and contacts causing confusion", icon: Database },
  { text: "Messy Salesforce data that cannot be trusted", icon: AlertTriangle },
  { text: "Lead routing that breaks or requires manual work", icon: Zap },
  { text: "Reports and dashboards that do not reflect reality", icon: BarChart3 },
  { text: "Marketing and form data not syncing cleanly", icon: Search },
  { text: "Poor campaign tracking and attribution visibility", icon: TrendingUp },
  { text: "Salesforce setup that works, but needs cleanup and optimization", icon: Wrench },
  { text: "Post-implementation issues nobody has time to fix", icon: Users },
];

function ProblemsSection() {
  return (
    <section id="problems" className="py-20 sm:py-24 bg-white" data-testid="section-problems">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-problems-title">
          Common Salesforce Problems We Help Fix
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-10 whitespace-nowrap">
          These are the exact pains our clients come to us with. Sound familiar?
        </p>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl bg-[#EEF4FF] p-5 border border-[#DBEAFE] transition-all duration-200 hover:border-[#F59E0B]/40 hover:shadow-md"
              data-testid={`text-problem-${i}`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
                <problem.icon className="w-5 h-5 text-[#D97706]" />
              </div>
              <span className="text-[15px] font-medium text-[#111827] leading-[1.5] pt-2">{problem.text}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#consulting-firms"
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#FBBF24] text-white font-bold text-[16px] px-8 py-3 rounded-lg shadow-md transition-all"
            data-testid="button-problems-cta"
          >
            See Project Support Options →
          </a>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Salesforce Data Cleanup & Deduplication",
    sentence: "Clean and normalize Salesforce data so users can trust what they see. Ideal for lead, contact, account, and campaign cleanup projects.",
    bullets: [
      "Duplicate review and cleanup planning",
      "Field normalization and standardization",
      "Lead/contact/account cleanup",
      "CRM cleanup after implementation",
      "Data quality improvement",
    ],
    icon: Database,
    accentColor: "#1E3A8A",
    gradientFrom: "from-[#1E3A8A]",
    gradientTo: "to-[#2563EB]",
  },
  {
    title: "Reporting & Dashboard Builds",
    sentence: "Create practical Salesforce reports and dashboards that help management see lead flow, pipeline activity, and marketing performance clearly.",
    bullets: [
      "Executive dashboards",
      "Lead and pipeline reporting",
      "Campaign and funnel reporting",
      "Conversion visibility",
      "Reporting cleanup and rebuilds",
    ],
    icon: BarChart3,
    accentColor: "#1E40AF",
    gradientFrom: "from-[#1E40AF]",
    gradientTo: "to-[#1E3A8A]",
  },
  {
    title: "Lead Routing & Automation Support",
    sentence: "Improve lead handling with cleaner routing logic, assignment workflows, automation, and follow-up triggers.",
    bullets: [
      "Lead assignment logic",
      "Routing by geography, source, or segment",
      "Follow-up workflow automation",
      "Alerting and task creation",
      "Lead flow cleanup",
    ],
    icon: Rocket,
    accentColor: "#2563EB",
    gradientFrom: "from-[#2563EB]",
    gradientTo: "to-[#3B82F6]",
  },
  {
    title: "Zapier + Salesforce Integrations",
    sentence: "Connect forms, lead sources, spreadsheets, and operational tools into Salesforce with cleaner logic and better control.",
    bullets: [
      "Form-to-Salesforce workflows",
      "Create vs update logic",
      "Data transformation and cleanup",
      "Notifications and routing",
      "Integration troubleshooting",
    ],
    icon: Zap,
    accentColor: "#2563EB",
    gradientFrom: "from-[#1E3A8A]",
    gradientTo: "to-[#3B82F6]",
  },
  {
    title: "Clay Enrichment Workflows",
    sentence: "Support Clay-based enrichment workflows for company and lead data, especially when paired with Salesforce and Zapier.",
    bullets: [
      "Enrichment process design",
      "Batch or staged enrichment workflows",
      "Enrichment field mapping",
      "Data quality tracking",
      "Enrichment-driven routing support",
    ],
    icon: Users,
    accentColor: "#1E3A8A",
    gradientFrom: "from-[#2563EB]",
    gradientTo: "to-[#1E3A8A]",
  },
  {
    title: "Post-Implementation Cleanup & Optimization",
    sentence: "Help after Salesforce has already been implemented but still needs cleanup, stabilization, or practical improvement.",
    bullets: [
      "Cleanup after go-live",
      "Fix incomplete setup work",
      "Simplify messy processes",
      "Improve adoption with cleaner workflows",
      "Stabilize orgs already in use",
    ],
    icon: Wrench,
    accentColor: "#1E3A8A",
    gradientFrom: "from-[#1E3A8A]",
    gradientTo: "to-[#2563EB]",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-24 bg-[#F1F5FF]" data-testid="section-services">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[30px] sm:text-[34px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-services-title">
          Specialized Salesforce Services
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-14 leading-[1.6]">
          We focus on the areas where Salesforce systems most often break down: data quality, lead flow, automation, and reporting.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative rounded-xl bg-white p-7 transition-all duration-300 hover:-translate-y-1 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              style={{ boxShadow: "0 4px 6px -1px rgba(30,58,138,0.08), 0 10px 30px -5px rgba(30,58,138,0.12), 0 1px 3px rgba(0,0,0,0.04)" }}
              data-testid={`card-service-${i}`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-xl bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo}`} />
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} flex items-center justify-center shrink-0 shadow-md`}
                  style={{ boxShadow: `0 4px 14px -2px ${service.accentColor}40` }}
                >
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[17px] font-bold text-[#111827] leading-snug pt-1">{service.title}</h3>
              </div>
              <p className="text-[15px] text-[#6B7280] leading-[1.6] mb-4">{service.sentence}</p>
              <ul className="space-y-2">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[14px] text-[#111827]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: service.accentColor }} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyDifferent = [
  {
    title: "Practical, Deliverable-Based Work",
    copy: "Focused on scoped Salesforce projects that can be clearly defined, completed, and handed off cleanly.",
    icon: Rocket,
  },
  {
    title: "Strong with Cleanup and Stabilization",
    copy: "Especially useful when an org has already been implemented but still needs cleanup, reporting, automation, or data improvement.",
    icon: Wrench,
  },
  {
    title: "Comfortable Supporting Existing Teams",
    copy: "Can work alongside consulting firms, RevOps teams, or internal stakeholders without needing to own the full engagement.",
    icon: Users,
  },
  {
    title: "Marketing + CRM + Automation Perspective",
    copy: "Useful for projects involving lead flow, form integrations, campaign tracking, reporting, and Salesforce operational workflows.",
    icon: Zap,
  },
];

function WhyDifferentSection() {
  return (
    <section className="py-20 sm:py-24 bg-white" data-testid="section-why-different">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-12" data-testid="text-why-title">
          Why Clients Work With Me
        </h2>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          {whyDifferent.map((item, i) => (
            <div key={i} className="bg-[#EEF4FF] border border-[#DBEAFE] rounded-xl p-6" data-testid={`text-why-${i}`}>
              <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#111827] mb-2">{item.title}</h3>
              <p className="text-[14px] text-[#6B7280] leading-[1.6]">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const specializedProjectBullets = [
  "Data cleanup and CRM normalization",
  "Reports and dashboards",
  "Lead routing and assignment support",
  "Zapier workflow builds and cleanup",
  "Campaign and funnel tracking",
  "Post-implementation Salesforce cleanup",
];

function ZapierClaySection() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-zapier-clay">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-zapier-title">
          Specialized Salesforce Project Support
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-12 leading-[1.6]">
          This site is not meant to position Mark as a giant full-service consulting firm. The best fit is specialized Salesforce project work: data cleanup, reporting, lead routing, automation, integrations, and practical optimization that helps existing teams move faster.
        </p>

        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {specializedProjectBullets.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#E5E7EB]" data-testid={`text-zapier-${i}`}>
              <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] mt-0.5 shrink-0" />
              <span className="text-[15px] text-[#111827] leading-[1.5]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    step: "1",
    title: "Review the Scope",
    subtitle: "Start here",
    description: "Quickly assess the problem, desired outcome, and current Salesforce setup.",
    icon: Search,
  },
  {
    step: "2",
    title: "Align on the Work",
    subtitle: "Scoping",
    description: "Define what needs to be fixed, cleaned up, built, or improved.",
    icon: Mail,
  },
  {
    step: "3",
    title: "Complete the Project Work",
    subtitle: "Execution",
    description: "Handle the agreed cleanup, reporting, automation, routing, or integration tasks.",
    icon: Rocket,
  },
  {
    step: "4",
    title: "Validate and Hand Off",
    subtitle: "Delivery",
    description: "Review the work, confirm it functions as expected, and hand it off cleanly to your team or client.",
    icon: TrendingUp,
  },
];

function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-24 bg-white" data-testid="section-process">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[30px] sm:text-[34px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-process-title">
          Simple Project Support Process
        </h2>
        <p className="text-[18px] text-[#6B7280] text-center max-w-xl mx-auto mb-16">
          Straightforward to engage. No heavy onboarding or long procurement cycles required.
        </p>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-[28px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[2px] bg-[#E5E7EB]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] opacity-30 rounded-full" />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <div key={step.step} className="relative text-center" data-testid={`card-process-${step.step}`}>
                  <div className="relative mx-auto mb-6 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white border-[3px] border-[#1E3A8A] flex items-center justify-center shadow-md z-10">
                      <step.icon className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                  </div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563EB] mb-2">
                    Step {step.step}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#111827] mb-1">{step.title}</h3>
                  <p className="text-[13px] font-medium text-[#F59E0B] mb-2">{step.subtitle}</p>
                  <p className="text-[14px] text-[#6B7280] leading-[1.6] max-w-[240px] mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-0">
          {processSteps.map((step, i) => (
            <div key={step.step} className="relative flex gap-5" data-testid={`card-process-mobile-${step.step}`}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#1E3A8A] flex items-center justify-center shadow-md z-10 shrink-0">
                  <step.icon className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-[#E5E7EB] my-1" />
                )}
              </div>
              <div className="pb-10">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563EB] mb-1">
                  Step {step.step}
                </span>
                <h3 className="text-[18px] font-bold text-[#111827] mb-1">{step.title}</h3>
                <p className="text-[13px] font-medium text-[#F59E0B] mb-2">{step.subtitle}</p>
                <p className="text-[15px] text-[#6B7280] leading-[1.6]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const caseStudies = [
  {
    icon: Rocket,
    title: "Lead Routing Cleanup",
    description: "Improved how inbound leads were assigned by source and geography, reducing manual review and helping the right records reach the right owner faster.",
  },
  {
    icon: Database,
    title: "Salesforce Data Cleanup Project",
    description: "Cleaned and standardized CRM records to reduce duplicates, improve reporting confidence, and make daily Salesforce use more reliable.",
  },
  {
    icon: BarChart3,
    title: "Reporting Visibility Project",
    description: "Built dashboards and reporting views so leadership could better understand lead flow, campaign performance, and pipeline activity.",
  },
];

const typicalImprovements = [
  "Common project support includes data cleanup, reporting, automation, lead flow improvements, and post-implementation Salesforce optimization.",
];

function CaseStudiesSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-case-studies">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-case-studies-title">
          Examples of Problems We Help Solve
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-lg mx-auto mb-12">
          Representative outcomes from real client engagements.
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-6 border border-[#E5E7EB]"
              style={{ boxShadow: "0 4px 6px -1px rgba(30,58,138,0.06), 0 10px 30px -5px rgba(30,58,138,0.08)" }}
              data-testid={`card-case-study-${i}`}
            >
              <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center mb-4">
                <study.icon className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <h3 className="text-[16px] font-bold text-[#111827] mb-3">{study.title}</h3>
              <p className="text-[14px] text-[#6B7280] leading-[1.6]">{study.description}</p>
            </div>
          ))}
        </div>

        <div
          className="max-w-2xl mx-auto rounded-xl bg-[#EEF4FF] border border-[#DBEAFE] p-6 sm:p-8"
        >
          <p className="text-[15px] text-[#1E3A8A] font-medium leading-[1.6] text-center" data-testid="text-improvement-0">
            {typicalImprovements[0]}
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white" data-testid="section-about">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[30px] sm:text-[34px] font-bold text-[#111827] tracking-tight text-center mb-6" data-testid="text-about-title">
          Meet Mark
        </h2>

        <div className="flex justify-center mb-10">
          <img
            src={certBannerImg}
            alt="Salesforce Certified Administrator, Salesforce AI Associate, Zapier, and Clay certifications"
            className="w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[520px]"
            loading="lazy"
            data-testid="img-cert-banner"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <img
              src={aboutHeadshotImg}
              alt="Mark Mathis — Salesforce consultant and RevOps automation specialist"
              loading="lazy"
              className="w-[200px] h-[200px] rounded-2xl object-cover border border-[#E5E7EB] shrink-0 shadow-md"
              data-testid="img-about-avatar"
            />
            <div>
              <p className="text-[18px] text-[#111827] leading-[1.6] mb-5">
                Mark works at the intersection of Salesforce, marketing systems, data quality, automation, and reporting. He specializes in practical Salesforce project work including data cleanup, lead routing, reporting dashboards, Zapier integrations, campaign tracking, and CRM optimization.
              </p>

              <p className="text-[15px] text-[#6B7280] leading-[1.6] mb-5">
                He is a strong fit for consulting firms, RevOps teams, and companies that need targeted Salesforce help without a large full-service engagement. Available for project-based, contract, and overflow Salesforce work.
              </p>

              <ul className="space-y-2.5 mb-5">
                {[
                  "25+ years of technology and business experience",
                  "Accenture enterprise consulting background",
                  "Enterprise and marketing systems exposure",
                  "Salesforce + automation focus (Zapier, Clay)",
                  "Practical, business-first approach",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[15px] text-[#111827] leading-[1.5]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                {["MBA", "Salesforce Certified Administrator", "Salesforce AI Associate"].map((cred) => (
                  <span
                    key={cred}
                    className="inline-block text-[13px] font-medium text-[#1E3A8A] bg-[#1E3A8A]/[0.07] px-3.5 py-1.5 rounded-md whitespace-nowrap"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              <p className="text-[14px] text-[#6B7280] mb-5" data-testid="text-about-location">
                Remote &bull; U.S. based &bull; Central Time
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/mark-mathis-mba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#0A66C2] text-white text-[14px] font-semibold transition-all duration-200 hover:bg-[#004182] shadow-md hover:shadow-lg"
                  data-testid="link-linkedin"
                >
                  <LinkedInIcon className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
                <a
                  href="mailto:mark@salesforcemark.com"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#1E3A8A] text-white text-[14px] font-semibold transition-all duration-200 hover:bg-[#152e6e] shadow-md hover:shadow-lg"
                  data-testid="link-email-mark"
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: "Do you work with Salesforce consulting firms or agencies?",
    answer: "Yes. Mark is available for subcontract, overflow, and project-based support, especially for cleanup, reporting, automation, and Salesforce optimization work.",
  },
  {
    question: "Do you only work with direct clients?",
    answer: "No. The site supports both direct companies and consulting firms that need specialized Salesforce project help.",
  },
  {
    question: "What types of Salesforce work are the best fit?",
    answer: "Best-fit work includes data cleanup, deduplication planning, dashboards and reporting, lead routing, Zapier integrations, campaign tracking, and post-implementation cleanup.",
  },
  {
    question: "Do you handle full Salesforce implementations?",
    answer: "The strongest fit is specialized project support and optimization work rather than large end-to-end implementations.",
  },
  {
    question: "Can you support work after a Salesforce go-live or implementation?",
    answer: "Yes. Cleanup, stabilization, reporting improvements, lead-flow fixes, and practical follow-through after implementation are a strong fit.",
  },
];

function PricingSection() {
  const cards = [
    {
      title: "Cleanup Projects",
      badge: "Data & CRM",
      body: "Examples: deduplication planning, field cleanup, CRM normalization, Salesforce cleanup after implementation.",
      note: "Typically scoped based on record volume, complexity, and review needs.",
      icon: Database,
    },
    {
      title: "Reporting & Dashboard Projects",
      badge: "Reporting",
      body: "Examples: management dashboards, lead flow visibility, campaign reporting, conversion reports, pipeline reporting.",
      note: "Typically scoped based on reporting requirements and dashboard depth.",
      icon: BarChart3,
    },
    {
      title: "Automation & Integration Projects",
      badge: "Automation",
      body: "Examples: lead routing logic, Zapier workflows, form integrations, enrichment workflows, task automation.",
      note: "Typically scoped based on number of systems, workflow complexity, and business rules.",
      icon: Zap,
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-white" data-testid="section-pricing">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111827] tracking-tight mb-4" data-testid="text-pricing-title">
            Typical Salesforce Project Types
          </h2>
          <p className="text-[16px] text-[#4B5563] leading-relaxed">
            Most projects fall into one of these categories. Each is scoped individually based on your specific situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, i) => (
            <div
              key={i}
              data-testid={`card-pricing-${i}`}
              className="relative flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#2563EB] mb-2">{card.badge}</span>
              <h3 className="text-[18px] font-bold text-[#111827] mb-3">{card.title}</h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed mb-4 flex-1">{card.body}</p>
              <p className="text-[13px] text-[#6B7280] italic border-t border-[#F3F4F6] pt-3">{card.note}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[14px] text-[#6B7280]">
            Project pricing is scoped case by case.{" "}
            <a href="#book-a-call" className="text-[#1E3A8A] font-semibold hover:underline" data-testid="link-pricing-footer-cta">
              Contract and overflow support for consulting firms is also available.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO SECTION ────────────────────────────────────────────────────────

function LeadRoutingSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-lead" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#94A3B8"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      {/* Row 1: Steps 1–3 */}
      <rect x="8" y="18" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="8" y="18" width="90" height="4" rx="2" fill="#2563EB"/>
      <circle cx="24" cy="26" r="7" fill="#2563EB"/>
      <text x="24" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">1</text>
      <text x="53" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Web Form</text>
      <text x="53" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Submission</text>

      <path d="M 98 41 L 150 41" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-lead)"/>

      <rect x="152" y="18" width="90" height="46" rx="6" fill="white" stroke="#FED7AA" strokeWidth="1"/>
      <rect x="152" y="18" width="90" height="4" rx="2" fill="#F97316"/>
      <circle cx="168" cy="26" r="7" fill="#F97316"/>
      <text x="168" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">2</text>
      <text x="197" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Zapier</text>
      <text x="197" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Processing</text>

      <path d="M 242 41 L 294 41" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-lead)"/>

      <rect x="296" y="18" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="296" y="18" width="90" height="4" rx="2" fill="#1E3A8A"/>
      <circle cx="312" cy="26" r="7" fill="#1E3A8A"/>
      <text x="312" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">3</text>
      <text x="341" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Salesforce</text>
      <text x="341" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Lookup</text>

      {/* U-turn connector */}
      <path d="M 386 41 L 395 41 L 395 84 L 5 84 L 5 116" stroke="#94A3B8" strokeWidth="1.5" fill="none" markerEnd="url(#arr-lead)"/>

      {/* Row 2: Steps 4–6 */}
      <rect x="8" y="116" width="90" height="40" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="8" y="116" width="90" height="3" rx="2" fill="#1E40AF"/>
      <circle cx="24" cy="123" r="7" fill="#1E40AF"/>
      <text x="24" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">4</text>
      <text x="53" y="136" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Territory</text>
      <text x="53" y="148" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Assignment</text>

      <path d="M 98 136 L 150 136" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-lead)"/>

      <rect x="152" y="116" width="90" height="40" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="152" y="116" width="90" height="3" rx="2" fill="#2563EB"/>
      <circle cx="168" cy="123" r="7" fill="#2563EB"/>
      <text x="168" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">5</text>
      <text x="197" y="136" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Create / Update</text>
      <text x="197" y="148" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Lead Record</text>

      <path d="M 242 136 L 294 136" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-lead)"/>

      <rect x="296" y="116" width="90" height="40" rx="6" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="296" y="116" width="90" height="3" rx="2" fill="#16A34A"/>
      <circle cx="312" cy="123" r="7" fill="#16A34A"/>
      <text x="312" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">6</text>
      <text x="341" y="136" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Rep Notified</text>
      <text x="341" y="148" fontSize="7" fill="#16A34A" textAnchor="middle" fontFamily="system-ui" fontWeight="600">✓ Assigned</text>
    </svg>
  );
}

function FacebookDashSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="8" y="8" width="384" height="150" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      {/* Header */}
      <rect x="8" y="8" width="384" height="26" rx="8" fill="#1E3A8A"/>
      <rect x="8" y="26" width="384" height="8" fill="#1E3A8A"/>
      <ellipse cx="26" cy="21" rx="8" ry="5.5" fill="#60A5FA" opacity="0.9"/>
      <text x="45" y="25" fontSize="8.5" fill="white" fontWeight="700" fontFamily="system-ui">Facebook Lead Performance Dashboard</text>
      {/* KPI boxes */}
      {[
        { x: 14, label: "Total Leads", value: "2,842", color: "#1E293B", bg: "#F8FAFF", border: "#E2E8F0" },
        { x: 109, label: "Cost / Lead", value: "$6.24", color: "#1E293B", bg: "#F8FAFF", border: "#E2E8F0" },
        { x: 204, label: "Qualified", value: "854", color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0" },
        { x: 299, label: "Stale Leads", value: "312", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="40" width="88" height="32" rx="4" fill={k.bg} stroke={k.border} strokeWidth="1"/>
          <text x={k.x + 44} y="52" fontSize="6.5" fill="#64748B" textAnchor="middle" fontFamily="system-ui">{k.label}</text>
          <text x={k.x + 44} y="65" fontSize="11" fill={k.color} textAnchor="middle" fontWeight="700" fontFamily="system-ui">{k.value}</text>
        </g>
      ))}
      <line x1="14" y1="78" x2="386" y2="78" stroke="#F1F5F9" strokeWidth="1"/>
      {/* Bar chart */}
      <text x="20" y="89" fontSize="6.5" fill="#64748B" fontWeight="600" fontFamily="system-ui">Leads Over Time</text>
      {[28, 20, 36, 24, 42, 30, 48, 38].map((h, i) => (
        <rect key={i} x={20 + i * 16} y={150 - h} width="11" height={h} rx="2"
              fill={i === 6 ? "#2563EB" : i % 2 === 0 ? "#60A5FA" : "#93C5FD"}/>
      ))}
      <line x1="14" y1="150" x2="155" y2="150" stroke="#E2E8F0" strokeWidth="1"/>
      {/* Donut chart */}
      <text x="210" y="89" fontSize="6.5" fill="#64748B" fontWeight="600" fontFamily="system-ui">Lead Quality Breakdown</text>
      <circle cx="255" cy="124" r="22" fill="none" stroke="#E2E8F0" strokeWidth="9"/>
      <circle cx="255" cy="124" r="22" fill="none" stroke="#2563EB" strokeWidth="9"
              strokeDasharray="41 97" strokeDashoffset="0" transform="rotate(-90 255 124)"/>
      <circle cx="255" cy="124" r="22" fill="none" stroke="#93C5FD" strokeWidth="9"
              strokeDasharray="62 76" strokeDashoffset="-41" transform="rotate(-90 255 124)"/>
      <circle cx="255" cy="124" r="22" fill="none" stroke="#CBD5E1" strokeWidth="9"
              strokeDasharray="21 117" strokeDashoffset="-103" transform="rotate(-90 255 124)"/>
      <text x="255" y="121" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="700" fontFamily="system-ui">2,842</text>
      <text x="255" y="131" fontSize="6" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Total</text>
      {/* Legend */}
      {[
        { y: 108, color: "#2563EB", label: "Qualified 30%" },
        { y: 120, color: "#93C5FD", label: "Working 45%" },
        { y: 132, color: "#CBD5E1", label: "Unqualified 15%" },
        { y: 144, color: "#F1F5F9", label: "Trash 10%" },
      ].map((l, i) => (
        <g key={i}>
          <rect x="292" y={l.y - 5} width="6" height="6" rx="1" fill={l.color} stroke="#E2E8F0" strokeWidth="0.5"/>
          <text x="302" y={l.y + 1} fontSize="6.5" fill="#64748B" fontFamily="system-ui">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

function CampaignAutoSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-camp" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#94A3B8"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      {/* Step 1 */}
      <rect x="6" y="24" width="68" height="38" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="6" y="24" width="68" height="3" rx="2" fill="#2563EB"/>
      <text x="40" y="40" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Landing</text>
      <text x="40" y="51" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Page Lead</text>
      <text x="40" y="72" fontSize="6" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui">Step 1</text>
      <path d="M 74 43 L 90 43" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-camp)"/>
      {/* Step 2 */}
      <rect x="91" y="24" width="68" height="38" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="91" y="24" width="68" height="3" rx="2" fill="#1E40AF"/>
      <text x="125" y="40" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Match</text>
      <text x="125" y="51" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Existing Lead</text>
      <text x="125" y="72" fontSize="6" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui">Step 2</text>
      <path d="M 159 43 L 175 43" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-camp)"/>
      {/* Step 3: Decision diamond */}
      <path d="M 210 24 L 242 43 L 210 62 L 178 43 Z" fill="white" stroke="#F59E0B" strokeWidth="1.5"/>
      <text x="210" y="40" fontSize="6.5" fill="#92400E" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Lifecycle</text>
      <text x="210" y="51" fontSize="6.5" fill="#92400E" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Decision</text>
      <text x="210" y="78" fontSize="6" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui">Step 3</text>
      {/* 3 branch outputs */}
      <path d="M 210 24 L 210 10 L 275 10" stroke="#16A34A" strokeWidth="1" strokeDasharray="3 2"/>
      <text x="232" y="8" fontSize="6" fill="#16A34A" fontFamily="system-ui">Create New</text>
      <path d="M 242 43 L 275 43" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 2"/>
      <text x="253" y="40" fontSize="6" fill="#2563EB" fontFamily="system-ui">Update</text>
      <path d="M 210 62 L 210 76 L 275 76" stroke="#7C3AED" strokeWidth="1" strokeDasharray="3 2"/>
      <text x="228" y="73" fontSize="6" fill="#7C3AED" fontFamily="system-ui">Reactivate</text>
      {/* Merge lines */}
      <path d="M 275 10 L 290 10 L 290 43" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M 275 43 L 290 43" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M 275 76 L 290 76 L 290 43" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M 290 43 L 308 43" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-camp)"/>
      {/* Step 4 */}
      <rect x="309" y="24" width="82" height="38" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="309" y="24" width="82" height="3" rx="2" fill="#2563EB"/>
      <text x="350" y="40" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Campaign</text>
      <text x="350" y="51" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Association</text>
      <text x="350" y="72" fontSize="6" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui">Step 4</text>
      {/* Down arrow to step 5 */}
      <path d="M 350 62 L 350 88" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-camp)"/>
      {/* Step 5 */}
      <rect x="210" y="89" width="280" height="42" rx="6" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="210" y="89" width="280" height="3" rx="2" fill="#16A34A"/>
      <text x="350" y="108" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Notification + Audit Logging</text>
      <text x="350" y="121" fontSize="7" fill="#16A34A" textAnchor="middle" fontFamily="system-ui" fontWeight="600">✓ Duplicate prevention · ✓ Audit trail · ✓ Rep notified</text>
      <text x="350" y="141" fontSize="6" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui">Step 5</text>
      {/* Safety badge */}
      <rect x="10" y="98" width="180" height="32" rx="6" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1"/>
      <text x="100" y="111" fontSize="7" fill="#92400E" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Active Lead Protection</text>
      <text x="100" y="122" fontSize="6.5" fill="#D97706" textAnchor="middle" fontFamily="system-ui">Sales ownership preserved</text>
    </svg>
  );
}

function MasterLeadsSVG() {
  const sources = [
    { label: "Web Forms", pct: 0.38, val: "38%", color: "#2563EB" },
    { label: "Facebook Ads", pct: 0.28, val: "28%", color: "#3B82F6" },
    { label: "Campaigns", pct: 0.20, val: "20%", color: "#93C5FD" },
    { label: "Other", pct: 0.14, val: "14%", color: "#CBD5E1" },
  ];
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="8" y="8" width="384" height="150" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      {/* Header */}
      <rect x="8" y="8" width="384" height="24" rx="8" fill="#1E3A8A"/>
      <rect x="8" y="24" width="384" height="8" fill="#1E3A8A"/>
      <text x="200" y="23" fontSize="9" fill="white" fontWeight="700" textAnchor="middle" fontFamily="system-ui">Master Leads Dashboard — Executive View</text>
      {/* KPI tiles */}
      {[
        { x: 14, label: "Total Leads", value: "14,382", color: "#1E3A8A", bg: "#EEF4FF" },
        { x: 112, label: "New This Month", value: "1,247", color: "#2563EB", bg: "#EFF6FF" },
        { x: 210, label: "Missing Info", value: "843", color: "#D97706", bg: "#FFFBEB" },
        { x: 308, label: "Aging > 30d", value: "2,104", color: "#DC2626", bg: "#FEF2F2" },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="38" width="90" height="32" rx="4" fill={k.bg} stroke="#E2E8F0" strokeWidth="1"/>
          <text x={k.x + 45} y="50" fontSize="6.5" fill="#64748B" textAnchor="middle" fontFamily="system-ui">{k.label}</text>
          <text x={k.x + 45} y="63" fontSize="11" fill={k.color} textAnchor="middle" fontWeight="700" fontFamily="system-ui">{k.value}</text>
        </g>
      ))}
      <line x1="14" y1="76" x2="386" y2="76" stroke="#F1F5F9" strokeWidth="1"/>
      {/* Lead Sources bars */}
      <text x="20" y="87" fontSize="6.5" fill="#64748B" fontWeight="600" fontFamily="system-ui">Lead Sources</text>
      {sources.map((s, i) => {
        const y = 93 + i * 16;
        return (
          <g key={i}>
            <text x="18" y={y + 8} fontSize="6.5" fill="#64748B" fontFamily="system-ui">{s.label}</text>
            <rect x="75" y={y} width="130" height="9" rx="2" fill="#F1F5F9"/>
            <rect x="75" y={y} width={130 * s.pct} height="9" rx="2" fill={s.color}/>
            <text x="209" y={y + 8} fontSize="6.5" fill="#374151" fontWeight="600" fontFamily="system-ui">{s.val}</text>
          </g>
        );
      })}
      {/* Data quality donut */}
      <text x="260" y="87" fontSize="6.5" fill="#64748B" fontWeight="600" fontFamily="system-ui">Data Quality Score</text>
      <circle cx="310" cy="128" r="26" fill="none" stroke="#E2E8F0" strokeWidth="10"/>
      <circle cx="310" cy="128" r="26" fill="none" stroke="#2563EB" strokeWidth="10"
              strokeDasharray="115 48" strokeDashoffset="0" transform="rotate(-90 310 128)"/>
      <text x="310" y="124" fontSize="11" fill="#1E293B" textAnchor="middle" fontWeight="700" fontFamily="system-ui">71%</text>
      <text x="310" y="135" fontSize="6" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Quality</text>
      {/* Status dots */}
      {[
        { color: "#16A34A", label: "Complete: 71%" },
        { color: "#D97706", label: "Missing email: 18%" },
        { color: "#DC2626", label: "No phone: 11%" },
      ].map((d, i) => (
        <g key={i}>
          <circle cx="252" cy={102 + i * 13} r="4" fill={d.color}/>
          <text x="260" y={106 + i * 13} fontSize="6.5" fill="#64748B" fontFamily="system-ui">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

function GravityFormsSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-gravity" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#94A3B8"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="8" y="18" width="90" height="46" rx="6" fill="white" stroke="#EDE9FE" strokeWidth="1"/>
      <rect x="8" y="18" width="90" height="4" rx="2" fill="#7C3AED"/>
      <circle cx="24" cy="26" r="7" fill="#7C3AED"/>
      <text x="24" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">1</text>
      <text x="53" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Gravity</text>
      <text x="53" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Form Submit</text>
      <path d="M 98 41 L 150 41" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-gravity)"/>
      <rect x="152" y="18" width="90" height="46" rx="6" fill="white" stroke="#FED7AA" strokeWidth="1"/>
      <rect x="152" y="18" width="90" height="4" rx="2" fill="#F97316"/>
      <circle cx="168" cy="26" r="7" fill="#F97316"/>
      <text x="168" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">2</text>
      <text x="197" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Zapier</text>
      <text x="197" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Processing</text>
      <path d="M 242 41 L 294 41" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-gravity)"/>
      <rect x="296" y="18" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="296" y="18" width="90" height="4" rx="2" fill="#1E3A8A"/>
      <circle cx="312" cy="26" r="7" fill="#1E3A8A"/>
      <text x="312" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">3</text>
      <text x="341" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Match Lead</text>
      <text x="341" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Email + Phone</text>
      <path d="M 386 41 L 395 41 L 395 84 L 5 84 L 5 116" stroke="#94A3B8" strokeWidth="1.5" fill="none" markerEnd="url(#arr-gravity)"/>
      <rect x="8" y="116" width="90" height="40" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="8" y="116" width="90" height="3" rx="2" fill="#2563EB"/>
      <circle cx="24" cy="123" r="7" fill="#2563EB"/>
      <text x="24" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">4</text>
      <text x="53" y="133" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Create / Update</text>
      <text x="53" y="144" fontSize="6.5" fill="#7C3AED" textAnchor="middle" fontFamily="system-ui">or Reactivate</text>
      <path d="M 98 136 L 150 136" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-gravity)"/>
      <rect x="152" y="116" width="90" height="40" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="152" y="116" width="90" height="3" rx="2" fill="#2563EB"/>
      <circle cx="168" cy="123" r="7" fill="#2563EB"/>
      <text x="168" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">5</text>
      <text x="197" y="133" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Campaign</text>
      <text x="197" y="144" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Attribution</text>
      <path d="M 242 136 L 294 136" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-gravity)"/>
      <rect x="296" y="116" width="90" height="40" rx="6" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="296" y="116" width="90" height="3" rx="2" fill="#16A34A"/>
      <circle cx="312" cy="123" r="7" fill="#16A34A"/>
      <text x="312" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">6</text>
      <text x="341" y="133" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Rep Alert</text>
      <text x="341" y="144" fontSize="7" fill="#16A34A" textAnchor="middle" fontFamily="system-ui" fontWeight="600">✓ Notified</text>
    </svg>
  );
}

function NightlyFlowSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-nightly" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#94A3B8"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="306" y="7" width="86" height="14" rx="7" fill="#1E3A8A"/>
      <text x="349" y="17" fontSize="7" fill="white" textAnchor="middle" fontFamily="system-ui" fontWeight="600">Runs Nightly</text>
      <rect x="8" y="24" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="8" y="24" width="90" height="4" rx="2" fill="#1E3A8A"/>
      <circle cx="24" cy="32" r="7" fill="#1E3A8A"/>
      <text x="24" y="36" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">1</text>
      <text x="53" y="47" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Scheduled</text>
      <text x="53" y="59" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Flow Trigger</text>
      <path d="M 98 47 L 150 47" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-nightly)"/>
      <rect x="152" y="24" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="152" y="24" width="90" height="4" rx="2" fill="#2563EB"/>
      <circle cx="168" cy="32" r="7" fill="#2563EB"/>
      <text x="168" y="36" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">2</text>
      <text x="197" y="47" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Find Inactive</text>
      <text x="197" y="59" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Leads (SOQL)</text>
      <path d="M 242 47 L 294 47" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-nightly)"/>
      <rect x="296" y="24" width="90" height="46" rx="6" fill="white" stroke="#FEF3C7" strokeWidth="1"/>
      <rect x="296" y="24" width="90" height="4" rx="2" fill="#D97706"/>
      <circle cx="312" cy="32" r="7" fill="#D97706"/>
      <text x="312" y="36" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">3</text>
      <text x="341" y="47" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Qualify</text>
      <text x="341" y="59" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Rules Check</text>
      <path d="M 386 47 L 395 47 L 395 90 L 5 90 L 5 118" stroke="#94A3B8" strokeWidth="1.5" fill="none" markerEnd="url(#arr-nightly)"/>
      <rect x="8" y="118" width="90" height="40" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="8" y="118" width="90" height="3" rx="2" fill="#2563EB"/>
      <circle cx="24" cy="125" r="7" fill="#2563EB"/>
      <text x="24" y="129" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">4</text>
      <text x="53" y="136" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Update to</text>
      <text x="53" y="148" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Nurture Status</text>
      <path d="M 98 138 L 150 138" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-nightly)"/>
      <rect x="152" y="118" width="90" height="40" rx="6" fill="white" stroke="#CCFBF1" strokeWidth="1"/>
      <rect x="152" y="118" width="90" height="3" rx="2" fill="#0D9488"/>
      <circle cx="168" cy="125" r="7" fill="#0D9488"/>
      <text x="168" y="129" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">5</text>
      <text x="197" y="136" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Log Results</text>
      <text x="197" y="148" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">+ Error handling</text>
      <path d="M 242 138 L 294 138" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-nightly)"/>
      <rect x="296" y="118" width="90" height="40" rx="6" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="296" y="118" width="90" height="3" rx="2" fill="#16A34A"/>
      <circle cx="312" cy="125" r="7" fill="#16A34A"/>
      <text x="312" y="129" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">6</text>
      <text x="341" y="136" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Send Summary</text>
      <text x="341" y="148" fontSize="7" fill="#16A34A" textAnchor="middle" fontFamily="system-ui">✓ Email report</text>
    </svg>
  );
}

function PhoneNormSVG() {
  const dirty = ["(555) 123-4567", "555.123.4567", "+1 555-123-4567", "5551234567", "555 123-4567"];
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-phone" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#2563EB"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="8" y="8" width="140" height="150" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <rect x="8" y="8" width="140" height="22" rx="8" fill="#FEF2F2"/>
      <rect x="8" y="22" width="140" height="8" fill="#FEF2F2"/>
      <text x="78" y="22" fontSize="7.5" fill="#DC2626" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Inconsistent Formats</text>
      {dirty.map((p, i) => (
        <g key={i}>
          <rect x="14" y={34 + i * 21} width="128" height="15" rx="3" fill="#FFF5F5" stroke="#FECACA" strokeWidth="0.75"/>
          <text x="20" y={46 + i * 21} fontSize="8" fill="#DC2626" fontFamily="system-ui">x</text>
          <text x="30" y={46 + i * 21} fontSize="7.5" fill="#374151" fontFamily="monospace">{p}</text>
        </g>
      ))}
      <rect x="160" y="52" width="76" height="60" rx="8" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1.5"/>
      <text x="198" y="76" fontSize="7.5" fill="#1E3A8A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Formula</text>
      <text x="198" y="89" fontSize="7.5" fill="#1E3A8A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Normalize</text>
      <text x="198" y="100" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Engine</text>
      <path d="M 148 82 L 159 82" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arr-phone)"/>
      <path d="M 236 82 L 247 82" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arr-phone)"/>
      <rect x="249" y="8" width="143" height="150" rx="8" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="249" y="8" width="143" height="22" rx="8" fill="#F0FDF4"/>
      <rect x="249" y="22" width="143" height="8" fill="#F0FDF4"/>
      <text x="320" y="22" fontSize="7.5" fill="#16A34A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Standardized Output</text>
      {dirty.map((_, i) => (
        <g key={i}>
          <rect x="255" y={34 + i * 21} width="131" height="15" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="0.75"/>
          <circle cx="265" cy={41 + i * 21} r="5" fill="#16A34A"/>
          <text x="265" y={45 + i * 21} fontSize="6" fill="white" textAnchor="middle" fontFamily="system-ui">✓</text>
          <text x="276" y={46 + i * 21} fontSize="8" fill="#374151" fontFamily="monospace">15551234567</text>
        </g>
      ))}
      <rect x="259" y="143" width="124" height="16" rx="8" fill="#1E3A8A"/>
      <text x="321" y="154" fontSize="7.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">85,000+ Records Standardized</text>
    </svg>
  );
}

function NoGoDateSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="165" fill="#EEF4FF"/>
      <line x1="35" y1="58" x2="365" y2="58" stroke="#E2E8F0" strokeWidth="2"/>
      {/* Node 1: New */}
      <circle cx="35" cy="58" r="10" fill="white" stroke="#94A3B8" strokeWidth="2"/>
      <text x="35" y="62" fontSize="7" fill="#94A3B8" textAnchor="middle" fontFamily="system-ui" fontWeight="700">New</text>
      <text x="35" y="78" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">New</text>
      {/* Arrow 1→2 */}
      <polygon points="54,54 64,58 54,62" fill="#CBD5E1"/>
      {/* Node 2: Working */}
      <circle cx="118" cy="58" r="10" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2"/>
      <text x="118" y="62" fontSize="6.5" fill="#2563EB" textAnchor="middle" fontFamily="system-ui" fontWeight="700">Work</text>
      <text x="118" y="78" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Working</text>
      {/* Arrow 2→3 */}
      <polygon points="137,54 147,58 137,62" fill="#CBD5E1"/>
      {/* Node 3: No Go */}
      <circle cx="200" cy="58" r="13" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2"/>
      <text x="200" y="54" fontSize="6" fill="#DC2626" textAnchor="middle" fontFamily="system-ui" fontWeight="700">No</text>
      <text x="200" y="64" fontSize="6" fill="#DC2626" textAnchor="middle" fontFamily="system-ui" fontWeight="700">Go</text>
      <text x="200" y="82" fontSize="7" fill="#DC2626" textAnchor="middle" fontFamily="system-ui" fontWeight="600">No Go</text>
      <rect x="163" y="25" width="74" height="14" rx="4" fill="#DC2626"/>
      <text x="200" y="35" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Date Stamped</text>
      <line x1="200" y1="39" x2="200" y2="45" stroke="#DC2626" strokeWidth="1" strokeDasharray="2 1"/>
      {/* Arrow 3→4 */}
      <polygon points="222,54 232,58 222,62" fill="#CBD5E1"/>
      {/* Node 4: Reopened */}
      <circle cx="282" cy="58" r="10" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2"/>
      <text x="282" y="62" fontSize="6" fill="#16A34A" textAnchor="middle" fontFamily="system-ui" fontWeight="700">Open</text>
      <text x="282" y="78" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Reopened</text>
      {/* Arrow 4→5 */}
      <polygon points="301,54 311,58 301,62" fill="#CBD5E1"/>
      {/* Node 5: No Go again */}
      <circle cx="365" cy="58" r="13" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2"/>
      <text x="365" y="54" fontSize="6" fill="#DC2626" textAnchor="middle" fontFamily="system-ui" fontWeight="700">No</text>
      <text x="365" y="64" fontSize="6" fill="#DC2626" textAnchor="middle" fontFamily="system-ui" fontWeight="700">Go</text>
      <text x="365" y="82" fontSize="7" fill="#DC2626" textAnchor="middle" fontFamily="system-ui" fontWeight="600">No Go</text>
      <rect x="328" y="25" width="74" height="14" rx="4" fill="#DC2626"/>
      <text x="365" y="35" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Date Updated</text>
      <line x1="365" y1="39" x2="365" y2="45" stroke="#DC2626" strokeWidth="1" strokeDasharray="2 1"/>
      {/* Backfill panel */}
      <rect x="50" y="96" width="300" height="56" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1.5"/>
      <rect x="50" y="96" width="300" height="4" rx="4" fill="#1E3A8A"/>
      <text x="200" y="117" fontSize="9.5" fill="#1E3A8A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Historical Backfill Complete</text>
      <text x="200" y="132" fontSize="8" fill="#64748B" textAnchor="middle" fontFamily="system-ui">~25,000 records updated for reporting accuracy</text>
      <text x="200" y="146" fontSize="7.5" fill="#16A34A" textAnchor="middle" fontFamily="system-ui">✓ Immediate KPI readiness at go-live</text>
    </svg>
  );
}

function LeadSourceSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-source" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#2563EB"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      {/* Left: Before */}
      <rect x="8" y="8" width="148" height="150" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <rect x="8" y="8" width="148" height="22" rx="8" fill="#FEF2F2"/>
      <rect x="8" y="22" width="148" height="8" fill="#FEF2F2"/>
      <text x="82" y="22" fontSize="7.5" fill="#DC2626" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Legacy Values (Before)</text>
      {["Google PPC", "AdWords", "tradeshow", "Expo", "referral", "web form"].map((v, i) => (
        <g key={i}>
          <rect x="14" y={35 + i * 18} width="136" height="14" rx="3" fill="#FFF5F5" stroke="#FECACA" strokeWidth="0.75"/>
          <text x="20" y={46 + i * 18} fontSize="8" fill="#DC2626" fontFamily="system-ui">x </text>
          <text x="30" y={46 + i * 18} fontSize="8" fill="#374151" fontFamily="system-ui">{v}</text>
        </g>
      ))}
      {/* Center */}
      <rect x="163" y="52" width="70" height="60" rx="8" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1.5"/>
      <text x="198" y="76" fontSize="7.5" fill="#1E3A8A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Cleanup</text>
      <text x="198" y="89" fontSize="7.5" fill="#1E3A8A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">+</text>
      <text x="198" y="102" fontSize="7.5" fill="#1E3A8A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Mapping</text>
      <path d="M 156 82 L 162 82" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arr-source)"/>
      <path d="M 233 82 L 239 82" stroke="#2563EB" strokeWidth="1.5" markerEnd="url(#arr-source)"/>
      {/* Right: After */}
      <rect x="241" y="8" width="151" height="150" rx="8" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="241" y="8" width="151" height="22" rx="8" fill="#F0FDF4"/>
      <rect x="241" y="22" width="151" height="8" fill="#F0FDF4"/>
      <text x="316" y="22" fontSize="7.5" fill="#16A34A" textAnchor="middle" fontWeight="700" fontFamily="system-ui">Standardized (After)</text>
      {["Paid Search · Google", "Paid Search · AdWords", "Event · Tradeshow", "Event · Expo", "Referral · Direct", "Web · Form Submit"].map((v, i) => (
        <g key={i}>
          <rect x="247" y={35 + i * 18} width="139" height="14" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="0.75"/>
          <circle cx="257" cy={42 + i * 18} r="4" fill="#16A34A"/>
          <text x="257" y={45 + i * 18} fontSize="5.5" fill="white" textAnchor="middle" fontFamily="system-ui">✓</text>
          <text x="267" y={46 + i * 18} fontSize="7.5" fill="#374151" fontFamily="system-ui">{v}</text>
        </g>
      ))}
    </svg>
  );
}

function BulkImportSVG() {
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-bulk" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#94A3B8"/>
        </marker>
      </defs>
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="8" y="18" width="90" height="46" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
      <rect x="8" y="18" width="90" height="4" rx="2" fill="#64748B"/>
      <circle cx="24" cy="26" r="7" fill="#64748B"/>
      <text x="24" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">1</text>
      <text x="53" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Raw Dataset</text>
      <text x="53" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">External data</text>
      <path d="M 98 41 L 150 41" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-bulk)"/>
      <rect x="152" y="18" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="152" y="18" width="90" height="4" rx="2" fill="#2563EB"/>
      <circle cx="168" cy="26" r="7" fill="#2563EB"/>
      <text x="168" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">2</text>
      <text x="197" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Normalize</text>
      <text x="197" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Phone, email</text>
      <path d="M 242 41 L 294 41" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-bulk)"/>
      <rect x="296" y="18" width="90" height="46" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="296" y="18" width="90" height="4" rx="2" fill="#1E3A8A"/>
      <circle cx="312" cy="26" r="7" fill="#1E3A8A"/>
      <text x="312" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">3</text>
      <text x="341" y="41" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Match /</text>
      <text x="341" y="53" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Deduplication</text>
      <path d="M 386 41 L 395 41 L 395 84 L 5 84 L 5 116" stroke="#94A3B8" strokeWidth="1.5" fill="none" markerEnd="url(#arr-bulk)"/>
      <rect x="8" y="116" width="90" height="40" rx="6" fill="white" stroke="#FEF3C7" strokeWidth="1"/>
      <rect x="8" y="116" width="90" height="3" rx="2" fill="#D97706"/>
      <circle cx="24" cy="123" r="7" fill="#D97706"/>
      <text x="24" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">4</text>
      <text x="53" y="133" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Opportunity</text>
      <text x="53" y="145" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Conflict Check</text>
      <path d="M 98 136 L 150 136" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-bulk)"/>
      <rect x="152" y="116" width="90" height="40" rx="6" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="152" y="116" width="90" height="3" rx="2" fill="#2563EB"/>
      <circle cx="168" cy="123" r="7" fill="#2563EB"/>
      <text x="168" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">5</text>
      <text x="197" y="133" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Assign Owner</text>
      <text x="197" y="145" fontSize="7" fill="#64748B" textAnchor="middle" fontFamily="system-ui">Territory-based</text>
      <path d="M 242 136 L 294 136" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arr-bulk)"/>
      <rect x="296" y="116" width="90" height="40" rx="6" fill="white" stroke="#BBF7D0" strokeWidth="1.5"/>
      <rect x="296" y="116" width="90" height="3" rx="2" fill="#16A34A"/>
      <circle cx="312" cy="123" r="7" fill="#16A34A"/>
      <text x="312" y="127" fontSize="7" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">6</text>
      <text x="341" y="133" fontSize="7.5" fill="#1E293B" textAnchor="middle" fontWeight="600" fontFamily="system-ui">Campaign Attr.</text>
      <text x="341" y="145" fontSize="7" fill="#16A34A" textAnchor="middle" fontFamily="system-ui">✓ Import Validated</text>
    </svg>
  );
}

function SFTurboSVG() {
  const actions = [
    { label: "Copy 18-Digit ID", color: "#2563EB" },
    { label: "Field Snapshot", color: "#2563EB" },
    { label: "View API Names", color: "#2563EB" },
    { label: "Campaign Hierarchy", color: "#7C3AED" },
    { label: "Email Compose", color: "#16A34A" },
  ];
  return (
    <svg viewBox="0 0 400 165" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="165" fill="#EEF4FF"/>
      <rect x="8" y="8" width="384" height="150" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
      {/* Browser toolbar */}
      <rect x="8" y="8" width="384" height="22" rx="8" fill="#E2E8F0"/>
      <rect x="8" y="22" width="384" height="8" fill="#E2E8F0"/>
      <circle cx="24" cy="19" r="4" fill="#FC605B"/>
      <circle cx="36" cy="19" r="4" fill="#FCBA44"/>
      <circle cx="48" cy="19" r="4" fill="#34C759"/>
      <rect x="60" y="12" width="260" height="14" rx="4" fill="white" stroke="#CBD5E1" strokeWidth="1"/>
      <text x="70" y="22" fontSize="6.5" fill="#64748B" fontFamily="system-ui">salesforce.com/lightning/r/Lead/00Q5f00000AbCdEAA</text>
      {/* SF Lightning nav */}
      <rect x="8" y="30" width="384" height="18" fill="#1E3A8A"/>
      <text x="28" y="42" fontSize="8" fill="white" fontWeight="700" fontFamily="system-ui">Salesforce</text>
      <text x="110" y="42" fontSize="7" fill="#93C5FD" fontFamily="system-ui">Home  Leads  Contacts  Campaigns  Reports</text>
      {/* Record content */}
      <rect x="14" y="54" width="220" height="16" rx="4" fill="#F1F5F9"/>
      <text x="20" y="65" fontSize="8.5" fill="#1E293B" fontWeight="700" fontFamily="system-ui">Lead: John Smith — Acme Corp</text>
      {[
        "Email: john@acme.com",
        "Phone: (555) 123-4567",
        "Status: Working",
        "Lead Source: Web Form",
        "Owner: Sarah R.",
      ].map((line, i) => (
        <g key={i}>
          <rect x="14" y={76 + i * 14} width="218" height="11" rx="2" fill="#F8FAFC" stroke="#F1F5F9" strokeWidth="1"/>
          <text x="18" y={85 + i * 14} fontSize="7" fill="#64748B" fontFamily="system-ui">{line}</text>
        </g>
      ))}
      {/* SF Turbo floating panel */}
      <rect x="248" y="48" width="136" height="108" rx="8" fill="white" stroke="#2563EB" strokeWidth="2"/>
      <rect x="248" y="48" width="136" height="24" rx="8" fill="#1E3A8A"/>
      <rect x="248" y="64" width="136" height="8" fill="#1E3A8A"/>
      <text x="316" y="63" fontSize="9.5" fill="white" textAnchor="middle" fontWeight="700" fontFamily="system-ui">SF Turbo</text>
      <text x="316" y="73" fontSize="6.5" fill="#93C5FD" textAnchor="middle" fontFamily="system-ui">Chrome Extension</text>
      {actions.map((a, i) => (
        <g key={i}>
          <rect x="254" y={80 + i * 15} width="124" height="12" rx="4" fill={i === 0 ? "#EFF6FF" : "#F8FAFC"} stroke="#E2E8F0" strokeWidth="0.75"/>
          <circle cx="263" cy={86 + i * 15} r="4" fill={a.color}/>
          <text x="271" y={90 + i * 15} fontSize="7" fill="#1E293B" fontFamily="system-ui">{a.label}</text>
        </g>
      ))}
    </svg>
  );
}

const portfolioStudies = [
  {
    id: 1,
    categories: ["Reporting", "Analytics", "Lead Management"],
    categoryColors: ["#2563EB", "#1E3A8A", "#16A34A"],
    title: "Facebook Lead Performance Dashboard",
    teaser: "Connected Facebook lead generation with campaign performance, cost-per-lead reporting, lead quality, sales follow-up, and rep workload visibility. Helped leadership understand not just how many leads were generated, but which campaigns produced better leads and whether reps were following up in a timely manner. The project brought marketing ROI, lead quality, and sales accountability into one centralized Salesforce view.",
    tags: ["Salesforce Sales Cloud", "Facebook Lead Ads", "Reports & Dashboards", "Custom Fields", "Lead Management"],
    pdfUrl: null as string | null,
    Graphic: FacebookDashSVG,
  },
  {
    id: 2,
    categories: ["Automation", "Integration", "Lead Routing"],
    categoryColors: ["#F97316", "#2563EB", "#1E3A8A"],
    title: "Enterprise Lead Routing & CRM Automation",
    teaser: "Automated inbound lead capture, routing, deduplication, and notification workflows between web forms, Zapier, and Salesforce. The solution normalized incoming form data, applied interest-based routing and ZIP-code territory assignment, checked for existing Salesforce leads, and created or updated records through lifecycle-aware decision paths. It reduced manual routing delays, improved assignment accuracy, and prevented duplicate records.",
    tags: ["Zapier", "Salesforce Leads", "JavaScript Logic", "SOQL", "Deduplication", "Audit Logging"],
    pdfUrl: null as string | null,
    Graphic: LeadRoutingSVG,
  },
  {
    id: 3,
    categories: ["Zapier Automation", "Lead Routing", "Salesforce Integration"],
    categoryColors: ["#F97316", "#2563EB", "#1E3A8A"],
    title: "Gravity Forms to Salesforce Lead Processing & Routing",
    teaser: "Connected Gravity Forms, Zapier, and Salesforce to automate lead intake, routing, duplicate prevention, campaign tracking, and rep notifications. The workflow standardized incoming data, matched leads using email, mobile, and business phone logic, then used conditional paths to create, update, or reactivate records. It eliminated manual entry, improved routing accuracy, and gave the sales team faster visibility into new inquiries.",
    tags: ["Zapier", "Salesforce Leads", "Gravity Forms", "Lead Routing", "SOQL", "Duplicate Prevention"],
    pdfUrl: null as string | null,
    Graphic: GravityFormsSVG,
  },
  {
    id: 4,
    categories: ["Zapier", "Salesforce", "Campaign Automation"],
    categoryColors: ["#F97316", "#2563EB", "#7C3AED"],
    title: "Lifecycle-Aware Campaign Automation Architecture",
    teaser: "Automated campaign landing-page lead intake and CRM updates through a multi-step Zapier workflow connected to Salesforce. The automation searched for existing leads using email and normalized phone matching, then used lifecycle-aware logic to decide whether to create, update, or reactivate a lead without disrupting active sales ownership. It also handled campaign association, duplicate prevention, and test/production safety controls.",
    tags: ["Zapier Automation", "Salesforce Leads", "Campaign Automation", "Lead Deduplication", "Lifecycle Logic"],
    pdfUrl: null as string | null,
    Graphic: CampaignAutoSVG,
  },
  {
    id: 5,
    categories: ["Dashboard Reporting", "Lead Analytics", "Data Quality"],
    categoryColors: ["#1E3A8A", "#2563EB", "#D97706"],
    title: "Master Leads Dashboard",
    teaser: "Centralized visibility into lead volume, lead quality, marketing source performance, ownership distribution, and lead aging into one executive Salesforce dashboard. Helped leadership and sales managers evaluate database health, identify stale or incomplete records, and understand which marketing sources were contributing to pipeline growth. Turned disconnected lead reports into one clear view.",
    tags: ["Salesforce Dashboards", "Salesforce Reports", "Lead Analytics", "Data Quality Reporting", "Executive Reporting"],
    pdfUrl: null as string | null,
    Graphic: MasterLeadsSVG,
  },
  {
    id: 6,
    categories: ["Salesforce Flow", "Data Hygiene", "Lead Lifecycle Automation"],
    categoryColors: ["#1E3A8A", "#0D9488", "#2563EB"],
    title: "Nightly Lead Cleanup & Nurture Automation",
    teaser: "Implemented a scheduled Salesforce Flow to identify inactive leads, move qualified records into nurture status, and reassign ownership to a central nurture owner. The automation included qualification rules, inactivity checks, audit field updates, custom logging, error handling, and nightly summary reporting. It reduced manual cleanup, improved active pipeline visibility, and created repeatable lead lifecycle governance without daily user intervention.",
    tags: ["Salesforce Flow", "Scheduled-Triggered Flow", "Lead Lifecycle Management", "Data Hygiene", "Error Handling"],
    pdfUrl: null as string | null,
    Graphic: NightlyFlowSVG,
  },
  {
    id: 7,
    categories: ["Data Quality", "Deduplication", "Salesforce Architecture"],
    categoryColors: ["#D97706", "#2563EB", "#1E3A8A"],
    title: "Phone Data Normalization for Lead Matching",
    teaser: "Standardized more than 85,000 Salesforce phone values so they could be used reliably for lead matching and duplicate prevention. A formula-based normalization field transformed inconsistent phone formats into a consistent comparison value for create-versus-update decisions. The solution improved CRM data quality, reduced duplicate lead risk, and strengthened the reliability of lead routing and automation processes.",
    tags: ["Salesforce Formula Fields", "Data Normalization", "CRM Data Quality", "Lead Matching", "Deduplication"],
    pdfUrl: null as string | null,
    Graphic: PhoneNormSVG,
  },
  {
    id: 8,
    categories: ["Salesforce Administration", "Data Governance", "Reporting"],
    categoryColors: ["#1E3A8A", "#D97706", "#2563EB"],
    title: "Lead Source Standardization & Reporting Transformation",
    teaser: "Redesigned Lead Source tracking to improve marketing attribution, data quality, and executive reporting. Replaced inconsistent and duplicated source values with a structured Lead Source and Lead Source Detail framework using dependent picklists, page layout updates, historical cleanup, and rebuilt reports. The result was cleaner attribution data, more reliable dashboards, and better visibility into marketing ROI and pipeline performance.",
    tags: ["Data Architecture", "Dependent Picklists", "Record Types", "Data Cleanup", "Reports & Dashboards"],
    pdfUrl: null as string | null,
    Graphic: LeadSourceSVG,
  },
  {
    id: 9,
    categories: ["Data Management", "Governance", "Import Process"],
    categoryColors: ["#64748B", "#2563EB", "#D97706"],
    title: "Salesforce Bulk Import Governance Framework",
    teaser: "Created a governed framework for preparing, matching, enriching, and importing large external datasets into Salesforce. The process included normalization, deduplication, account hierarchy review, opportunity conflict checks, territory-based ownership assignment, and campaign attribution standards. It helped prevent duplicate records, protect pipeline quality, improve reporting consistency, and create a repeatable process for future bulk imports.",
    tags: ["Bulk Data Operations", "Data Normalization", "Matching & Deduplication", "Campaign Attribution", "CRM Governance"],
    pdfUrl: null as string | null,
    Graphic: BulkImportSVG,
  },
  {
    id: 10,
    categories: ["Data Tracking", "Historical Backfill", "KPI Readiness"],
    categoryColors: ["#DC2626", "#1E3A8A", "#16A34A"],
    title: "No Go Date Tracking & Historical Backfill",
    teaser: "Improved lead lifecycle reporting by introducing a No Go Date field to track when leads were most recently disqualified. The work included UAT support, field behavior validation, historical Field History Tracking analysis, and a backfill process for approximately 25,000 existing records. The result was stronger reporting accuracy, better lead quality analysis, and immediate KPI readiness at go-live instead of waiting for new data to accumulate.",
    tags: ["Lead Lifecycle Reporting", "Field History Tracking", "Historical Backfill", "UAT Testing", "KPI Readiness"],
    pdfUrl: null as string | null,
    Graphic: NoGoDateSVG,
  },
  {
    id: 11,
    categories: ["Salesforce Tooling", "Chrome Extension", "Productivity"],
    categoryColors: ["#2563EB", "#7C3AED", "#16A34A"],
    title: "SF Turbo — Salesforce Chrome Extension",
    teaser: "A custom Chrome extension built to add one-click productivity tools directly inside Salesforce Lightning. It helped users copy 18-digit record IDs, inspect field API names, extract campaign hierarchy data, capture field snapshots, and compose outreach emails without leaving the record page. The project also solved deeper Lightning technical challenges by working around Shadow DOM limitations and building a reusable Manifest V3 architecture.",
    tags: ["Chrome Extension", "JavaScript", "Salesforce Lightning", "Shadow DOM", "Sales Operations Tooling"],
    pdfUrl: null as string | null,
    Graphic: SFTurboSVG,
  },
];

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-portfolio">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.20em] text-[#2563EB] mb-3">Portfolio</p>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight mb-4" data-testid="text-portfolio-title">
            Featured Salesforce Case Studies
          </h2>
          <p className="text-[16px] text-[#6B7280] max-w-2xl mx-auto leading-[1.6]">
            Real examples of Salesforce reporting, automation, data cleanup, lead routing, dashboard design, and CRM operations work.
          </p>
          <p className="text-[14px] text-[#9CA3AF] max-w-2xl mx-auto leading-[1.6] mt-2">
            Each project highlights a practical business problem, the Salesforce solution built, and the operational value delivered through cleaner data, better automation, stronger reporting, and improved sales visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow duration-200"
              style={{ boxShadow: "0 2px 8px -2px rgba(30,58,138,0.07), 0 8px 20px -4px rgba(30,58,138,0.08)" }}
              data-testid={`card-portfolio-${study.id}`}
            >
              {/* Graphic */}
              <div className="w-full h-[180px] bg-[#EEF4FF] overflow-hidden flex items-center justify-center">
                <study.Graphic />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-1 mb-2">
                  {study.categories.map((cat, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-[0.10em]">
                      {i > 0 && <span className="text-[#D1D5DB] mx-1">·</span>}
                      <span style={{ color: study.categoryColors[i] }}>{cat}</span>
                    </span>
                  ))}
                </div>

                <h3 className="text-[16px] font-bold text-[#111827] leading-snug mb-3">
                  {study.title}
                </h3>

                <p className="text-[13px] text-[#6B7280] leading-[1.65] mb-4" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {study.teaser}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {study.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium text-[#374151] bg-[#F3F4F6] border border-[#E5E7EB] px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {study.pdfUrl ? (
                  <a
                    href={study.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
                    data-testid={`link-portfolio-pdf-${study.id}`}
                  >
                    View PDF Case Study →
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-[#F3F4F6] text-[#9CA3AF] text-[13px] font-medium px-4 py-2 rounded-lg cursor-default">
                    PDF Case Study — Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px] text-[#9CA3AF] mt-8">
          11 Salesforce projects showcased — additional work samples available upon request.
        </p>
      </div>
    </section>
  );
}

// ─── END PORTFOLIO SECTION ────────────────────────────────────────────────────

function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-10" data-testid="text-faq-title">
          Frequently Asked Questions
        </h2>

        <div className="bg-[#F1F5FF] rounded-xl border border-[#DBEAFE] px-6 shadow-sm">
          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-[#DBEAFE]" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-[16px] font-semibold text-[#111827] text-left no-underline hover:no-underline hover:text-[#1E3A8A] transition-colors min-h-[48px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-[#4B5563] leading-[1.6]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function BookACallSection() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      requestType: "Intro Call",
      timezone: "America/Chicago",
      meetingType: "Zoom",
      timeWindow1: "",
      timeWindow2: "",
      timeWindow3: "",
      notes: "",
    },
  });

  useEffect(() => {
    const handler = () => {
      form.setValue("requestType", "Project Quote");
    };
    window.addEventListener("preselect-quote", handler);
    return () => window.removeEventListener("preselect-quote", handler);
  }, [form]);

  const mutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: (data) => {
      setSubmitted(true);
      if (data.smtpNotConfigured) {
        toast({
          title: "Request saved",
          description: "Email delivery isn't configured yet \u2014 your request was saved. You can also email mark@salesforcemark.com.",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (submitted) {
    return (
      <section id="book-a-call" className="relative py-20 sm:py-24 bg-white" data-testid="section-book-a-call">
        <BookCallBackground />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-[#1E3A8A]" />
            </div>
            <h2 className="text-[24px] font-bold text-[#111827] mb-3" data-testid="text-booking-success">
              We've received your message!
            </h2>
            <p className="text-[18px] text-[#6B7280] leading-[1.6]">
              I will review your needs and be in touch in the next 24 hours. We look forward to working with you!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-a-call" className="relative py-20 sm:py-24 bg-white" data-testid="section-book-a-call">
      <BookCallBackground />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#111827] tracking-tight text-center mb-3" data-testid="text-book-title">
            Discuss a Salesforce Project or Support Need
          </h2>
          <p className="text-[16px] text-[#6B7280] text-center leading-[1.6] mb-10 max-w-lg mx-auto">
            Need help with Salesforce cleanup, reporting, lead routing, automation, or project support? Use the form below to reach out. Direct company projects and consulting firm / agency support requests are both welcome.
          </p>

          <div className="bg-white rounded-md border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-5" data-testid="form-booking">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] font-medium text-[#111827]">Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="border-[#E5E7EB]" {...field} data-testid="input-booking-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] font-medium text-[#111827]">Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" className="border-[#E5E7EB]" {...field} data-testid="input-booking-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#111827]">Company *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" className="border-[#E5E7EB]" {...field} data-testid="input-booking-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#111827]">Phone <span className="text-[#9CA3AF] font-normal">(optional)</span></FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" className="border-[#E5E7EB]" {...field} value={field.value || ""} data-testid="input-booking-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#111827]">I'm reaching out about</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger className="border-[#E5E7EB]" data-testid="select-inquiry-type">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Direct company project">Direct company project</SelectItem>
                          <SelectItem value="Consulting firm / agency support">Consulting firm / agency support</SelectItem>
                          <SelectItem value="Reporting / dashboard project">Reporting / dashboard project</SelectItem>
                          <SelectItem value="Data cleanup / deduplication">Data cleanup / deduplication</SelectItem>
                          <SelectItem value="Lead routing / automation">Lead routing / automation</SelectItem>
                          <SelectItem value="Zapier / integration work">Zapier / integration work</SelectItem>
                          <SelectItem value="General project inquiry">General project inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#111827]">Describe your Salesforce project or need *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., We need help cleaning up duplicate records, building dashboards, fixing lead routing..."
                          className="border-[#E5E7EB] min-h-[100px]"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-booking-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-[13px] text-[#6B7280] text-center leading-[1.5]">
                  No obligation. Direct company projects and consulting firm support requests are both welcome.
                </p>

                <Button
                  type="submit"
                  className="w-full bg-[#1E3A8A] text-white text-[16px]"
                  disabled={mutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {mutation.isPending ? "Sending..." : "Send Project Inquiry"}
                </Button>

                <p className="text-center text-[13px] text-[#6B7280] mt-2" data-testid="text-reply-time">
                  I'll reply within 1 business day.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-[#111827]" data-testid="footer">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <img src={logoImg} alt="Salesforce Mark — Independent Salesforce Consultant" className="h-[80px] md:h-[100px] w-auto" data-testid="img-footer-logo" />
            <p className="text-[14px] text-[#9CA3AF] leading-[1.6] max-w-[260px] text-center sm:text-left">
              Salesforce project support for cleanup, reporting, automation, integrations, and optimization.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2.5">
            <h4 className="text-[14px] font-semibold text-white mb-1">Credentials</h4>
            {[
              "Salesforce Certified Administrator",
              "Salesforce AI Associate",
              "25+ years experience",
              "Salesforce | Zapier | Clay",
            ].map((item) => (
              <span key={item} className="text-[13px] text-[#9CA3AF]">{item}</span>
            ))}
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3 text-center sm:text-right">
            <h4 className="text-[14px] font-semibold text-white mb-1">Contact</h4>
            <a
              href="mailto:mark@salesforcemark.com"
              className="inline-flex items-center gap-2 text-[14px] text-[#D1D5DB] hover:text-white transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="w-4 h-4" />
              mark@salesforcemark.com
            </a>

            <a
              href="https://www.linkedin.com/in/mark-mathis-mba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-[13px] font-semibold transition-all duration-200 hover:bg-[#004182]"
              data-testid="link-footer-linkedin"
            >
              <LinkedInIcon className="w-4 h-4" />
              LinkedIn
            </a>

            <p className="text-[13px] text-[#9CA3AF] mt-2">
              &copy; {new Date().getFullYear()} Salesforce Mark. All rights reserved.
            </p>
            <p className="text-[13px] text-[#6B7280]">
              Your information is kept confidential and never shared.
            </p>
            <a
              href="/salesforce-optimization-guide"
              className="text-[11px] text-[#4B5563] hover:text-[#6B7280] transition-colors mt-1"
              data-testid="link-footer-bridge"
            >
              Salesforce Optimization Guide
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ConsultingFirmsSection />
      <WhoWeHelpSection />
      <ProblemsSection />
      <ServicesSection />
      <WhyDifferentSection />
      <ZapierClaySection />
      <ProcessSection />
      <PricingSection />
      <CaseStudiesSection />
      <AboutSection />
      <PortfolioSection />
      <FaqSection />
      <BookACallSection />
      <Footer />
    </div>
  );
}
