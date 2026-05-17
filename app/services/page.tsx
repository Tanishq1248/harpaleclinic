import type { Metadata } from "next";
import Service from "@/components/Service";

export const metadata: Metadata = {
  title: "Harpale Clinic - Services",
  description: "Surgery, Maternity, Homoeopathy, Cosmetology, and more — explore medical specialties at Harpale Clinic, Pune.",
};

export default function Page() {
  return <Service />;
}