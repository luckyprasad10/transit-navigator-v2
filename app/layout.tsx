import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transit Navigator — Smart Indian Railways Alternative-Route Discovery & Explorer",
  description:
    "Never get stuck on waiting list. Discover connecting trains, same-train quota hacks, and famous Indian destinations across Indian Railways with Transit Navigator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
