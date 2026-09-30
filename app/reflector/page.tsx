import type { Metadata } from "next";
import Reflector from "@/components/Reflector";
import "./reflector.css";

export const metadata: Metadata = {
  title: "Reflector — Tell Us About Yourself",
  description: "Tell us about yourself. Ten short steps, then your Reflection lands in your inbox.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Reflector — Tell Us About Yourself",
    description: "Tell us about yourself. Ten short steps, then your Reflection lands in your inbox.",
    type: "website",
    url: "https://eternaltilidie.com/reflector",
    images: [{ url: "https://eternaltilidie.com/og-reflector.jpg", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reflector — Tell Us About Yourself",
    description: "Tell us about yourself. Ten short steps, then your Reflection lands in your inbox.",
    images: ["https://eternaltilidie.com/og-reflector.jpg"],
  },
};

export default function ReflectorPage() {
  return <Reflector />;
}
