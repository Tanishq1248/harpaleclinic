// ── Centralized clinic data ──────────────────────────────────────────
// Single source of truth for all real clinic information.
// Every component should import from here instead of hardcoding values.

export const CLINIC = {
  name: "Harpale Clinic",
  tagline: "Compassionate Care, Modern Medicine",
  phone: "9595742424",
  phoneFormatted: "+91 95957 42424",
  email: "harpaleclinic@gmail.com",
  address: {
    line1: "Opp. PMPML Bus Depot,",
    line2: "Sinhagad Road, Pune - 411030",
    full: "Opp. PMPML Bus Depot, Sinhagad Road, Pune - 411030",
  },
  hours: {
    weekdays: "Mon - Sat: 8:00 AM - 9:00 PM",
    weekends: "Sunday: 9:00 AM - 1:00 PM",
    short: "Mon-Sat 8AM-9PM | Sun 9AM-1PM",
  },
  since: "2000",
  beds: 15,
  insurers: 22,
  whatsappLink: "https://wa.me/919595742424",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6848.5870067364895!2d73.94389089357907!3d18.485131400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e9e69c4c3c55%3A0xc60bccba6d03190e!2sHarrpalay%20Clinick%20%26%20General%20Hospital!5e1!3m2!1sen!2sin!4v1779018390560!5m2!1sen!2sin",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Insurance", href: "/insurance" },
  { label: "Home Visits", href: "/home-visits" },
  { label: "Contact", href: "/contact" },
] as const;

export const DOCTORS = [
  {
    name: "Dr. Vijaykumar Harpale",
    title: "Chief Surgeon",
    credential: "MS (General Surgery), FAIS",
    badgeIcon: "verified",
    specialties: ["Minimally Invasive Surgery", "Trauma Care", "Gastrointestinal Surgery"],
    description:
      "With over 20 years of experience in complex surgical procedures, Dr. Vijaykumar Harpale leads the surgical department with unparalleled precision and a steadfast commitment to patient safety and recovery.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvurVZxcFij4BVneLqQ9m4EJ7JJ0aeWR3xK12UdArHwQLz-u4clyDsgGsSNAFfOafYrUmzap7XeEge97sWOoYiyVfgRCvqdtpdcRuCGVU2D--PR-QYTIw0lKcUE2wAK5HgNYkAIdoL3AEgYGz34ZRwLYmrLlaCV2rz59k1evI32KIuB6Ay1eC2UwF76lXuCGXUyt3uSpZ_jWJjXmAJjDx0fiEF1ciTdeFR6lCB_12xnXWW7fHlMMcd-IbyrAPp0QYhXnjYq2-x6UI9",
    alt: "Professional portrait of Dr. Vijaykumar Harpale",
  },
  {
    name: "Dr. Suhasini Harpale",
    title: "Maternity Specialist",
    credential: "MD (Obstetrics & Gynaecology)",
    badgeIcon: "child_care",
    specialties: ["High-Risk Pregnancies", "Prenatal Care", "Women's Wellness"],
    description:
      "Dedicated to women's health and comprehensive maternity care, Dr. Suhasini Harpale provides empathetic support from prenatal planning through to postnatal recovery, ensuring a safe journey for mother and baby.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZtyMaHKS1hsHS6hQTN57J29y84vcAD1m0qYMO1TPmQB9N20NsOFyxO4w5bD0x5Rh3-_GmjCiHrbYoEcLmGGuHDhapMFpQpxLrheK7XT1ZGnVgFvIsK5sQVY-kSLoREslksqcp-nXSk1ambkKdWZCO3jdFSoQrnYg-FR1_QCOg9s--n1KY1CfOLNWNwzjX4nnBxgGPwHnvA4slGkKO_m-zhPElXKXDRZ-r5Vq8lhln6wfatqqCz_6UpRiQTt8EtNOr5Y8TmbcANb1U",
    alt: "Professional portrait of Dr. Suhasini Harpale",
  },
] as const;

export const SERVICES = [
  {
    title: "Maternity & Delivery",
    icon: "pregnant_woman",
    image: "/maternity.jpg",
    description: "Normal delivery, cesarean delivery, and painless normal delivery facility.",
  },
  {
    title: "Family Planning & Infertility",
    icon: "family_restroom",
    image: "/family_planning.jpg",
    description: "Family planning surgery and infertility surgery.",
  },
  {
    title: "Breast Care",
    icon: "health_and_safety",
    image: "/breast_care.jpg",
    description: "Diagnosis and treatment of a lump or pus in the breast.",
  },
  {
    title: "Gastroscopy & Burns",
    icon: "stomach",
    image: "/gastroscopy.jpg",
    description: "Gastroscopy - examination of the stomach and esophagus through a telescope. Treatment of burns.",
  },
  {
    title: "Laparoscopy",
    icon: "medical_services",
    image: "/laparoscopy.jpg",
    description: "Laparoscopy - various abdominal surgeries performed through a telescope.",
  },
  {
    title: "Colonoscopy",
    icon: "airline_seat_flat",
    image: "/colonoscopy.jpg",
    description: "Colonoscopy - examination of the colon through a telescope.",
  },
  {
    title: "Cancer Care",
    icon: "oncology",
    image: "/cancer_care.jpg",
    description: "Cancer Diagnosis and Treatment, Cancer Chemotherapy.",
  },
  {
    title: "Gastroenterology",
    icon: "stomach",
    image: "/gastroenterology.jpg",
    description: "Treatment for stomach and intestinal disorders.",
  },
  {
    title: "Kidney Care",
    icon: "nephrology",
    image: "/kidney_care.jpg",
    description: "Kidney and kidney stone diseases, including treatment of kidney stones through a telescope.",
  },
  {
    title: "Pediatric Surgery",
    icon: "child_care",
    image: "/pediatric_surgery.jpg",
    description: "Specialized pediatric surgery.",
  },
  {
    title: "General Surgery",
    icon: "healing",
    image: "/general_surgery.jpg",
    description: "Treatment for hernia, hemorrhoids, fistula, appendix, hydrocele, and goiter.",
  },
  {
    title: "Men's Health",
    icon: "man",
    image: "/mens_health.jpg",
    description: "Male infertility and sexual problems, prostate diseases, treatment and surgery including laparoscopic surgery of the prostate gland.",
  },
  {
    title: "Proctology & Laser",
    icon: "science",
    image: "/laser_surgery.jpg",
    description: "Modern treatment for hemorrhoids and Laser Surgery - Hemorrhoids and Varicose Veins.",
  },
  {
    title: "Gallbladder Care",
    icon: "water_drop",
    image: "/gallbladder.jpg",
    description: "Destructive surgical treatment of gallstones with lithotripsy.",
  },
  {
    title: "Uterine Surgery",
    icon: "woman",
    image: "/uterine_surgery.jpg",
    description: "Specialized uterine surgery procedures.",
  },
  {
    title: "Diagnostics",
    icon: "biotech",
    image: "/diagnostics.jpg",
    description: "Complete Laboratory, ECG, and X-ray services.",
  },
  {
    title: "Insurance",
    icon: "verified_user",
    image: "/insurance.jpg",
    description: "Cashless mediclaim insurance facility is available.",
  }
] as const;

export const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Accessibility",
  "Patient Portal",
] as const;
