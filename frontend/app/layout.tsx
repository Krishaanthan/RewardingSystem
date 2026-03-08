import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-secondary"
});

export const metadata: Metadata = {
  title: "Student Rewarding System",
  description: "Gamified college rewarding platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
