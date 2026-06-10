import type { Metadata } from "next";
import { Nunito, Manrope } from "next/font/google";
import Script from "next/script";
import { OFFER } from "@/config/offer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        {/* Meta Pixel — inline no head para disparar antes do JS do React */}
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','967822526249349');
fbq('track','PageView');
`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=967822526249349&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Utmify — antecipado para beforeInteractive */}
        <Script id="utmify-pixel-id" strategy="beforeInteractive">
          {`window.pixelId = "6a271a64526c8a5ae79867ec";`}
        </Script>
        <Script
          id="utmify-pixel"
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="beforeInteractive"
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
