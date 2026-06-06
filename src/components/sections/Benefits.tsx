"use client"

import { useRef, useState, useEffect } from "react"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

const CARD_COLORS = ["#0891B2", "#10B981", "#F59E0B", "#0E7490"]

function BenefitCard({ icon, title, desc, index }: { icon: string; title: string; desc: string; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const color = CARD_COLORS[index % CARD_COLORS.length]

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) {
          const delay = index * 150
          setTimeout(() => setExpanded(true), delay)
          obs.disconnect()
        }
      },
      { threshold: [0, 0.25] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`benefit-card${expanded ? " benefit-card-expanded" : ""}`}
      style={{ "--card-accent": color } as React.CSSProperties}
    >
      <div className="benefit-card-border" />
      <div className="benefit-card-inner">
        <div className="benefit-card-icon-cell">
          <span className="benefit-card-emoji">{icon}</span>
        </div>
        <span className="benefit-card-trail" />
        <div className="benefit-card-body">
          <h3 className="benefit-card-title">{title}</h3>
          <p className="benefit-card-desc">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-inner">
        <h2 className="benefits-title" id="benefits-title">Benefícios do material</h2>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <BenefitCard key={i} icon={b.icon} title={b.title} desc={b.desc} index={i} />
          ))}
        </div>

        <div className="benefits-cta-wrap">
          <ShinyButton href="#oferta">
            QUERO ACESSAR O KIT AGORA
          </ShinyButton>
        </div>
      </div>
    </section>
  )
}