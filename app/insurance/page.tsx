import type { Metadata } from "next";
import InsuranceChecker from "@/components/InsuranceChecker";

export const metadata: Metadata = {
  title: "Harpale Clinic - Insurance",
  description: "Verify your insurance coverage at Harpale Clinic. 22+ supported Indian insurers including Star Health, ICICI Lombard, HDFC ERGO.",
};

export default function Page() {
  return <InsuranceChecker />;
}