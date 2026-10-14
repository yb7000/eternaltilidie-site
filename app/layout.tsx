import type { Metadata, Viewport } from "next";
import { Anton } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eternaltilidie.com"),
  title: "ETERNAL",
  description:
    "Eternal is an international artist development platform based in Los Angeles (USA) – specialized in audio and video production, publishing and distribution.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "ETERNAL",
    description:
      "An artist development platform. A home for developing the next generation of audiovisual storytelling.",
    type: "website",
    url: "https://eternaltilidie.com",
    images: [{ url: "https://eternaltilidie.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ETERNAL",
    description:
      "An artist development platform. A home for developing the next generation of audiovisual storytelling.",
    images: ["https://eternaltilidie.com/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={anton.variable}>
      <body>{children}</body>
    </html>
  );
}
