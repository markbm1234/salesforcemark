import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, ArrowDown, ArrowRight, Mail } from "lucide-react";
import logoImg from "@assets/salesforce-mark-trans_1772743593281.png";
import heroCertBadges from "@assets/certified-salesforce-professional_1773064053755.png";
import trustedBannerImg from "@assets/trusted-by-large-corporations2_1773064309842.png";
import markHeadshot from "@assets/freepik__mark-create-headshot-make-man-fit-strong-chest-hea___1773283600823.jpeg";

const insertBookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  requestType: z.string().optional(),
  timezone: z.string().optional(),
  meetingType: z.string().optional(),
  timeWindow1: z.string().optional(),
  timeWindow2: z.string().optional(),
  timeWindow3: z.string().optional(),
  notes: z.string().min(10, "Please provide more details (at least 10 characters)"),
});

type InsertBooking = z.infer<typeof insertBookingSchema>;

const problems = [
  { num: "1", title: "Lead Routing Chaos", body: "Leads are assigned manually or routed incorrectly, causing slow follow-up and lost opportunities." },
  { num: "2", title: "Duplicate Records Everywhere", body: "Duplicate contacts and accounts make reporting unreliable and frustrate sales teams." },
  { num: "3", title: "Automation Conflicts", body: "Multiple workflows, flows, and triggers compete with each other causing unpredictable behavior." },
  { num: "4", title: "Reports Nobody Trusts", body: "Pipeline reports and dashboards show incorrect data because the underlying fields aren't structured properly." },
  { num: "5", title: "Sales Teams Avoid Using Salesforce", body: "When the system becomes slow or confusing, sales teams stop entering data." },
  { num: "6", title: "Marketing & Sales Systems Aren't Connected", body: "Lead generation tools and marketing automation often fail to sync correctly with Salesforce." },
  { num: "7", title: "Data Structure Was Never Designed Properly", body: "Many Salesforce systems grow organically without a clear data architecture." },
];

const fixesBullets = [
  "Leads instantly route to the correct sales rep",
  "Duplicate data is cleaned and prevented from re-entering",
  "Automation works consistently instead of randomly",
  "Sales teams trust their pipeline reports again",
  "Marketing and sales systems sync correctly",
  "Dashboards give leadership accurate, real-time visibility",
];

const reviewBullets = [
  "broken automations",
  "data quality issues",
  "lead routing problems",
  "reporting inconsistencies",
  "opportunities to simplify workflows",
];

const painBullets = [
  "leads going to the wrong sales rep",
  "duplicate contacts and accounts",
  "reports that don't match reality",
  "automation that sometimes works and sometimes doesn't",
  "sales reps avoiding the system entirely",
];

