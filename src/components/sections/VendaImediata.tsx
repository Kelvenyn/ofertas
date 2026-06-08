"use client"

import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { OFFER } from "@/config/offer"

export function VendaImediata() {
  const {
    pill, titleLine1, titleLine2, titleLine3,
    image, imageAlt, imageWidth, imageHeight,
    subtitle, ctaText, marqueeText, marqueeGradient, bullets,
  } = OFFER.hero
  const subtitleLines = subtitle.split("\n")

  return (
    <section className="vi-hero">
      <div className="vi-hero-inner">
        <div className="vi-pill">{pill}</div>

        <h1 className="vi-title">
          <span className="vi-title-line1">{titleLine1}</span>
          <span className="vi-title-line2">{titleLine2}</span>
          <span className="vi-title-line3">{titleLine3}</span>
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

        <p className="vi-sub">
          {subtitleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < subtitleLines.length - 1 && <br />}
            </span>
          ))}
        </p>

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
        />
      </div>
    </section>
  )
}
