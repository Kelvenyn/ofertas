"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"
import { OFFER } from "@/config/offer"

export function Guarantee() {
  const { marqueeText, icon, iconAlt, title, body } = OFFER.guarantee
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
      <ScrollMarquee text={marqueeText} />

      <div className="gar-inner">
        <div className="gar-icon" ref={iconRef} style={{ transform: `scale(${scale})` }}>
          <Image
            src={icon}
            alt={iconAlt}
            width={140}
            height={140}
          />
        </div>

        <div className="gar-content">
          <h2 className="gar-title">
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
      </div>

      <ScrollMarquee text={marqueeText} reverse />
    </section>
  )
}
