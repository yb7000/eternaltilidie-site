import type { Metadata } from "next";
import Portal from "@/components/Portal";
import "./portal.css";

export const metadata: Metadata = {
  title: "Eternal — Portal",
  description: "Sign up or sign in to Eternal and walk through The Reflection Wizard, our artist intake.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Eternal — Portal",
    description: "Sign up or sign in to Eternal and walk through The Reflection Wizard, our artist intake.",
    type: "website",
    url: "https://eternaltilidie.com/portal",
    images: [{ url: "https://eternaltilidie.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternal — Portal",
    description: "Sign up or sign in to Eternal and walk through The Reflection Wizard, our artist intake.",
    images: ["https://eternaltilidie.com/og.png"],
  },
};

export default function PortalPage() {
  return <Portal />;
}
