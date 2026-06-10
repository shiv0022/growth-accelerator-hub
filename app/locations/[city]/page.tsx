import React from "react";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, CheckCircle, Users, Target, Shield, Star, Award, Zap, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Card3DTilt from "@/components/Card3DTilt";
import { BreadcrumbListSchema, FAQPageSchema } from "@/components/JsonLd";

const LOCATIONS_DATA: Record<string, {
  name: string;
  region: string;
  tagline: string;
  lat: string;
  lng: string;
  postalCode?: string;
  addressLocality?: string;
}> = {
  india: { name: "India", region: "National", tagline: "Pan-India Digital Execution & Scale", lat: "20.5937", lng: "78.9629" },
  delhi: { name: "Delhi", region: "Delhi NCR", tagline: "Delhi's Elite Performance Marketing Partners", lat: "28.6139", lng: "77.2090", postalCode: "110001", addressLocality: "New Delhi" },
  noida: { name: "Noida", region: "Delhi NCR", tagline: "Noida's Premium Conversion Optimization Leads", lat: "28.5355", lng: "77.3910", postalCode: "201301", addressLocality: "Noida" },
  gurgaon: { name: "Gurgaon", region: "Delhi NCR", tagline: "Gurgaon's Leading ROAS Calibration Experts", lat: "28.4595", lng: "77.0266", postalCode: "122018", addressLocality: "Gurugram" },
  mumbai: { name: "Mumbai", region: "Maharashtra", tagline: "Mumbai's Premier ROI & Ad Optimization Specialists", lat: "19.0760", lng: "72.8777", postalCode: "400001", addressLocality: "Mumbai" },
  bangalore: { name: "Bangalore", region: "Karnataka", tagline: "Bangalore's High-Growth Tech & SEO Agency", lat: "12.9716", lng: "77.5946", postalCode: "560001", addressLocality: "Bengaluru" },
};

export default function LocationPage({ params }: { params: { city: string } }) {
  const cityKey = params.city.toLowerCase();
  const cityData = LOCATIONS_DATA[cityKey];

  if (!cityData) {
    notFound();
  }

  const { name, region, tagline, lat, lng } = cityData;

  // Generate localized FAQs
  const localFaqs = [
    {
      q: `Why should I hire a digital marketing agency in ${name}?`,
      a: `Partnering with a specialized team in ${name} like RecallX ensures you get local market insights, dedicated account managers, and campaigns structured specifically to target high-intent audiences in your operating region.`
    },
    {
      q: `What services does RecallX offer in ${name}?`,
      a: `In ${name}, we offer our complete performance marketing suite: Paid Ads (Google, Meta, Instagram), Search Engine Optimization (SEO), Conversion Rate Optimization (CRO), and custom website & app development.`
    },
    {
      q: `How does RecallX track campaign success for ${name} businesses?`,
      a: `We track actual revenue pipelines, Cost Per Acquisition (CPA), and Return on Ad Spend (ROAS). You get access to a live tracking console mapping conversion values directly.`
    }
  ];

  // Generate localized business schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://recallxmarketing.com/locations/${cityKey}/#local-service`,
    "name": `RecallX Marketing ${name}`,
    "image": "https://recallxmarketing.com/logo-rx.png",
    "url": `https://recallxmarketing.com/locations/${cityKey}`,
    "telephone": "+917982716224",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.addressLocality || name,
      "addressRegion": region,
      "addressCountry": "IN",
      ...(cityData.postalCode ? { "postalCode": cityData.postalCode } : {})
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": lat,
      "longitude": lng
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: `Locations`, url: "https://recallxmarketing.com" },
          { name: name, url: `https://recallxmarketing.com/locations/${cityKey}` }
        ]}
      />

      <FAQPageSchema faqs={localFaqs} />

      <main className="py-16 md:py-24">
        {/* Hero Banner */}
        <div className="container-main max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            <MapPin size={11} /> RecallX {region}
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-4">
            Performance Marketing Agency in <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">{name}</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {tagline}. Custom calibrated PPC campaigns, ROI-driven SEO services, and high-converting web frameworks built to expand your margins.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-full px-6 py-3 text-xs transition-colors shadow-lg shadow-primary/20">
              Request Strategy Call <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </div>
        </div>

        {/* Content Section: Detailed Service Descriptions */}
        <div className="container-main max-w-5xl mx-auto grid md:grid-cols-12 gap-10 items-start mb-20">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
              Why High-Growth Brands in {name} Partner with RecallX
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In a highly competitive business landscape across {name}, generic campaigns result in ad budget leakages. RecallX deploys data-backed funnel architecture. We connect your advertising metrics to actual lead acquisitions and backend closed deals.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you are a D2C fashion ecommerce platform looking to improve your ROAS, a SaaS team requiring high-quality sales opportunities, or a local service business intent on dominating Google search rankings, our customized strategies deliver.
            </p>

            {/* Differentiators list */}
            <div className="space-y-4 pt-4 border-t border-border/40">
              {[
                { title: "Attribution Setup", text: "We configure clean server-side tracking (Meta CAPI, Google GTM Server-Side) to bypass cookie restrictions." },
                { title: "Senior Strategists", text: "Your project is audited and optimized by experts with 5+ years of digital scaling expertise." },
                { title: "No Lock-in Contracts", text: "We work on highly accountable month-to-month contracts, proving our value repeatedly." }
              ].map(item => (
                <div key={item.title} className="flex gap-3 items-start">
                  <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar widget */}
          <div className="md:col-span-5 bg-card/40 border border-border p-6 rounded-2xl space-y-5">
            <h3 className="text-lg font-semibold border-b border-border/40 pb-2">Direct Local SLA</h3>
            
            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <Zap size={14} />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase">Response Guarantee</p>
                  <p className="text-foreground">Within 24 Hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <Star size={14} />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase">Average Scaling Yield</p>
                  <p className="text-foreground">120% conversion expansion</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <Award size={14} />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase">Account Level</p>
                  <p className="text-foreground">Certified Partner Management</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 text-center">
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">Speak directly with a senior performance engineer to analyze your ad accounts.</p>
              <a href="mailto:hello@recallxmarketing.com" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                <Mail size={12} /> hello@recallxmarketing.com
              </a>
            </div>
          </div>
        </div>

        {/* Localized FAQ Section */}
        <div className="container-main max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold leading-tight mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-muted-foreground font-medium">Common questions about our marketing models in {name}</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {localFaqs.map((faq) => (
              <Card3DTilt key={faq.q} className="bg-card/45 p-6 border-border flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-sm font-bold leading-snug text-foreground mb-3">{faq.q}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium font-normal">{faq.a}</p>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>

        {/* Dynamic Location Internal Linking Map */}
        <div className="container-main border-t border-border/40 pt-10 text-center">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-4">Locations We Serve</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
            {Object.keys(LOCATIONS_DATA).map((cityKey) => {
              const city = LOCATIONS_DATA[cityKey];
              return (
                <Link key={cityKey} href={`/locations/${cityKey}`} className="hover:text-primary transition-colors">
                  {city.name}
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
