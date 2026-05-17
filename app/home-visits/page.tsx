import type { Metadata } from "next";
import Homevisit from "@/components/Homevisit";

export const metadata: Metadata = {
  title: "Harpale Clinic - Home Visits",
  description: "Request home visit services from Harpale Clinic, Pune. Blood tests, ECG, X-Ray at your doorstep.",
};

export default function Page() {
  return <Homevisit />;
}