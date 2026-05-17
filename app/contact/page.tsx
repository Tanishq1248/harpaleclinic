import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Harpale Clinic - Contact Us",
  description: "Contact Harpale Clinic — Opp. PMPML Bus Depot, Sinhagad Road, Pune. Call 9595742424.",
};

export default function Page() {
  return <Contact />;
}