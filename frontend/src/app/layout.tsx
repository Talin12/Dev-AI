import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShellClient } from "../components/layout/ShellClient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VedaAI",
  description: "AI-powered assessment creator for teachers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} overflow-x-hidden`}>
        <ShellClient>{children}</ShellClient>
      </body>
    </html>
  );
}