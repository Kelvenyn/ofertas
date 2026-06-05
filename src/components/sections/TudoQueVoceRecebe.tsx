"use client"

import Image from "next/image"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { OFFER } from "@/config/offer"

export function TudoQueVoceRecebe() {
  const { title, titleHighlight, image, imageAlt, bullets } = OFFER.deliverables
  return (
    <section className="tqvr-section">
      <div className="tqvr-card">
        <h2 className="tqvr-title">
          {title}
          <span>no <strong>{titleHighlight}</strong></span>
        </h2>

        <div className="tqvr-image">
          <Image
            src={image}
            alt={imageAlt}
            width={340}
            height={425}
          />
        </div>

        <AnimatedBullets items={bullets} className="tqvr-bullets ab-center" />
      </div>
    </section>
  )
}
