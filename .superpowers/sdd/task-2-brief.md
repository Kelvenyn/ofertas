# Task 2: Psicopedagogia Layout

**Files:**
- Create: `src/app/psicopedagogia/layout.tsx`

**Goal:** Create the layout for `/psicopedagogia` that injects CSS custom properties from the offer config, sets up Meta/OG tags, and wraps content in OfferProvider.

**Context:** This mirrors `src/app/lembrancinhas/layout.tsx`. The OFFER config is imported from `@/config/offers/psicopedagogia/offer`.

**Steps:**
1. Create directory `src/app/psicopedagogia/` if it doesn't exist
2. Create `layout.tsx` with the complete code below
3. Run `npx tsc --noEmit src/app/psicopedagogia/layout.tsx` to verify

## Complete Code

```tsx
import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/psicopedagogia/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = {
  title: "Mapa de Perfil Infantil",
  description: OFFER.meta.description,
  icons: {
    icon: "/images/psicopedagogia/favicon.png",
  },
  openGraph: {
    title: OFFER.meta.title,
    description: OFFER.meta.description,
    type: "website",
    locale: "pt_BR",
    siteName: OFFER.meta.title,
  },
}

export default function PsicopedagogiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { palette: p } = OFFER
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1653520942410205');
fbq('track','PageView');
`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1653520942410205&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <Script id="utmify-pixel-id" strategy="afterInteractive">
        {`window.pixelId = "6a39b5a3d2e009d7c7ae0f21";`}
      </Script>
      <Script
        id="utmify-pixel"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
      <Script
        id="utmify-utms"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        strategy="afterInteractive"
      />

      <div
        id="offer-root"
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
        <OfferProvider offer={OFFER}>{children}</OfferProvider>
      </div>
    </>
  )
}
```
