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
  titleLine1: string
  titleLine2: string
  titleLine3: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  subtitle: string
  ctaText: string
  timerLabel: string
  marqueeText: string
  marqueeGradient: string
  bullets?: string[]
}

export interface OfferTestimonial {
  src: string
  alt: string
  gradient: string
}

export interface OfferCounter {
  prefix: string
  target: number
  label: string
}

export interface KitImage {
  src: string
  alt: string
  width?: number
  height?: number
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
}

export interface IdealItem {
  icon: string
  title: string
  desc: string
}

export interface BonusItem {
  front: string
  back: string
  title: string
  titleBreak?: string
  desc: string
  price: string
}

export interface BonusSection {
  pill: string
  titleLead: string
  titleHighlight: string
  subtitle: string
  cardLabel: string
  touchHint: string
  backHint: string
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
  badgeText?: string
  extraNote?: string
  oldPrice: string
  price: string
  installments: string
  items: string[]
  mutedItems?: string[]
  ctaText: string
  ctaHref: string
}

export interface AccessStep {
  num: string
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
  hero: OfferHero
  socialProof: {
    title?: string
    testimonials: OfferTestimonial[]
  }
  counter: OfferCounter
  kitCards: {
    heading1: string
    heading2?: string
    images: KitImage[]
  }
  benefits: BenefitSection
  urgency: {
    pill: string
    title: string
    highlight: string
    body: string
    ctaText: string
    trust: string[]
  }
  idealPara: {
    pill: string
    title: string
    subtitle: string
    items: IdealItem[]
  }
  deliverables: {
    pill: string
    title: string
    titleHighlight: string
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
  }
  guarantee: {
    marqueeText: string
    marqueeGradient: string
    icon: string
    iconAlt: string
    title: string
    body: string
  }
  access: {
    title: string
    steps: AccessStep[]
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
    missionText?: string
    privacyLabel?: string
    termsLabel?: string
  }
}
