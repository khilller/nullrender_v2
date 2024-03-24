import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/state/ModalProvider";
import { TriggerProvider } from "@trigger.dev/react";
import { CrispProvider } from "@/components/landing/CrispProvider";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nullrender.com"),
  title: "nullrender",
  description: "The next generation AI architecture renderer",
  openGraph: {
    title: "nullrender",
    description: "The next generation AI architecture renderer",
    url: "https://nullrender.com",
    siteName: "nullrender",
    type: "website",
    images: [
      {
        url: "https://nullrender.com/assets/images/logo.svg",
        width: 721,
        height: 416,
        alt: "nullrender social image",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <TriggerProvider publicApiKey={process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY!}>
          <CrispProvider />
        <body className={`${inter.className} main`}>
          <ModalProvider />
          <main className="">
            {children}
            <Analytics />
          </main>
        </body>
        </TriggerProvider>
      </html>
    </ClerkProvider>
  );
}
