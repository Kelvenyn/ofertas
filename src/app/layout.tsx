import type { Metadata } from "next";
import { Nunito, Manrope } from "next/font/google";
import { OFFER } from "@/config/offer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: OFFER.meta.title,
  description: OFFER.meta.description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: OFFER.meta.title,
    description: OFFER.meta.description,
    type: "website",
    locale: "pt_BR",
    siteName: OFFER.meta.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { palette: p } = OFFER;
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${manrope.variable} antialiased`}
      style={{
        "--brand": p.brand,
        "--brand-deep": p.brandDeep,
        "--brand-ink": p.brandInk,
        "--brand-dark": p.brandDark,
        "--brand-light": p.brandLight,
        "--brand-subtle": p.brandSubtle,
        "--cta": p.cta,
        "--cta-deep": p.ctaDeep,
        "--cta-darkest": p.ctaDarkest,
        "--accent": p.accent,
        "--yellow": p.yellow,
        "--bg": p.bg,
        "--bg-alt": p.bgAlt,
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
