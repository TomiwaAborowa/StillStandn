import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Still Stand'n — Stories of Faith, Resilience & Hope",
  description:
    "A faith-based community where people share their stories of overcoming life's challenges. You are not alone. Share your story. Find your strength.",
  keywords: ["faith", "resilience", "hope", "stories", "community", "encouragement"],
  icons: {
    icon: "./icon.ico", // or "/icon.png"
  },
  openGraph: {
    title: "Still Stand'n",
    description: "Stories of faith, resilience, and divine grace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
