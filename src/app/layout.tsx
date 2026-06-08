import type { Metadata } from "next";
import { Nunito, Manrope } from "next/font/google";
import Script from "next/script";
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
        <Script id="utmify-pixel-id" strategy="afterInteractive">
          {`window.pixelId = "6a271a64526c8a5ae79867ec";`}
        </Script>
        <Script
          id="utmify-pixel"
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="afterInteractive"
        />
        <Script
          id="utmify-utms"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
