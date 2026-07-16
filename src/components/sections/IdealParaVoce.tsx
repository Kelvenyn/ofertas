"use client"

import { useRef, useState, useEffect } from "react"
import { useOffer } from "@/context/offer-context"

const CARD_COLORS = ["var(--brand)"]

function IdvCard({ item, index }: { item: { icon: string; title: string; desc: string }; index: number }) {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const color = CARD_COLORS[index % CARD_COLORS.length]
  const isAlt = index % 2 === 1

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.2) {
          setTimeout(() => setVisible(true), index * 120)
          obs.disconnect()
        }
      },
      { threshold: [0, 0.2] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`idv-card ${isAlt ? "idv-card-alt" : ""}${visible ? " idv-card-visible" : ""}`}
      style={{ "--card-accent": color } as React.CSSProperties}
    >
      <div className="idv-card-bar" />
      <div className="idv-card-icon" role="img" aria-label={item.title}>
        <span className="idv-emoji">{item.icon}</span>
      </div>
      <h3 className="idv-card-title">{item.title}</h3>
      <p className="idv-card-desc">{item.desc}</p>
    </div>
  )
}

export function IdealParaVoce() {
  const offer = useOffer()
  const { items } = offer.idealPara
  return (
    <section className="idv-section" aria-labelledby="ideal-title">
      <div className="idv-inner">
        <h2 className="idv-title" id="ideal-title">
          Ideal para você que quer
        </h2>

        <div className="idv-grid">
          {items.map((item, i) => (
            <IdvCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
