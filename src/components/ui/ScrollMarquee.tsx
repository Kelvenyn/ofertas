"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollMarqueeProps {
  text?: string
  gradient?: string
  height?: number
  className?: string
  reverse?: boolean
}

function renderText(text: string) {
  const parts = text.split(/•/g)
  const result: React.ReactNode[] = []
  parts.forEach((part, i) => {
    result.push(<span key={`t${i}`}>{part}</span>)
    if (i < parts.length - 1) {
      result.push(
        <span key={`s${i}`} style={{ opacity: 0.5, margin: "0 8px" }}>✦</span>
      )
    }
  })
  return result
}

export function ScrollMarquee({
  text = "MATERIAL EM ALTA QUALIDADE • ACESSO IMEDIATO • BÔNUS INCLUÍDOS • ",
  gradient = "linear-gradient(135deg, #fd5b00 0%, #ff8c1a 35%, #ffc107 65%, #ffd41e 100%)",
  height = 48,
  className = "",
  reverse = false,
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
  const [ready, setReady] = useState(false)

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const direction = reverse ? -1 : 1

  const measure = useCallback(() => {
    if (blockRef.current) blockW.current = blockRef.current.offsetWidth
  }, [])

  useEffect(() => {
    measure()
    setReady(true)
    const ro = new ResizeObserver(measure)
    if (blockRef.current) ro.observe(blockRef.current)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    if (reducedMotion || !ready) return
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

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
    }
  }, [ready, reducedMotion, direction])

  const rendered = renderText(text)

  const FADE_L = gradient.includes("#8B6914")
    ? "linear-gradient(to right, #8B6914, transparent)"
    : "linear-gradient(to right, #fd5b00, transparent)"
  const FADE_R = gradient.includes("#8B6914")
    ? "linear-gradient(to left, #8B6914, transparent)"
    : "linear-gradient(to left, #ffd41e, transparent)"

  if (reducedMotion) {
    return (
      <div className={`scroll-marquee ${className}`} style={{ height, background: gradient }} aria-hidden="true">
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="scroll-marquee-text">{rendered}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`scroll-marquee ${className}`}
      style={{ height, background: gradient }}
      aria-hidden="true"
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <div className="scroll-marquee-fade-left" style={{ background: FADE_L }} />
      <div className="scroll-marquee-fade-right" style={{ background: FADE_R }} />
      <div ref={barRef} className="scroll-marquee-bar">
        <div ref={blockRef} className="scroll-marquee-text">{rendered}{rendered}</div>
        <div className="scroll-marquee-text">{rendered}{rendered}</div>
      </div>
    </div>
  )
}
