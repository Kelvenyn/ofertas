"use client"

import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { useOffer } from "@/context/offer-context"

export function VendaImediata() {
  const offer = useOffer()
  const {
    pill, headline, subline,
    image, imageAlt,
    support, ctaText, marqueeText, bullets,
  } = offer.hero
  const [headlineLine1, headlineLine2] = headline.split("\n")

  return (
    <section className="vi-hero">
      <div className="vi-hero-inner">
        <div className="vi-pill">{pill}</div>

        <h1 className="vi-title">
          {headlineLine1 && <span className="vi-title-line1">{headlineLine1}</span>}
          {headlineLine2 && <span className="vi-title-line2">{headlineLine2}</span>}
          {subline && <span className="vi-title-line3">{subline}</span>}
        </h1>

        <div className="vi-image">
          <Image
            src={image}
            alt={imageAlt}
            width={1080}
            height={1080}
            priority
          />
        </div>

        {support && <p className="vi-sub">{support}</p>}

        {bullets && bullets.length > 0 && (
          <AnimatedBullets items={bullets} className="vi-bullets ab-center" />
        )}

        <ShinyButton href="#oferta" className="vi-cta-btn max-w-full whitespace-normal">
          {ctaText}
        </ShinyButton>

        <ScrollMarquee
          text={marqueeText}
          gradient="var(--marquee-gradient)"
          className="vi-marquee"
          fadeColor="transparent"
        />
      </div>
    </section>
  )
}
