import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";


const figtreeSans = localFont({
  src: [
    {
      path: "../public/fonts/Figtree/static/Figtree-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Figtree/static/Figtree-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Figtree/static/Figtree-Bold.ttf",
      weight: "700",
    }
  ],
})


export const metadata: Metadata = {
  title: {
    template: "KBN PLUG | %s",
    default: "KBN PLUG | FREE CV Maker and Job Listings"
  },
  description: 'An all-in-one encompassing career platform to land your dream job.',
  keywords: ["cv", "resume", "jobs", "free", "cover letter"],
  authors: [
    {
      name: "Perfect Nkosi",
      url: "https://github.com/pnkosi"
    }
  ],
  creator: "Perfect Nkosi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtreeSans.className} font-poppins`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
