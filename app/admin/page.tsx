import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Harpale Clinic - Admin Console",
  description: "Internal admin panel for Harpale Clinic staff. Manage appointments, home visits, and daily operations.",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <AdminPanel />;
}
