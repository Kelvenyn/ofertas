"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollMarqueeProps {
  text?: string
  gradient?: string
  height?: number
  className?: string
  reverse?: boolean
  fadeColor?: string
}

function renderText(text: string) {
  const parts = text.split(/[•✦]/u).map((part) => part.trim()).filter(Boolean)
  const result: React.ReactNode[] = []
  parts.forEach((part, i) => {
    result.push(<span key={`t${i}`}>{part}</span>)
    result.push(
      <span key={`s${i}`} className="scroll-marquee-separator" aria-hidden="true">✦</span>
    )
  })
  return result
}

export function ScrollMarquee({
  text = "MATERIAL EM ALTA QUALIDADE • ACESSO IMEDIATO • BÔNUS INCLUÍDOS • ",
  gradient = "var(--marquee-gradient)",
  height = 48,
  className = "",
  reverse = false,
  fadeColor = "var(--bg, #FFF8E8)",
}: ScrollMarqueeProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const pos = useRef(0)
  const blockW = useRef(0)
  const lastScrollY = useRef(0)
  const scrollVel = useRef(0)
  const displayVel = useRef(0)
  const hovered = useRef(false)
  const [copies, setCopies] = useState(4)
  const [ready, setReady] = useState(false)

  const [reducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  )

  const direction = reverse ? -1 : 1
  const isVisibleRef = useRef(false)

  const measure = useCallback(() => {
    if (!blockRef.current) return
    const w = blockRef.current.offsetWidth
    if (w > 0) {
      blockW.current = w
      const needed = Math.ceil((window.innerWidth * 2.5) / w) + 2
      setCopies(Math.max(needed, 4))
    }
  }, [])

  useEffect(() => {
    measure()
    const id = setTimeout(() => { measure(); setReady(true) }, 50)
    const ro = new ResizeObserver(measure)
    if (blockRef.current) ro.observe(blockRef.current)
    window.addEventListener("resize", measure, { passive: true })
    return () => {
      clearTimeout(id)
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  useEffect(() => {
    const element = barRef.current?.closest(".scroll-marquee")
    if (reducedMotion || !ready || !element) return
    lastScrollY.current = window.scrollY
    const BASE = 0.5 * direction

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y
      scrollVel.current = Math.max(-4, Math.min(4, delta * 0.08)) * direction
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      rafRef.current = 0
      if (document.hidden || !isVisibleRef.current) return
      const effectiveBase = hovered.current ? 0 : BASE
      const target = effectiveBase + scrollVel.current
      displayVel.current = lerp(displayVel.current, target, 0.08)
      scrollVel.current *= 0.95

      pos.current -= displayVel.current
      if (blockW.current > 0) {
        if (pos.current <= -blockW.current) pos.current += blockW.current
        if (pos.current > 0) pos.current -= blockW.current
      }

      if (barRef.current) barRef.current.style.transform = `translateX(${pos.current}px)`
      rafRef.current = requestAnimationFrame(loop)
    }

    const start = () => {
      if (isVisibleRef.current && !document.hidden && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }
    const stop = () => {
      if (rafRef.current !== 0) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) start()
      else stop()
    }, { threshold: 0.1 })
    const onVisibilityChange = () => document.hidden ? stop() : start()

    observer.observe(element)
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      stop()
      window.removeEventListener("scroll", onScroll)
    }
  }, [ready, reducedMotion, direction])

  const rendered = renderText(text)
  const FADE_L = `linear-gradient(to right, ${fadeColor}, transparent)`
  const FADE_R = `linear-gradient(to left, ${fadeColor}, transparent)`

  if (reducedMotion) {
    return (
      <div className={`scroll-marquee ${className}`} style={{ height, background: `var(--marquee-gradient, ${gradient})` }} aria-hidden="true">
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="scroll-marquee-text">{rendered}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`scroll-marquee ${className}`}
      style={{ height, background: `var(--marquee-gradient, ${gradient})` }}
      aria-hidden="true"
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <div className="scroll-marquee-fade-left" style={{ background: FADE_L }} />
      <div className="scroll-marquee-fade-right" style={{ background: FADE_R }} />
      <div ref={barRef} className="scroll-marquee-bar">
        <div ref={blockRef} className="scroll-marquee-text">
          {Array.from({ length: copies }, (_, i) => (
            <span key={i} style={{ display: "inline" }}>{rendered}</span>
          ))}
        </div>
        <div className="scroll-marquee-text">
          {Array.from({ length: copies }, (_, i) => (
            <span key={i} style={{ display: "inline" }}>{rendered}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