function HeroSection() {
  return (
    <section className="pt-8 pb-16 sm:pb-20 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="flex-1 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF4FF] border border-[#BFDBFE] text-[13px] font-semibold text-[#1E3A8A] mb-6">
              Salesforce Optimization
            </div>

            <h1 className="text-[30px] sm:text-[36px] lg:text-[42px] font-bold text-[#111827] tracking-tight leading-[1.15] mb-5">
              Your Salesforce Isn't Broken — It's Just Never Been Optimized
            </h1>

            <p className="text-[16px] text-[#6B7280] leading-[1.7] mb-4">
              Most companies install Salesforce and assume the system will magically run itself. But without proper configuration, automation, and data structure, even powerful CRM systems become slow, messy, and unreliable.
            </p>

            <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 mb-6">
              <p className="text-[14px] font-semibold text-[#374151] mb-3">If your Salesforce system feels messy or unreliable, you may be experiencing:</p>
              <ul className="space-y-2">
                {painBullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#6B7280]">
                    <span className="text-[#D97706] mt-0.5 shrink-0 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[15px] font-semibold text-[#1E3A8A] mb-6">
              The good news: most of these problems are fixable quickly once you know where to look.
            </p>

            <a
              href="#problems"
              className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white text-[15px] font-semibold px-6 py-4 rounded-lg hover:bg-[#1a3278] transition-colors"
              data-testid="link-bridge-hero-cta"
            >
              See The 7 Salesforce Problems Costing Companies Revenue
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

          <div className="lg:w-[300px] flex flex-col items-center gap-4 pt-8">
            <img
              src={markHeadshot}
              alt="Mark Mathis — Salesforce Optimization Consultant"
              className="w-[220px] sm:w-[260px] lg:w-[280px] rounded-2xl shadow-lg object-cover"
              data-testid="img-bridge-headshot"
            />
            <div className="text-center">
              <p className="text-[16px] font-bold text-[#111827]">Mark Mathis</p>
              <p className="text-[14px] text-[#6B7280] mb-3">Salesforce Optimization Consultant</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  Salesforce Administrator Certified
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                  Enterprise CRM Implementation Experience
                </div>
              </div>
              <img
                src={logoImg}
                alt="Salesforce Mark"
                className="h-[52px] w-auto mx-auto mt-4 opacity-90"
              />
              <img
                src={heroCertBadges}
                alt="Salesforce Certified badges"
                className="w-[160px] mx-auto mt-2 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealitySection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-10">
          Most Salesforce Problems Aren't Software Problems
        </h2>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-6">
          Salesforce is one of the most powerful CRM platforms available.
        </p>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-4 font-medium">
          But in many companies the system evolves over time:
        </p>

        <ul className="space-y-2 mb-6 pl-2">
          {["Salesforce gets installed", "workflows and automations are added", "reports are created", "teams start using it"].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-[#374151]">
              <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-4 font-medium">Then over time problems appear:</p>

        <ul className="space-y-2 mb-6 pl-2">
          {["automation breaks", "duplicate records multiply", "reports become unreliable", "leads stop routing correctly", "sales teams stop trusting the system"].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-[#6B7280]">
              <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-[#D97706] font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-3 font-medium">Eventually leadership asks:</p>

        <blockquote className="border-l-4 border-[#1E3A8A] pl-5 py-2 mb-6 bg-[#F8FAFC] rounded-r-lg">
          <p className="text-[17px] italic text-[#111827]">"Do we need a new CRM?"</p>
        </blockquote>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-2">In most cases, the answer is no.</p>
        <p className="text-[17px] font-semibold text-[#1E3A8A]">The system simply needs optimization.</p>
      </div>
    </section>
  );
}

function ProblemsSection() {
  return (
    <section id="problems" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-12">
          7 Salesforce Problems Costing Companies Revenue
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div key={i} className="bg-[#EEF4FF] border border-[#DBEAFE] rounded-xl p-5" data-testid={`card-bridge-problem-${i}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-[#1E3A8A] text-white text-[13px] font-bold flex items-center justify-center shrink-0">
                  {p.num}
                </span>
                <h3 className="text-[15px] font-bold text-[#111827] leading-tight">{p.title}</h3>
              </div>
              <p className="text-[14px] text-[#6B7280] leading-[1.6]">{p.body}</p>
            </div>
          ))}

          <div className="bg-[#1E3A8A] text-white rounded-xl p-5 flex flex-col justify-center">
            <p className="text-[15px] font-semibold leading-[1.6] mb-3">Any of these sound familiar?</p>
            <p className="text-[14px] text-[#BFDBFE] leading-[1.6]">
              Most companies have 3–5 of these at the same time. The good news — they're all fixable.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white border border-[#DBEAFE] rounded-xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
          <p className="text-[17px] font-semibold text-[#111827] mb-2">
            Seeing these issues in your Salesforce system?
          </p>
          <p className="text-[15px] text-[#6B7280] leading-[1.6] mb-5">
            I offer a short Salesforce Optimization Review where we identify automation issues, data problems, and opportunities to improve your CRM.
          </p>
          <a
            href="#review"
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-[15px] font-bold px-6 py-3 rounded-lg transition-colors"
            data-testid="link-bridge-mid-cta"
          >
            Get Free Review
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-10">
          Why Companies Ask Me to Fix Their Salesforce Systems
        </h2>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-5">
          Early in my career I worked on large technology implementations through Accenture, helping global companies deploy enterprise systems.
        </p>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-4">
          Since then I've worked with Salesforce environments used by organizations including:
        </p>

        <div className="flex justify-center mb-6">
          <img
            src={trustedBannerImg}
            alt="Trusted by Accenture, Chevron, Halliburton, Duke Energy"
            className="w-full max-w-[420px] sm:max-w-[520px]"
            loading="lazy"
          />
        </div>

        <p className="text-[16px] text-[#374151] leading-[1.7] mb-3 font-medium">What I've learned is simple:</p>
        <p className="text-[16px] text-[#374151] leading-[1.7] mb-2">
          Most Salesforce problems are not software problems.
        </p>
        <p className="text-[16px] text-[#374151] leading-[1.7] mb-5">
          They come from configuration decisions made early in the system's life.
        </p>
        <p className="text-[17px] font-semibold text-[#1E3A8A]">
          Once those are corrected, the entire CRM becomes dramatically easier to use.
        </p>

        <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-6 mt-8">
          <p className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">Example Salesforce Optimization Result</p>
          <p className="text-[15px] text-[#374151] leading-[1.7] mb-4">
            A mid-size services company contacted me because their Salesforce pipeline reports were completely unreliable.
          </p>
          <p className="text-[14px] font-semibold text-[#374151] mb-2">Problems discovered:</p>
          <ul className="space-y-1 mb-5">
            {["duplicate opportunities", "broken automation rules", "inconsistent stage definitions"].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-[#6B7280]">
                <span className="text-[#D97706] font-bold shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[14px] font-semibold text-[#374151] mb-2">After a short optimization project:</p>
          <ul className="space-y-1 mb-5">
            {["lead routing automated", "duplicate data eliminated", "pipeline reporting corrected"].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-[#16A34A]">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[15px] font-semibold text-[#1E3A8A]">
            Result: Sales leadership could finally trust their forecasts again.
          </p>
        </div>
      </div>
    </section>
  );
}

function FixesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight text-center mb-10">
          What Happens When Salesforce Is Properly Optimized
        </h2>
        <div className="space-y-3 mb-8">
          {fixesBullets.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-[#EEF4FF] border border-[#DBEAFE] rounded-lg p-4" data-testid={`text-bridge-fix-${i}`}>
              <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] mt-0.5 shrink-0" />
              <span className="text-[15px] text-[#111827] leading-[1.5] font-medium">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-[16px] text-[#374151] text-center leading-[1.7]">
          Instead of fighting the CRM, your team finally <span className="font-semibold text-[#1E3A8A]">works with it</span>.
        </p>
      </div>
    </section>
  );
}

function TransitionSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-[#111827] tracking-tight mb-6">
          How to Know If Your Salesforce System Needs Optimization
        </h2>
        <p className="text-[16px] text-[#374151] leading-[1.7] mb-6">
          The easiest way is a quick system review.
        </p>
        <p className="text-[16px] text-[#374151] leading-[1.7] mb-4 font-medium">
          During this review we typically identify:
        </p>
        <div className="text-left max-w-md mx-auto space-y-2 mb-8">
          {reviewBullets.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-[15px] text-[#374151]">
              <span className="text-[#F59E0B] font-bold mt-0.5 shrink-0">•</span>
              {item}
            </div>
          ))}
        </div>
        <p className="text-[16px] text-[#374151] leading-[1.7]">
          Most companies discover several improvements within the first conversation.
        </p>
      </div>
    </section>
  );
}

function BridgeForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "", email: "", company: "", phone: "",
      requestType: "Intro Call", timezone: "America/Chicago", meetingType: "Zoom",
      timeWindow1: "", timeWindow2: "", timeWindow3: "", notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: () => setSubmitted(true),
    onError: (error: Error) => {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
    },
  });

  if (submitted) {
    return (
      <section id="review" className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7 text-[#1E3A8A]" />
          </div>
          <h2 className="text-[24px] font-bold text-[#111827] mb-3">We've received your message!</h2>
          <p className="text-[17px] text-[#6B7280] leading-[1.6]">
            I will review your needs and be in touch within 24 hours. Looking forward to working with you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="review" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <h2 className="text-[26px] sm:text-[32px] font-bold text-[#111827] tracking-tight text-center mb-3">
          Check Your Salesforce System (Free Review)
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center leading-[1.6] mb-2 max-w-lg mx-auto">
          If your Salesforce system feels messy, slow, or unreliable, I'm happy to take a quick look and share recommendations.
        </p>
        <p className="text-[15px] font-semibold text-[#1E3A8A] text-center mb-8">No obligation.</p>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-5" data-testid="form-bridge">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111827]">Name *</FormLabel>
                    <FormControl><Input placeholder="Your name" className="border-[#E5E7EB]" {...field} data-testid="input-bridge-name" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111827]">Email *</FormLabel>
                    <FormControl><Input type="email" placeholder="you@company.com" className="border-[#E5E7EB]" {...field} data-testid="input-bridge-email" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111827]">Company *</FormLabel>
                  <FormControl><Input placeholder="Your company name" className="border-[#E5E7EB]" {...field} data-testid="input-bridge-company" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111827]">Phone <span className="text-[#9CA3AF] font-normal">(optional)</span></FormLabel>
                  <FormControl><Input type="tel" placeholder="(555) 123-4567" className="border-[#E5E7EB]" {...field} value={field.value || ""} data-testid="input-bridge-phone" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111827]">Current Salesforce challenge *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Our reports don't match reality, leads aren't getting routed correctly, data is a mess..."
                      className="border-[#E5E7EB] min-h-[100px]"
                      {...field}
                      value={field.value || ""}
                      data-testid="input-bridge-notes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <p className="text-[13px] text-[#6B7280] text-center leading-[1.5]">
                No risk or obligation. Just practical feedback on your Salesforce setup.
              </p>

              <div className="bg-[#FEF9EC] border border-[#FDE68A] rounded-lg px-4 py-3 text-center">
                <p className="text-[13px] text-[#92400E] font-medium">
                  I personally review every request and respond within 1 business day.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-[16px] font-bold"
                disabled={mutation.isPending}
                data-testid="button-bridge-submit"
              >
                {mutation.isPending ? "Sending..." : "Check My Salesforce System"}
              </Button>

              <p className="text-[13px] text-[#9CA3AF] text-center">Typical review takes 15–20 minutes.</p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

function TrustBuilderSection() {
  return (
    <section className="py-12 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-widest mb-6">
          Trusted Salesforce &amp; RevOps Experience
        </p>
        <div className="flex justify-center">
          <img
            src={trustedBannerImg}
            alt="Trusted by Accenture, Chevron, Halliburton, Duke Energy"
            className="w-full max-w-[380px] sm:max-w-[480px] opacity-80"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function BridgeFooter() {
  return (
    <footer className="py-8 bg-[#111827]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src={logoImg} alt="Salesforce Mark" className="h-[56px] w-auto" />
        <div className="flex flex-col items-center sm:items-end gap-2">
          <a href="mailto:mark@salesforcemark.com" className="inline-flex items-center gap-2 text-[13px] text-[#9CA3AF] hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5" />
            mark@salesforcemark.com
          </a>
          <p className="text-[12px] text-[#6B7280]">
            &copy; {new Date().getFullYear()} Salesforce Mark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Bridge() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <RealitySection />
      <ProblemsSection />
      <AuthoritySection />
      <FixesSection />
      <TransitionSection />
      <BridgeForm />
      <TrustBuilderSection />
      <BridgeFooter />
    </div>
  );
}
