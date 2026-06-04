"use client"

import { useEffect, useRef, useState } from "react"

export function Guarantee() {
  const [scale, setScale] = useState(0.6)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = iconRef.current
    if (!el) return

    function onScroll() {
      const rect = el!.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = 1 - (rect.top / viewH)
      const clamped = Math.min(Math.max(progress, 0), 1)
      setScale(0.6 + clamped * 0.4)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="gar-section">
      <div className="gar-marquee">
        <div className="gar-marquee-track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>30 DIAS DE GARANTIA ✦ </span>
          ))}
        </div>
      </div>

      <div className="gar-inner">
        <div className="gar-icon" ref={iconRef} style={{ transform: `scale(${scale})` }}>
          <img
            src="/images/INCONDICIONAL-_1_-1-1.webp"
            alt="Garantia de 30 dias"
            width={140}
            height={140}
          />
        </div>

        <div className="gar-content">
          <h2 className="gar-title">Satisfação garantida<br />ou seu dinheiro de volta.</h2>
          <p className="gar-text">
            Teste o <strong>NeuroAtividades Kids</strong> por 30 dias. Se você não gostar por
            algum motivo, devolvemos 100% do valor, sem perguntas.
          </p>
        </div>
      </div>

      <div className="gar-marquee">
        <div className="gar-marquee-track reverse">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>30 DIAS DE GARANTIA ✦ </span>
          ))}
        </div>
      </div>
    </section>
  )
}
