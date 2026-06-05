"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { OFFER } from "@/config/offer"

export function Guarantee() {
  const { icon, iconAlt, title, body } = OFFER.guarantee
  const [visible, setVisible] = useState(false)
  const [sealScale, setSealScale] = useState(0.5)
  const sectionRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      const el = sealRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)))
        setSealScale(0.5 + progress * 0.5)
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

  const marqueeGradient = "linear-gradient(135deg, #93C5FD 0%, #0B7FE8 55%, #1D4ED8 100%)"

  return (
    <section className="gar-section" ref={sectionRef} aria-labelledby="guarantee-title">
      <ScrollMarquee
        text="GARANTIA 30 DIAS • SATISFAÇÃO GARANTIDA • DINHEIRO DE VOLTA • "
        gradient={marqueeGradient}
        height={44}
      />

      <div
        className="gar-inner"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 600ms ease-out, transform 600ms ease-out",
        }}
      >
        <div ref={sealRef} className="gar-icon" style={{ transform: `scale(${sealScale})` }}>
          <Image
            src={icon}
            alt={iconAlt}
            width={180}
            height={180}
            style={{ width: "clamp(140px, 30vw, 200px)", height: "auto" }}
          />
        </div>

        <h2 className="gar-title" id="guarantee-title">
          {title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>

        <p className="gar-text">
          {body.replace(/\*\*(.+?)\*\*/g, '§§$1§§').split('§§').map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      </div>

      <ScrollMarquee
        text="GARANTIA 30 DIAS • SATISFAÇÃO GARANTIDA • DINHEIRO DE VOLTA • "
        gradient={marqueeGradient}
        height={44}
        reverse
      />
    </section>
  )
}
