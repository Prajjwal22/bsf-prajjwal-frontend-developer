import { FiltersProvider } from "@/context/filters";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { CapsuleProvider } from "@/context/capsules";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceX API Data",
  description: "Build React app to share SpaceX data with the world.",
  robots:"index, follow",
  alternates:{
    canonical: "/"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CapsuleProvider>
      <FiltersProvider>
        <html lang="en">
          <body className={dmSans.className}>{children}</body>
        </html>
      </FiltersProvider>
    </CapsuleProvider>
  );
}
