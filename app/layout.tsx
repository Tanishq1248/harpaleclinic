import type { Metadata } from "next";
import "./globals.css";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const dmSerifDisplay = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Harpale Clinic — Advanced Medical Care",
  description:
    "Harpale Clinic, Sinhagad Road, Pune — Compassionate, state-of-the-art medical care since 2000. Surgery, Maternity, Homoeopathy & more. Call 9595742424.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased overflow-x-hidden", manrope.variable, dmSerifDisplay.variable)}>
      <body className="min-h-full flex flex-col overflow-x-hidden font-sans bg-gradient-to-br from-white to-[#d4ede6] bg-fixed">
        {/* Skip to content — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
