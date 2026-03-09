import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const swansea = localFont({
  src: "../public/assets/fonts/swansea-font-prm/Swansea-q3pd.ttf",
  variable: "--font-primary"
});

const timeburner = localFont({
  src: "../public/assets/fonts/timeburner-font/TimeburnerBold-peGR.ttf",
  variable: "--font-secondary"
});

const alteix = localFont({
  src: "../public/assets/fonts/alteix-sans-sec/AlteixsansRegulardemo-E4j1n.otf",
  variable: "--font-tertiary"
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
      <body className={`${swansea.variable} ${timeburner.variable} ${alteix.variable}`}>{children}</body>
    </html>
  );
}
