import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HimmatKaar - Empowering Youth Through Skills & Mindset Development",
  description: "HimmatKaar helps underserved students develop professional skills, critical thinking, and the mindset to thrive in today's competitive world. Join our transformative fellowship program.",
  keywords: ["HimmatKaar", "youth empowerment", "skills development", "career preparation", "fellowship program", "professional skills", "leadership training"],
  authors: [{ name: "HimmatKaar" }],
  openGraph: {
    title: "HimmatKaar - Empowering Youth Through Skills & Mindset Development",
    description: "Transform your future with HimmatKaar's career-prep fellowship program",
    type: "website",
    images: ["/himmatkaar-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HimmatKaar - Empowering Youth",
    description: "Transform your future with HimmatKaar's career-prep fellowship program",
    images: ["/himmatkaar-logo.jpg"],
  },
  metadataBase: new URL('https://himmatkaar.org'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className="font-sans antialiased bg-[#0a2012] text-[#ffffff] selection:bg-[#2d7a46]/40 selection:text-[#ffffff] bg-grid-subtle"
      >
        {children}
      </body>
    </html>
  );
}
