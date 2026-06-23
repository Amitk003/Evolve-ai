import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ScrollPrompt from "@/components/ScrollPrompt";

export const metadata: Metadata = {
  title: "Evolve.ai — Future-Proof Your Career",
  description:
    "Don't predict the end of your career. Finance its evolution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-studio-black text-warm-cream font-sans">
        <NavBar />
        <main className="flex-1 pt-20">{children}</main>
        <ScrollPrompt />
      </body>
    </html>
  );
}
