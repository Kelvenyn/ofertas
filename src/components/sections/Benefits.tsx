"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { useOffer } from "@/context/offer-context"

const CARD_COLORS = ["var(--brand)"]

function BenefitCard({ icon, title, desc, index, expanded }: { icon: string; title: string; desc: string; index: number; expanded: boolean }) {
  const color = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <div
      className={`benefit-card${expanded ? " benefit-card-expanded" : ""}`}
      style={{ "--card-accent": color } as React.CSSProperties}
    >
      <div className="benefit-card-border" />
      <div className="benefit-card-inner">
        <div className="benefit-card-icon-cell">
          <span className="benefit-card-emoji">{icon}</span>
        </div>
        <div className="benefit-card-body">
          <h3 className="benefit-card-title">{title}</h3>
          <p className="benefit-card-desc">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export function Benefits() {
  const offer = useOffer()
  const { title, ctaText, items, image, imageAlt } = offer.benefits
  const gridRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setExpanded(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-inner">
        <h2 className="benefits-title" id="benefits-title">
          {title}
        </h2>

        {image && (
          <div className="benefits-image">
            <Image src={image} alt={imageAlt ?? "Imagem do material"} width={1080} height={1080} sizes="(max-width: 700px) 100vw, 520px" />
          </div>
        )}

        <div ref={gridRef} className="benefits-grid">
          {items.map((b, i) => (
            <BenefitCard key={i} icon={b.icon} title={b.title} desc={b.desc} index={i} expanded={expanded} />
          ))}
        </div>

        <div className="benefits-cta-wrap">
          <ShinyButton href="#oferta">
            {ctaText}
          </ShinyButton>
        </div>
      </div>
    </section>
  )
}
