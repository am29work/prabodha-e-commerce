import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prabodha | Luxury Era",
  description: "Explore the fashion of generations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* 2. Added bg-black to the body so there is no white flash during navigation */}
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar /> {/* 3. Place Navbar here so it floats over all pages */}
        {children}
      </body>
    </html>
  );
}