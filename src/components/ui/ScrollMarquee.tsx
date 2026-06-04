"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollMarqueeProps {
  text?: string
  gradient?: string
  fadeLeft?: string
  fadeRight?: string
  height?: number
  className?: string
  reverse?: boolean
}

const SEPARATOR_RE = /•/g

function renderText(text: string) {
  const parts = text.split(SEPARATOR_RE)
  const result: React.ReactNode[] = []
  parts.forEach((part, i) => {
    result.push(<span key={`t${i}`}>{part}</span>)
    if (i < parts.length - 1) {
      result.push(
        <span key={`s${i}`} style={{ opacity: 0.6, margin: "0 8px" }}>•</span>
      )
    }
  })
  return result
}

export function ScrollMarquee({
  text = "+250 Atividades Psicopedagógicas  •  Acesso Imediato  •  Material em Alta Qualidade  •  ",
  gradient = "linear-gradient(135deg, #0B7FE8 0%, #1D4ED8 35%, #082F63 65%, #0B7FE8 100%)",
  fadeLeft,
  fadeRight,
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

  const fadeL = fadeLeft || gradient.replace(/135deg/, "to right")
  const fadeR = fadeRight || gradient.replace(/135deg/, "to left")

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
    const BASE = 0.5

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y
      scrollVel.current = Math.max(-4, Math.min(4, delta * 0.08))
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      const effectiveBase = hovered.current ? 0 : BASE
      const target = effectiveBase + scrollVel.current
      displayVel.current = lerp(displayVel.current, target, 0.08)
      scrollVel.current *= 0.95

      pos.current -= displayVel.current * (reverse ? -1 : 1)
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
  }, [ready, reducedMotion])

  const textStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    color: "#fff",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    textShadow: "0 1px 3px rgba(0,0,0,0.2)",
    whiteSpace: "nowrap",
    display: "inline-block",
  }

  const rendered = renderText(text)

  if (reducedMotion) {
    return (
      <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginTop: 24 }} className={className}>
        <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", background: gradient }}>
          <span style={textStyle}>{rendered}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginTop: 24 }}
      className={className}
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <div style={{
        height,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        background: gradient,
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 80, height: "100%", background: fadeL, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 80, height: "100%", background: fadeR, zIndex: 2, pointerEvents: "none" }} />
        <div ref={barRef} style={{ display: "flex", willChange: "transform" }}>
          <div ref={blockRef} style={textStyle}>{rendered}{rendered}</div>
          <div style={textStyle}>{rendered}{rendered}</div>
        </div>
      </div>
    </div>
  )
}
