import { Inter, Bricolage_Grotesque } from "next/font/google";
import type { Metadata } from "next";
import MeshBackground from "@/components/fx/MeshBackground";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { SiteModals } from "@/components/modals/SiteModals";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body>
        <ModalProvider>
          <MeshBackground />
          <div className="grain" aria-hidden="true" />
          <div className="veil" aria-hidden="true" />
          {children}
          <SiteModals />
        </ModalProvider>
      </body>
    </html>
  );
}
