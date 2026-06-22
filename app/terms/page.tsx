import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { BreadcrumbListSchema } from "@/components/JsonLd";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-sans py-16 md:py-24">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: "Terms of Service", url: "https://recallxmarketing.com/terms" }
        ]}
      />

      <main className="container-main max-w-3xl mx-auto px-5">
        <Link href="/" className="inline-flex items-center text-xs font-bold text-primary hover:underline mb-8">
          <ArrowLeft size={14} className="mr-1.5" /> Back to Home
        </Link>

        {/* Header Block */}
        <div className="border-b border-border pb-8 mb-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
            <FileText size={22} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-5xl font-sans font-bold leading-tight text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Last Updated: June 22, 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-6">
          <p className="font-medium text-foreground">
            Welcome to RecallX Marketing. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before engaging with our platform.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing this website, you warrant that you are at least 18 years old and possess the legal authority to enter into these Terms of Service. If you do not agree with any part of these terms, you must discontinue your use of our website immediately.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, RecallX Marketing and/or its licensors own the intellectual property rights for all material, code, layout designs, and graphics on this website. All intellectual property rights are reserved. You may access this material for your own personal use, but you must not republish, sell, rent, or duplicate any material from this site without our written consent.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Client Engagements & Ads Budgets</h2>
          <p>
            For performance marketing campaigns (Google Ads, Meta Ads, etc.), the client is responsible for maintaining active payment profiles directly with the ad networks. RecallX manages campaign execution, targeting setup, and asset uploads, but is not liable for ad account suspensions, policy violations, or ad spend overruns due to network glitches.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall RecallX Marketing, nor any of its senior directors, employees, or tech partners, be held liable for anything arising out of or in any way connected with your use of this website or marketing services. RecallX shall not be held liable for indirect, consequential, or special liability arising out of campaign performance fluctuations or conversion rate variances.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">5. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Delhi, India, without regard to its conflict of law provisions. Any legal actions or proceedings arising out of these terms shall be subject to the exclusive jurisdiction of the courts located in Delhi, India.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will post any updates directly on this page. By continuing to access our site after changes become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      </main>
    </div>
  );
}
