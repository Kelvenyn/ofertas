"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"

export function Guarantee() {
  const [scale, setScale] = useState(0.5)
  const iconRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      const el = iconRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)))
        setScale(0.5 + progress * 0.5)
      }
      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  return (
    <section className="gar-section">
      <ScrollMarquee text="GARANTIA 30 DIAS" />

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

      <ScrollMarquee text="GARANTIA 30 DIAS" reverse />
    </section>
  )
}
