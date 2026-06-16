import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sean Lawton Tandjaja | Full-Stack Developer & Visual Creator",
  description:
    "Portfolio of Sean Lawton Tandjaja — Full-Stack Developer and Freelance Visual Creator specializing in SwiftUI, Kotlin, Python, and web development, with a professional background in photography and videography.",
  keywords: [
    "Sean Tandjaja",
    "Full Stack Developer",
    "SwiftUI",
    "iOS Developer",
    "Visual Creator",
    "Portfolio",
    "Universitas Ciputra",
  ],
  authors: [{ name: "Sean Lawton Tandjaja" }],
  openGraph: {
    title: "Sean Lawton Tandjaja | Full-Stack Developer & Visual Creator",
    description:
      "Portfolio of Sean Lawton Tandjaja — Full-Stack Developer and Freelance Visual Creator",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
