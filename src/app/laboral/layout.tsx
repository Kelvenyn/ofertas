import type { Metadata } from "next"
import { OFFER } from "@/config/offers/laboral/offer"
import { OfferProvider } from "@/context/offer-context"
import { PaletteSwitcher } from "@/components/dev/PaletteSwitcher"

export const metadata: Metadata = {
  title: OFFER.meta.title,
  description: OFFER.meta.description,
}

export default function LaboralLayout({ children }: { children: React.ReactNode }) {
  const { palette: p } = OFFER
  return (
    <div id="offer-root" style={{
      "--brand": p.brand, "--brand-deep": p.brandDeep, "--brand-ink": p.brandInk,
      "--brand-dark": p.brandDark, "--brand-light": p.brandLight, "--brand-subtle": p.brandSubtle,
      "--cta": p.cta, "--cta-deep": p.ctaDeep, "--cta-darkest": p.ctaDarkest,
      "--accent": p.accent, "--yellow": p.yellow, "--bg": p.bg, "--bg-alt": p.bgAlt,
    } as React.CSSProperties}>
      <OfferProvider offer={OFFER}>{children}</OfferProvider>
      <PaletteSwitcher />
    </div>
  )
}
