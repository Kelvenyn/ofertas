"use client"

import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { useOffer } from "@/context/offer-context"

export function VendaImediata() {
  const offer = useOffer()
  const {
    pill, titleLine1, titleLine2, titleLine3,
    image, imageAlt, imageWidth, imageHeight,
    subtitle, ctaText, marqueeText, marqueeGradient, bullets,
  } = offer.hero

  return (
    <section className="vi-hero">
      <div className="vi-hero-inner">
        <div className="vi-pill">{pill}</div>

        <h1 className="vi-title">
          {titleLine1 && <span className="vi-title-line1">{titleLine1}</span>}
          <span className="vi-title-line2">{titleLine2}</span>
          {titleLine3 && <span className="vi-title-line3">{titleLine3}</span>}
        </h1>

        <div className="vi-image">
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
          />
        </div>

        <p className="vi-sub">{subtitle}</p>

        {bullets && bullets.length > 0 && (
          <AnimatedBullets items={bullets} className="vi-bullets ab-center" />
        )}

        <ShinyButton href="#oferta" className="vi-cta-btn">
          {ctaText}
        </ShinyButton>

        <ScrollMarquee
          text={marqueeText}
          gradient={marqueeGradient}
          className="vi-marquee"
          fadeColor="transparent"
        />
      </div>
    </section>
  )
}
