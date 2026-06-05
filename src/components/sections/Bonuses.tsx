"use client"

import { FlipCard } from "@/components/ui/FlipCard"
import { OFFER } from "@/config/offer"

export function Bonuses() {
  const bonuses = OFFER.bonuses
  return (
    <section className="bon-section" aria-labelledby="bonuses-title">
      <div className="bon-inner">
        <div className="bon-headline-pill">
          <span className="bon-headline-dot" />
          EXTRA INCLUÍDO
        </div>

        <h2 className="bon-title" id="bonuses-title">
          6 BÔNUS <span className="bon-title-green">EXCLUSIVOS</span>
        </h2>

        <div className="bon-divider" />

        <p className="bon-sub">
          Ao adquirir hoje, você também recebe <strong>6 materiais complementares</strong> para deixar seus atendimentos psicopedagógicos mais organizados, práticos e completos.
        </p>

        <div className="bon-grid">
          {bonuses.map((b, i) => (
            <FlipCard key={i} index={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  )
}
