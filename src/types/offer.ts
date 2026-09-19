export interface OfferPalette {
  brand: string
  brandDeep: string
  brandInk: string
  brandDark: string
  brandLight: string
  brandSubtle: string
  cta: string
  ctaDeep: string
  ctaDarkest: string
  accent: string
  yellow: string
  bg: string
  bgAlt: string
}

export interface OfferMeta {
  title: string
  description: string
}

export interface OfferHero {
  pill: string
  headline: string         // ≤ 70 car.; "\n" força quebra de linha (não conta no limite)
  subline: string         // ≤ 70 car.
  image: string           // "plano-completo.webp" (sempre quadrada 1080×1080)
  imageAlt: string
  support: string         // ≤ 160 car. (texto de apoio, depois do CTA)
  bullets: string[]       // exatamente 4, ≤ 34 car. cada
  ctaText: string         // ≤ 17 car.
  marqueeText: string     // ≤ 70 car.
}

export interface OfferTestimonial {
  src: string
  alt: string
}

export interface OfferCounter {
  prefix: string
  target: number
  label: string
}

export interface KitImage {
  src: string
  alt: string
}

export interface BenefitItem {
  icon: string
  title: string
  desc: string
}

export interface BenefitSection {
  title: string
  ctaText: string
  items: BenefitItem[]
  image?: string
  imageAlt?: string
}

export interface BonusItem {
  front: string
  back: string
  title: string
  titleBreak?: string
  desc: string
  price?: string
}

export interface BonusSection {
  titleLead: string
  titleHighlight: string
  subtitle: string
  cardLabel: string
  timerText: string
  freeLabel: string
}

export interface PricingPlan {
  id: string
  label?: string
  title: string
  image: string
  imageAlt: string
  featured: boolean
  extraNote?: string
  oldPrice: string
  price: string
  installments: string
  installmentsPosition?: "abovePrice" | "belowPrice"
  items: string[]
  mutedItems?: string[]
  ctaText: string
  ctaHref?: string
  ctaDisabled?: boolean
}

export interface AccessStep {
  title: string
  desc: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface OfferConfig {
  meta: OfferMeta
  palette: OfferPalette
  paletteCandidates?: OfferPalette[]        // 5 candidatas (Fase 4)
  orientation: "portrait" | "landscape"     // governa kit + bônus (Fase 5)
  sections?: Partial<Record<SectionId, boolean>>  // ligar/desligar (Fase 6)
  hero: OfferHero
  socialProof: {
    title: string
    testimonials: OfferTestimonial[]
  }
  counter: OfferCounter
  kitCards: {
    heading: string
    images: KitImage[]
  }
  benefits: BenefitSection
  urgency: {
    title: string
    highlight: string
    body: string
    ctaText: string
    trust: string[]
    timerMode?: "hoursMinutesSeconds" | "minutesSeconds"
  }
  deliverables: {
    title: string
    image: string
    imageAlt: string
    bullets: string[]
  }
  bonusSection: BonusSection
  bonuses: BonusItem[]
  pricing: {
    titleLead: string
    titleHighlight: string
    plans: PricingPlan[]
    note?: string
    trustText?: string
  }
  guarantee: {
    marqueeText: string
    icon?: string
    iconAlt?: string
    title: string
    body: string
    sealText?: string
  }
  access: {
    title: string
    steps: AccessStep[]
    ctaText?: string
  }
  faq: {
    title: string
    items: FaqItem[]
  }
  footer: {
    updateTitle: string
    updateBody: string
    copyright: string
    privacyUrl: string
    termsUrl: string
    showUpdate?: boolean
  }
}

export type SectionId =
  | "socialProof" | "counter" | "kit" | "kitReversed" | "benefits" | "urgency"
  | "deliverables" | "bonuses" | "pricing" | "guarantee" | "access" | "faq" | "footer"
