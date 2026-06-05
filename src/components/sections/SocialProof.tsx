"use client"

import { useRef, useEffect, useState } from "react"

const testimonials = [
  { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 1" },
  { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 2" },
  { src: "/images/CR-NINJA-17.webp", alt: "Depoimento 3" },
  { src: "/images/CR-NINJA-18.webp", alt: "Depoimento 4" },
  { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 5" },
  { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 6" },
]

export function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let pos = 0
    let raf: number
    let lastTime = 0
    const speed = 40
    const cardWidth = 260

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const dt = (time - lastTime) / 1000
      lastTime = time

      if (!pausedRef.current) {
        pos -= speed * dt
        const totalWidth = cardWidth * testimonials.length
        if (pos <= -totalWidth) pos += totalWidth
        track.style.transform = `translateX(${pos}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    const onMouseEnter = () => { pausedRef.current = true }
    const onMouseLeave = () => { pausedRef.current = false }

    container.addEventListener("mouseenter", onMouseEnter)
    container.addEventListener("mouseleave", onMouseLeave)

    raf = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener("mouseenter", onMouseEnter)
      container.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  const duplicated = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="sp-section">
      <div className="sp-inner">
        <h2 className="sp-title">O que estão dizendo</h2>
      </div>

      <div className="sp-marquee-container" ref={containerRef}>
        <div className="sp-marquee-track" ref={trackRef}>
          {duplicated.map((t, i) => (
            <div className="sp-marquee-card" key={i}>
              <img
                src={t.src}
                alt={t.alt}
                className="sp-marquee-card-img"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sp-dots">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`sp-dot${i === activeIdx ? " active" : ""}`}
          />
        ))}
      </div>
    </section>
  )
}
