import type { Metadata } from "next";
import BookAppointment from "@/components/bookappoinment";

export const metadata: Metadata = {
  title: "Harpale Clinic - Book Appointment",
  description: "Schedule an appointment with Harpale Clinic, Sinhagad Road, Pune. Call 9595742424.",
};

export default function Page() {
  return <BookAppointment />;
}