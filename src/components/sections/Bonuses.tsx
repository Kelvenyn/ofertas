"use client"

import { FlipCard } from "@/components/ui/FlipCard"
import { OFFER } from "@/config/offer"

function renderStrongText(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "§§$1§§").split("§§").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export function Bonuses() {
  const bonuses = OFFER.bonuses
  const section = OFFER.bonusSection

  return (
    <section className="bon-section" aria-labelledby="bonuses-title">
      <div className="bon-inner">
        <div className="bon-headline-pill">
          <span className="bon-headline-dot" />
          {section.pill}
        </div>

        <h2 className="bon-title" id="bonuses-title">
          {section.titleLead} <span className="bon-title-green">{section.titleHighlight}</span>
        </h2>

        <div className="bon-divider" />

        <p className="bon-sub">
          {renderStrongText(section.subtitle)}
        </p>

        <div className="bon-grid">
          {bonuses.map((bonus, index) => (
            <FlipCard key={index} index={index} labels={section} {...bonus} />
          ))}
        </div>
      </div>
    </section>
  )
}
