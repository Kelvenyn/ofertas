"use client"

import { useState, useEffect, useRef } from "react"
import { useCountdownTimer } from "@/hooks/useCountdownTimer"

const pad = (n: number) => String(n).padStart(2, "0")

export function CountdownBar() {
  const { h, m, s } = useCountdownTimer()
  const [collapsed, setCollapsed] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const prevDigits = useRef("000000")
  const [flipping, setFlipping] = useState<boolean[]>(Array(6).fill(false))
  const rafRef = useRef(0)

  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false

  useEffect(() => {
    setCollapsed(window.scrollY >= 80)
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafRef.current = requestAnimationFrame(() => {
          setCollapsed(window.scrollY >= 80)
          ticking = false
        })
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!barRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height
      document.documentElement.style.paddingTop = `${height + (collapsed ? 10 : 0)}px`
    })
    ro.observe(barRef.current)
    return () => ro.disconnect()
  }, [collapsed])

  useEffect(() => {
    const current = pad(h) + pad(m) + pad(s)
    const prev = prevDigits.current
    const next = Array(6).fill(false) as boolean[]
    for (let i = 0; i < 6; i++) {
      if (current[i] !== prev[i]) next[i] = true
    }
    setFlipping(next)
    prevDigits.current = current
    const t = setTimeout(() => setFlipping(Array(6).fill(false)), 200)
    return () => clearTimeout(t)
  }, [h, m, s])

  const hh = pad(h)
  const mm = pad(m)
  const ss = pad(s)

  const digitStyle = (idx: number): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: collapsed ? 13 : 15,
    color: "#0B7FE8",
    fontVariantNumeric: "tabular-nums",
    transform: !reducedMotion && flipping[idx] ? "scaleY(0)" : "scaleY(1)",
    transition: "transform 100ms ease-in-out",
  })

  const blockStyle: React.CSSProperties = {
    background: "rgba(11,127,232,0.12)",
    borderRadius: 6,
    padding: "2px 7px",
    display: "inline-flex",
    gap: 1,
  }

  const colonStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: collapsed ? 12 : 14,
    color: "#0B7FE8",
    animation: reducedMotion ? "none" : "cb-colon-blink 0.8s step-end infinite",
  }

  return (
    <>
      <style>{`
        @keyframes cb-pulse-gift {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.5; }
        }
        @keyframes cb-colon-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cb-gift { animation: none !important; }
        }
      `}</style>
      <div
        ref={barRef}
        role="banner"
        className={
          collapsed
            ? "left-[8%] right-[8%] sm:left-[25%] sm:right-[25%]"
            : "left-0 right-0"
        }
        style={{
          position: "fixed",
          top: collapsed ? 10 : 0,
          zIndex: 9999,
          height: collapsed ? 46 : 52,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: collapsed ? 8 : 12,
          padding: "0 16px",
          background: collapsed
            ? "rgba(255,255,255,0.35)"
            : "rgba(11,127,232,0.10)",
          backdropFilter: collapsed
            ? "blur(36px) saturate(240%)"
            : "blur(20px) saturate(180%)",
          WebkitBackdropFilter: collapsed
            ? "blur(36px) saturate(240%)"
            : "blur(20px) saturate(180%)",
          borderBottom: collapsed
            ? undefined
            : "1px solid rgba(255,255,255,0.2)",
          border: collapsed ? "1px solid rgba(255,255,255,0.25)" : undefined,
          borderRadius: collapsed ? 50 : 0,
          boxShadow: collapsed
            ? "0 4px 24px rgba(11,127,232,0.15)"
            : "0 2px 24px rgba(11,127,232,0.1)",
          transition: reducedMotion
            ? "all 150ms linear"
            : "all 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span
          className="cb-gift"
          style={{
            display: "inline-block",
            fontSize: collapsed ? 14 : 16,
            animation: reducedMotion ? "none" : "cb-pulse-gift 1.4s infinite",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          🎁
        </span>
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: 0.5,
            whiteSpace: "nowrap",
            textTransform: "uppercase",
            fontSize: collapsed ? 11 : 13,
          }}
        >
          Bônus encerram em
        </span>
        <div
          role="timer"
          aria-label="Oferta por tempo limitado"
          aria-live="off"
          style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}
        >
          <span style={blockStyle}>
            <span style={digitStyle(0)}>{hh[0]}</span>
            <span style={digitStyle(1)}>{hh[1]}</span>
          </span>
          <span style={colonStyle}>:</span>
          <span style={blockStyle}>
            <span style={digitStyle(2)}>{mm[0]}</span>
            <span style={digitStyle(3)}>{mm[1]}</span>
          </span>
          <span style={colonStyle}>:</span>
          <span style={blockStyle}>
            <span style={digitStyle(4)}>{ss[0]}</span>
            <span style={digitStyle(5)}>{ss[1]}</span>
          </span>
        </div>
      </div>
    </>
  )
}
