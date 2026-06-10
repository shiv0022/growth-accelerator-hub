import { db } from "@/app/lib/db";
import ServicesPageClient from "./ServicesPageClient";

export default function ServicesPage() {
  const services = db.getServices();

  return <ServicesPageClient initialServices={services} />;
}
