import type { Metadata } from "next";
import Doctors from "@/components/Doctors";

export const metadata: Metadata = {
  title: "Harpale Clinic - Our Doctors",
  description: "Meet Dr. Vijaykumar Harpale and Dr. Suhasini Harpale — expert surgeons and maternity specialists at Harpale Clinic, Pune.",
};

export default function Page() {
  return <Doctors />;
}