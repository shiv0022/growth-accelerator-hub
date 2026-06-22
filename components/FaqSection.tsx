"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FAQPageSchema } from "@/components/JsonLd";

const faqData = [
  {
    q: "How does RecallX help scale marketing campaigns?",
    a: "We rebuild your search and paid social campaigns from the ground up, implementing advanced tracking (like Meta CAPI) and hyper-targeted Google Search structures. This eliminates ad spend wastage on irrelevant clicks and maximizes your actual pipeline ROAS.",
  },
  {
    q: "What is conversion funnel optimization (CRO)?",
    a: "CRO is the process of optimizing your website's user experience, load speeds, layout, and CTA placement to convert a higher percentage of incoming visitors into paying customers. Even small updates to trust factors and load speed can scale conversions from 1% to 4%+.",
  },
  {
    q: "Can you build custom platforms using our own databases?",
    a: "Yes! We specialize in developing fast, modern, and headless Next.js web platforms integrated with Supabase. This gives you a secure, real-time database and CMS system with lightning-fast load times and custom APIs.",
  },
  {
    q: "How does the month-to-month engagement work?",
    a: "We operate on flexible, results-driven month-to-month agreements rather than forcing long-term 12-month lock-in contracts. We earn your business every month through consistent strategy updates and performance reporting, requiring only a 30-day notice to exit.",
  },
  {
    q: "What kind of attribution and reporting do you provide?",
    a: "We set up custom multi-touch attribution models to track the exact journey from ad click to closed customer. You get access to live, transparent performance dashboards, and we conduct weekly video reports to walk you through ad spend yield and strategy updates.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-background border-t border-gray-100 font-sans">
      {/* FAQ Schema */}
      <FAQPageSchema faqs={faqData} />

      <div className="container-main max-w-3xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-foreground leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto font-normal">
            Got questions about our performance frameworks, custom Supabase builds, or scaling models? We have answers.
          </p>
        </div>

        {/* Accordion list */}
        <div className="bg-card/45 backdrop-blur-sm border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-border/60 last:border-b-0 py-1">
                <AccordionTrigger className="text-[14px] sm:text-base font-semibold text-foreground hover:no-underline hover:text-primary text-left transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal pt-1 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
