"use client"

import Image from "next/image"
import { AnimatedBullets } from "@/components/ui/AnimatedBullets"
import { useOffer } from "@/context/offer-context"

export function TudoQueVoceRecebe() {
  const offer = useOffer()
  const { title, image, imageAlt, bullets } = offer.deliverables
  return (
    <section className="tqvr-section" aria-labelledby="deliverables-title">
      <div className="tqvr-card">
        <h2 className="tqvr-title" id="deliverables-title">
          {title}
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
