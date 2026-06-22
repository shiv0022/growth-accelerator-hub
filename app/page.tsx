import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FaqSection from "@/components/FaqSection";
import { db } from "@/app/lib/db";
import { OrganizationSchema, WebSiteSchema, ProfessionalServiceSchema } from "@/components/JsonLd";

export default function IndexPage() {
  const services = db.getServices();
  const heroConfig = db.getHeroConfig();

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Structured Data for Search Engine Optimization */}
      <OrganizationSchema />
      <WebSiteSchema />
      <ProfessionalServiceSchema />

      <main>
        <HeroSection initialConfig={heroConfig} />
        <ServicesSection initialServices={services} />
        <WhyChooseSection />
        <ProcessSection />
        <CaseStudiesSection />
        <FaqSection />
      </main>
    </div>
  );
}

