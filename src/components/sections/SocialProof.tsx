"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 1", color: "linear-gradient(90deg, #0B7FE8, #1D4ED8)" },
  { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 2", color: "linear-gradient(90deg, #22C978, #1AAF64)" },
  { src: "/images/CR-NINJA-17.webp", alt: "Depoimento 3", color: "linear-gradient(90deg, #49A6FF, #0B7FE8)" },
  { src: "/images/CR-NINJA-18.webp", alt: "Depoimento 4", color: "linear-gradient(90deg, #082F63, #1D4ED8)" },
  { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 5", color: "linear-gradient(90deg, #22C978, #4ADE80)" },
  { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 6", color: "linear-gradient(90deg, #0B7FE8, #49A6FF)" },
]

const CONFIGS = [
  { scale: 1, rotateY: 0, tX: 0, tZ: 0, opacity: 1 },
  { scale: 0.7, rotateY: 48, tX: 90, tZ: -250, opacity: 0.45 },
  { scale: 0.5, rotateY: 62, tX: 140, tZ: -420, opacity: 0.1 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getInterpolatedStyle(offset: number): React.CSSProperties {
  const absOffset = Math.abs(offset)
  if (absOffset > 2.5) return { visibility: "hidden", position: "absolute" }

  const sign = offset >= 0 ? 1 : -1
  const idx = Math.min(Math.floor(absOffset), 1)
  const frac = absOffset - idx
  const from = CONFIGS[idx]
  const to = CONFIGS[Math.min(idx + 1, 2)]

  const scale = lerp(from.scale, to.scale, frac)
  const rotateY = lerp(from.rotateY, to.rotateY, frac) * -sign
  const tX = lerp(from.tX, to.tX, frac) * sign
  const tZ = lerp(from.tZ, to.tZ, frac)
  const opacity = lerp(from.opacity, to.opacity, frac)
  const z = Math.round(lerp(10, 1, absOffset / 2))

  return {
    position: "absolute",
    transform: `translateX(${tX}%) translateZ(${tZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: z,
    willChange: absOffset < 1.5 ? "transform, opacity" : "auto",
  }
}

export function SocialProof() {
  const [activeSlide, setActiveSlide] = useState(0)
  const posRef = useRef(0)
  const velocityRef = useRef(0)
  const targetRef = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef(0)
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null)

  const stiffness = 300
  const damping = 26

  const animate = useCallback((time: number) => {
    const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0.016
    lastTimeRef.current = time

    const displacement = posRef.current - targetRef.current
    const springForce = -stiffness * displacement
    const dampingForce = -damping * velocityRef.current
    velocityRef.current += (springForce + dampingForce) * dt
    posRef.current += velocityRef.current * dt

    const roundPos = Math.round(posRef.current * 100) / 100
    if (roundPos !== posRef.current || Math.abs(velocityRef.current) > 0.001) {
      trackRef.current?.style.setProperty("--carousel-offset", `${roundPos}`)
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  useEffect(() => {
    targetRef.current = -activeSlide
  }, [activeSlide])

  useEffect(() => {
    autoTimerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    }
  }, [])

  const goTo = (idx: number) => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    setActiveSlide(idx)
    autoTimerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % testimonials.length)
    }, 4000)
  }

  const prev = () => goTo(activeSlide === 0 ? testimonials.length - 1 : activeSlide - 1)
  const next = () => goTo((activeSlide + 1) % testimonials.length)

  return (
    <section className="sp-section">
      <div className="sp-inner">
        <h2 className="sp-title">O que estão dizendo</h2>
      </div>

      <div className="sp-stories-container">
        <div
          ref={trackRef}
          className="sp-stories-track"
          style={{ perspective: "1100px" } as React.CSSProperties}
        >
          {testimonials.map((t, i) => {
            const offset = i - activeSlide
            const style = getInterpolatedStyle(offset)
            return (
              <div
                key={i}
                className="sp-stories-card"
                style={style}
                onClick={() => goTo(i)}
              >
                <div
                  className="sp-stories-card-top"
                  style={{ background: t.color }}
                />
                <img
                  src={t.src}
                  alt={t.alt}
                  className="sp-stories-card-img"
                  draggable={false}
                />
              </div>
            )
          })}
        </div>

        <button className="sp-stories-arrow sp-stories-arrow-l" onClick={prev} aria-label="Anterior">
          <ChevronLeft size={22} color="#555" />
        </button>
        <button className="sp-stories-arrow sp-stories-arrow-r" onClick={next} aria-label="Próximo">
          <ChevronRight size={22} color="#555" />
        </button>

        <div className="sp-stories-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`sp-stories-dot${i === activeSlide ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
