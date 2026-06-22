import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { BreadcrumbListSchema } from "@/components/JsonLd";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background font-sans py-16 md:py-24">
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: "Privacy Policy", url: "https://recallxmarketing.com/privacy" }
        ]}
      />

      <main className="container-main max-w-3xl mx-auto px-5">
        <Link href="/" className="inline-flex items-center text-xs font-bold text-primary hover:underline mb-8">
          <ArrowLeft size={14} className="mr-1.5" /> Back to Home
        </Link>

        {/* Header Block */}
        <div className="border-b border-border pb-8 mb-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
            <Lock size={22} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-5xl font-sans font-bold leading-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Last Updated: June 22, 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-6">
          <p className="font-medium text-foreground">
            RecallX Marketing ("we," "us," or "our") operates the website https://recallxmarketing.com. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include your Email address, First and last name, Phone number, and Business details.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This may include your computer's IP address, browser type, page visits, time spent on pages, and diagnostic data.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Conversion & Analytics Tracking</h2>
          <p>
            We deploy tracking pixels and server-side connection tokens (such as the Meta Conversion API and Google Analytics) to calibrate our performance campaigns. These tracking systems process anonymous conversion data to optimize our ad spend ROAS. You can configure your browser to reject tracking cookies or opt-out of ad personalization networks.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Data Sharing & Security</h2>
          <p>
            We do not sell, trade, or transfer your Personal Data to outside commercial parties. We share data only with trusted service providers who assist us in operating our website and conducting our campaign services, so long as those parties agree to keep this information confidential. We use industry-standard encryption, SSL layers, and security integrations (like Supabase security rules) to protect your transaction flows.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. Your Rights Under GDPR/CCPA</h2>
          <p>
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification if your information is inaccurate.</li>
            <li>The right to object to our processing of your Personal Data.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact our data officer:
          </p>
          <p className="font-semibold text-foreground">
            Email: hello@recallxmarketing.com<br />
            Phone: +91-79827-16224
          </p>
        </div>
      </main>
    </div>
  );
}
