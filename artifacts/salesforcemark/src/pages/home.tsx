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
              Clean Up Salesforce,<br />
              Automate Lead Flow,<br />
              and <span className="text-[#1E3A8A]">Trust Your</span><br />
              <span className="text-[#1E3A8A]">Data Again</span>
            </h1>

            <p className="mt-6 text-[18px] text-[#6B7280] leading-[1.6] max-w-[540px]" data-testid="text-hero-subtitle">
              We help B2B companies clean up messy Salesforce data, automate lead routing, and build dashboards leadership can actually trust.
            </p>

            <div className="mt-4 bg-[#EEF4FF] border-l-4 border-[#2563EB] rounded-md px-3.5 py-2.5 max-w-[480px]" data-testid="text-hero-qualifier">
              <p className="text-[14px] text-[#1E3A8A] font-medium leading-[1.5]">
                Best for companies already using Salesforce that need better data quality, automation, and reporting.
              </p>
            </div>

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
                Request Free Optimization Review
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <button
                onClick={() => scrollTo("services")}
                className="text-[15px] font-medium text-[#1E3A8A] border border-[#1E3A8A]/30 px-5 py-2.5 rounded-lg hover:bg-[#1E3A8A]/[0.05] transition-colors"
                data-testid="button-hero-services"
              >
                See Services
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const bestFit = [
  "B2B companies already using Salesforce",
  "Teams generating inbound leads from websites, campaigns, events, or partners",
  "Organizations with messy lead/contact data",
  "Sales or marketing teams dealing with manual lead routing",
  "Leaders who need reporting they can trust",
];

const notBestFit = [
  "Brand new Salesforce implementations",
  "Heavy custom development / Apex projects",
  "Large multi-phase enterprise rollouts",
];

function WhoWeHelpSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-who-we-help">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-who-title">
          Who We Work Best With
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-4 leading-[1.6]">
          Most clients come to us after Salesforce has been running for a while and their data, lead routing, or reporting has become messy.
        </p>
        <p className="text-[15px] text-[#6B7280] text-center max-w-2xl mx-auto mb-12 leading-[1.6]">
          We work best with companies that already use Salesforce and want to improve data quality, lead flow, automation, and reporting without hiring a full-time specialist.
        </p>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            className="rounded-xl bg-[#EEF4FF] p-6 sm:p-8 border border-[#DBEAFE]"
            style={{ boxShadow: "0 6px 12px -2px rgba(30,58,138,0.12), 0 16px 36px -6px rgba(30,58,138,0.16)" }}
          >
            <h3 className="text-[19px] font-bold text-[#111827] mb-5">
              Best Fit
            </h3>
            <ul className="space-y-3">
              {bestFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-[#111827] leading-[1.5]" data-testid={`text-best-fit-${i}`}>
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 sm:p-8 border border-[#E5E7EB]">
            <h3 className="text-[19px] font-bold text-[#111827] mb-5">
              Not the Best Fit
            </h3>
            <ul className="space-y-3">
              {notBestFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-[#6B7280] leading-[1.5]" data-testid={`text-not-fit-${i}`}>
                  <XCircle className="w-4 h-4 text-[#9CA3AF] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const problems = [
  { text: "Duplicate leads and contacts cluttering the CRM", icon: Database },
  { text: "Inbound leads not assigned quickly or correctly", icon: Users },
  { text: "Missing contact and company data hurting follow-up", icon: Search },
  { text: "Manual lead routing wasting time", icon: Zap },
  { text: "Dashboards that leadership doesn't trust", icon: BarChart3 },
  { text: "Reports that don't reflect what sales and marketing are actually doing", icon: AlertTriangle },
  { text: "Lead sources not tracked clearly", icon: TrendingUp },
  { text: "Sales reps working from incomplete or outdated data", icon: Wrench },
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
            href="#book-a-call"
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#FBBF24] text-white font-bold text-[16px] px-8 py-3 rounded-lg shadow-md transition-all"
            data-testid="button-problems-cta"
          >
            Get Your Free Salesforce Review →
          </a>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Salesforce Data Cleanup & Deduplication",
    sentence: "Clean up duplicate leads and contacts, normalize fields, standardize naming, and make Salesforce usable again.",
    bullets: [
      "Lead deduplication",
      "Contact deduplication",
      "Field normalization",
      "Company cleanup",
      "Duplicate prevention support",
    ],
    icon: Database,
    accentColor: "#1E3A8A",
    gradientFrom: "from-[#1E3A8A]",
    gradientTo: "to-[#2563EB]",
  },
  {
    title: "Automated Lead Routing & Assignment",
    sentence: "Make sure inbound leads are handled quickly and consistently.",
    bullets: [
      "Assign lead owners by zip code, territory, or rules",
      "Create vs. update logic",
      "Rep notifications",
      "Routing workflows for web forms and imported leads",
    ],
    icon: Rocket,
    accentColor: "#1E40AF",
    gradientFrom: "from-[#1E40AF]",
    gradientTo: "to-[#1E3A8A]",
  },
  {
    title: "CRM Data Enrichment with Clay",
    sentence: "Improve CRM record quality by enhancing missing information and making data more useful for sales and reporting.",
    bullets: [
      "Fill in missing contact/company data",
      "Improve segmentation fields",
      "Enhance records using Clay",
      "Strengthen lead quality for follow-up and reporting",
    ],
    icon: Users,
    accentColor: "#2563EB",
    gradientFrom: "from-[#2563EB]",
    gradientTo: "to-[#3B82F6]",
  },
  {
    title: "Salesforce + Zapier Workflow Automation",
    sentence: "Automate manual CRM processes so leads move faster and cleaner through the system.",
    bullets: [
      "Form to Salesforce automation",
      "Data transformation before import",
      "Notification workflows",
      "Update/insert logic",
      "Handoff between systems",
    ],
    icon: Zap,
    accentColor: "#2563EB",
    gradientFrom: "from-[#1E3A8A]",
    gradientTo: "to-[#3B82F6]",
  },
  {
    title: "Dashboards & CRM Visibility",
    sentence: "Build clearer dashboards and reports so leadership can trust the numbers again.",
    bullets: [
      "Lead source dashboards",
      "Assignment and response tracking",
      "Conversion reporting",
      "Sales/marketing visibility",
      "Performance views for leadership",
    ],
    icon: BarChart3,
    accentColor: "#1E3A8A",
    gradientFrom: "from-[#2563EB]",
    gradientTo: "to-[#1E3A8A]",
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
  "Enterprise background with real-world business experience",
  "Strong understanding of both Salesforce and marketing/lead flow",
  "Specialized in CRM data quality and lead automation",
  "Direct access to the consultant doing the work (no agency layers)",
  "Practical solutions without agency overhead",
  "Modern tool stack including Salesforce, Zapier, and Clay",
];

function WhyDifferentSection() {
  return (
    <section className="py-20 sm:py-24 bg-white" data-testid="section-why-different">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-12" data-testid="text-why-title">
          Why Clients Work With Me
        </h2>

        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {whyDifferent.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-[#EEF4FF] border border-[#DBEAFE] rounded-lg p-4" data-testid={`text-why-${i}`}>
              <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] mt-0.5 shrink-0" />
              <span className="text-[15px] text-[#111827] leading-[1.5] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const zapierClayBullets = [
  "Automatic lead cleanup before import",
  "Enrichment of missing fields",
  "Create vs. update logic",
  "Assignment workflows",
  "Notifications",
  "Cleaner reporting downstream",
];

function ZapierClaySection() {
  return (
    <section className="py-20 sm:py-24 bg-[#F8FAFC]" data-testid="section-zapier-clay">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-zapier-title">
          More Than Just Salesforce Configuration
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center max-w-2xl mx-auto mb-4 leading-[1.6]">
          Many CRM problems start before the data even reaches Salesforce. We use tools like Zapier and Clay to help clean, enrich, transform, and route data so your system works better end-to-end.
        </p>
        <p className="text-[15px] text-[#6B7280] font-medium text-center max-w-2xl mx-auto mb-12 leading-[1.6]">
          This allows lead data to be cleaned, enriched, and routed before it even reaches Salesforce.
        </p>

        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {zapierClayBullets.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-white border border-[#E5E7EB]" data-testid={`text-zapier-${i}`}>
              <Zap className="w-5 h-5 text-[#F59E0B] mt-0.5 shrink-0" />
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
    title: "Tell Me What's Not Working",
    subtitle: "Start here",
    description: "Tell us where your Salesforce or lead process is breaking down.",
    icon: Mail,
  },
  {
    step: "2",
    title: "We Review & Identify Opportunities",
    subtitle: "Analysis",
    description: "We review your current setup, pain points, and priorities.",
    icon: Search,
  },
  {
    step: "3",
    title: "Get a Clear Action Plan",
    subtitle: "Recommendations",
    description: "You receive practical recommendations and next steps.",
    icon: Rocket,
  },
  {
    step: "4",
    title: "Improve Data, Automation & Reporting",
    subtitle: "Implementation",
    description: "If it's a fit, we help implement targeted improvements.",
    icon: TrendingUp,
  },
];

function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-24 bg-white" data-testid="section-process">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[30px] sm:text-[34px] font-bold text-[#111827] tracking-tight text-center mb-4" data-testid="text-process-title">
          Simple, Practical Process
        </h2>
        <p className="text-[18px] text-[#6B7280] text-center max-w-xl mx-auto mb-16">
          Efficient and asynchronous. No heavy onboarding required.
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
    icon: Database,
    problem: "Thousands of duplicate leads and contacts cluttering Salesforce.",
    solution: "Implemented deduplication rules and data normalization.",
    result: "Cleaner reporting and easier lead management.",
  },
  {
    icon: Users,
    problem: "Inbound leads sitting unassigned, slowing response times.",
    solution: "Built automated routing by geographic rules with rep notifications.",
    result: "Faster lead assignment and improved owner visibility.",
  },
  {
    icon: BarChart3,
    problem: "Leadership unable to trust CRM dashboards or reporting.",
    solution: "Created dashboards showing lead source performance, routing activity, and follow-up trends.",
    result: "Data-driven decisions with reports leadership actually uses.",
  },
];

const typicalImprovements = [
  "Major reduction in duplicate leads and contacts",
  "Faster assignment of inbound leads",
  "Cleaner CRM data for reporting and segmentation",
  "Automated lead routing replacing manual work",
  "Dashboards leadership can actually trust",
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

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
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
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#DC2626]">Problem</span>
                  <p className="text-[14px] text-[#111827] leading-[1.5] mt-1">{study.problem}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#2563EB]">Solution</span>
                  <p className="text-[14px] text-[#6B7280] leading-[1.5] mt-1">{study.solution}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#16A34A]">Result</span>
                  <p className="text-[14px] text-[#111827] font-medium leading-[1.5] mt-1">{study.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="max-w-xl mx-auto rounded-xl bg-white border border-[#DBEAFE] p-8 sm:p-10 relative overflow-hidden"
          style={{ boxShadow: "0 4px 6px -1px rgba(30,58,138,0.08), 0 10px 30px -5px rgba(30,58,138,0.12)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]" />
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-[#1E3A8A]" />
            <h3 className="text-[20px] font-bold text-[#111827]">Typical Improvements Clients See</h3>
          </div>
          <div className="space-y-4">
            {typicalImprovements.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB]/60" data-testid={`text-improvement-${i}`}>
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] mt-0.5 shrink-0" />
                <span className="text-[15px] text-[#111827] leading-[1.5] font-medium">{item}</span>
              </div>
            ))}
          </div>
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
                I combine enterprise technology experience, digital marketing systems knowledge, and hands-on CRM automation skills to help companies get more value from Salesforce.
              </p>

              <p className="text-[15px] text-[#6B7280] leading-[1.6] mb-5">
                In addition to Salesforce expertise, I bring decades of experience in digital marketing, CRM strategy, and automation.
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
    question: "Do you only work with Salesforce?",
    answer: "I primarily help companies improve Salesforce, especially around data quality, lead flow, automation, and reporting.",
  },
  {
    question: "Do you work with Zapier and Clay?",
    answer: "Yes. I often use Zapier for automation and Clay for data cleanup and enrichment where appropriate.",
  },
  {
    question: "Do I need to give you Salesforce access right away?",
    answer: "No. Initial reviews can begin with your description of the issues, screenshots, or a discussion of your process.",
  },
  {
    question: "Are you a good fit for brand new Salesforce implementations?",
    answer: "Usually I'm a better fit for companies that already use Salesforce and need optimization, cleanup, automation, or improved reporting.",
  },
  {
    question: "Do you do ongoing support?",
    answer: "Yes, for the right clients I can provide ongoing optimization and improvement support.",
  },
];

function PricingSection() {
  const cards = [
    {
      badge: "Start here",
      badgeColor: "bg-[#F1F5FF] text-[#1E3A8A]",
      title: "Salesforce Audit",
      price: "$1,500",
      priceSub: "one-time · delivered in 5 business days",
      quote: '"I know something\'s wrong — I just don\'t know where to start."',
      body: "Before you fix anything, you need to know what's actually broken. This audit gives you a complete picture of your Salesforce org — data quality issues, automation gaps, reporting blind spots, and a prioritized action plan so you know exactly what to tackle first.",
      bullets: [
        "Full org health assessment",
        "Data quality & hygiene report",
        "Automation & flow gap analysis",
        "Dashboard & reporting review",
        "Written recommendations doc",
        "1-hr debrief call with Mark",
      ],
      cta: "Get your audit →",
      featured: false,
    },
    {
      badge: "Most popular",
      badgeColor: "bg-[#DBEAFE] text-[#1E3A8A]",
      title: "Implementation Project",
      price: "$3,500 –",
      priceSecond: "$8,500",
      priceSub: "fixed-price · scoped per project",
      quote: '"We know what we need — we just need someone to build it right."',
      body: "A focused, fixed-price engagement to solve a specific Salesforce problem — data cleanup, lead flow automation, dashboard buildout, or Marketing Cloud setup. You get a defined scope, a clear timeline, and a finished deliverable. No hourly billing surprises.",
      bullets: [
        "Discovery & scoping call",
        "Full build & configuration",
        "Testing & QA",
        "Team training session",
        "Documentation handoff",
        "30 days of post-launch support",
      ],
      cta: "Start a project →",
      featured: true,
    },
    {
      badge: "Best long-term value",
      badgeColor: "bg-[#DCFCE7] text-[#166534]",
      title: "Monthly Retainer",
      price: "$2,000 –",
      priceSecond: "$4,000",
      priceSub: "/month · 3-month minimum",
      quote: '"We need ongoing Salesforce support without hiring a full-time admin."',
      body: "Your dedicated Salesforce expert — without the overhead of a full-time hire. I handle ongoing admin, reporting, and optimization so your team can focus on selling and growing. Scope adjusts monthly based on what you need.",
      bullets: [
        "Up to 20 hrs/month",
        "Reports & dashboard updates",
        "User support & fixes",
        "Monthly strategy call",
        "Agentforce & AI feature rollouts",
        "Priority response (within 4 hrs)",
      ],
      cta: "Let's talk →",
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-white" data-testid="section-pricing">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#111827] tracking-tight mb-4" data-testid="text-pricing-title">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#4B5563] leading-relaxed">
            No surprise invoices. No scope creep. Every engagement starts with a clear scope, a fixed price, and a defined outcome — so you always know exactly what you're getting.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((card, i) => (
            <div
              key={i}
              data-testid={`card-pricing-${i}`}
              className={`relative flex flex-col rounded-2xl border p-7 transition-shadow ${
                card.featured
                  ? "bg-[#1E3A8A] border-[#1E3A8A] shadow-2xl scale-[1.03] z-10"
                  : "bg-white border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Badge */}
              <span
                className={`inline-block self-start text-[12px] font-semibold px-3 py-1 rounded-full mb-4 ${
                  card.featured ? "bg-white/20 text-white" : card.badgeColor
                }`}
                data-testid={`badge-pricing-${i}`}
              >
                {card.badge}
              </span>

              {/* Title */}
              <h3 className={`text-[20px] font-bold mb-3 ${card.featured ? "text-white" : "text-[#111827]"}`}>
                {card.title}
              </h3>

              {/* Price */}
              <div className="mb-1">
                <span className={`text-[38px] font-extrabold leading-none ${card.featured ? "text-white" : "text-[#111827]"}`}>
                  {card.price}
                </span>
                {card.priceSecond && (
                  <span className={`text-[38px] font-extrabold leading-none block ${card.featured ? "text-white" : "text-[#111827]"}`}>
                    {card.priceSecond}
                  </span>
                )}
              </div>
              <p className={`text-[13px] mb-4 ${card.featured ? "text-blue-200" : "text-[#6B7280]"}`}>
                {card.priceSub}
              </p>

              {/* Quote */}
              <blockquote className={`italic text-[14px] leading-snug border-l-4 pl-3 mb-4 ${
                card.featured ? "border-white/40 text-blue-100" : "border-[#1E3A8A]/30 text-[#4B5563]"
              }`}>
                {card.quote}
              </blockquote>

              {/* Body */}
              <p className={`text-[14px] leading-relaxed mb-5 ${card.featured ? "text-blue-100" : "text-[#4B5563]"}`}>
                {card.body}
              </p>

              {/* Bullets */}
              <ul className="space-y-2 mb-8 flex-1">
                {card.bullets.map((b, j) => (
                  <li key={j} className={`flex items-start gap-2 text-[14px] ${card.featured ? "text-blue-100" : "text-[#374151]"}`}>
                    <span className={`mt-0.5 font-bold ${card.featured ? "text-[#F59E0B]" : "text-[#1E3A8A]"}`}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#book-a-call"
                data-testid={`link-pricing-cta-${i}`}
                className={`block text-center rounded-xl py-3 px-6 font-semibold text-[15px] transition-all ${
                  card.featured
                    ? "bg-[#F59E0B] text-white hover:bg-[#FBBF24] shadow-lg"
                    : "bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#F1F5FF]"
                }`}
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[14px] text-[#6B7280] mt-10">
          Not sure which fits?{" "}
          <a href="#book-a-call" className="text-[#1E3A8A] font-semibold hover:underline" data-testid="link-pricing-footer-cta">
            Start with the free optimization review
          </a>{" "}
          — it takes 30 minutes and you'll leave knowing exactly what your Salesforce org needs.
        </p>
      </div>
    </section>
  );
}

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
            Free Salesforce Optimization Review
          </h2>
          <p className="text-[16px] text-[#6B7280] text-center leading-[1.6] mb-10 max-w-md mx-auto">
            Tell us what's not working in your Salesforce setup, lead process, or reporting. We'll review your situation and respond with practical next steps. No hard sell.
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-medium text-[#111827]">Current Salesforce challenge *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Our reports don't match reality, leads aren't getting routed correctly, data is a mess..."
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
                  No risk or obligation. Just practical feedback on your Salesforce setup.
                </p>

                <Button
                  type="submit"
                  className="w-full bg-[#1E3A8A] text-white text-[16px]"
                  disabled={mutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {mutation.isPending ? "Sending..." : "Request My Free Review"}
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
              Independent Salesforce consultant focused on CRM data quality, lead automation, and reporting.
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
      <WhoWeHelpSection />
      <ProblemsSection />
      <ServicesSection />
      <WhyDifferentSection />
      <ZapierClaySection />
      <ProcessSection />
      <PricingSection />
      <CaseStudiesSection />
      <AboutSection />
      <FaqSection />
      <BookACallSection />
      <Footer />
    </div>
  );
}
