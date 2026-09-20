"use client"

import { useState, useEffect, useRef } from "react"
import { useCountdownTimer } from "@/hooks/useCountdownTimer"

const pad = (n: number) => String(n).padStart(2, "0")

export function CountdownBar() {
  const { h, m, s } = useCountdownTimer()
  const timerBrand = "var(--countdown-bar-brand, var(--brand))"
  const [collapsed, setCollapsed] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const prevDigits = useRef("000000")
  const [flipping, setFlipping] = useState<boolean[]>(Array(6).fill(false))
  const rafRef = useRef(0)

  const [reducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  )

  useEffect(() => {
    const raf = requestAnimationFrame(() => setCollapsed(window.scrollY >= 80))
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
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!barRef.current) return
    document.documentElement.style.paddingTop = collapsed ? "64px" : "60px"
  }, [collapsed])

  useEffect(() => {
    const current = pad(h) + pad(m) + pad(s)
    const prev = prevDigits.current
    const next = Array(6).fill(false) as boolean[]
    for (let i = 0; i < 6; i++) {
      if (current[i] !== prev[i]) next[i] = true
    }
    prevDigits.current = current
    const id = setTimeout(() => {
      setFlipping(next)
      setTimeout(() => setFlipping(Array(6).fill(false)), 200)
    }, 0)
    return () => clearTimeout(id)
  }, [h, m, s])

  const hh = pad(h)
  const mm = pad(m)
  const ss = pad(s)

  const digitStyle = (idx: number): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: collapsed
      ? "calc(14px * var(--lp-font-scale, 1))"
      : "clamp(calc(15px * var(--lp-font-scale, 1)), calc(4.6vw * var(--lp-font-scale, 1)), calc(18px * var(--lp-font-scale, 1)))",
    color: collapsed ? timerBrand : "#ffffff",
    fontVariantNumeric: "tabular-nums",
    transform: !reducedMotion && flipping[idx] ? "scaleY(0)" : "scaleY(1)",
    transition: "transform 100ms ease-in-out",
  })

  const blockStyle: React.CSSProperties = {
    background: collapsed
      ? `color-mix(in srgb, ${timerBrand} 12%, transparent)`
      : "rgba(255,255,255,0.16)",
    borderRadius: 8,
    padding: collapsed ? "4px 9px" : "4px clamp(6px, 2.25vw, 9px)",
    display: "inline-flex",
    gap: 1,
  }

  const colonStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: collapsed
      ? "calc(13px * var(--lp-font-scale, 1))"
      : "clamp(calc(14px * var(--lp-font-scale, 1)), calc(4.3vw * var(--lp-font-scale, 1)), calc(17px * var(--lp-font-scale, 1)))",
    color: collapsed ? timerBrand : "#ffffff",
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
            ? "left-[4%] right-[4%] sm:left-[25%] sm:right-[25%]"
            : "left-0 right-0"
        }
        style={{
          position: "fixed",
          top: collapsed ? 10 : 0,
          zIndex: 8000,
          height: collapsed ? 52 : 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: collapsed ? 10 : "clamp(6px, 2vw, 14px)",
          padding: collapsed ? "0 16px" : "0 clamp(8px, 2.5vw, 16px)",
          background: collapsed ? "rgba(255,255,255,0.35)" : timerBrand,
          backdropFilter: collapsed
            ? "blur(36px) saturate(240%)"
            : "blur(0px) saturate(100%)",
          WebkitBackdropFilter: collapsed
            ? "blur(36px) saturate(240%)"
            : "blur(0px) saturate(100%)",
          borderBottom: collapsed
            ? undefined
            : "1px solid rgba(255,255,255,0.22)",
          border: collapsed ? "1px solid rgba(255,255,255,0.25)" : undefined,
          borderRadius: collapsed ? 50 : 0,
          boxShadow: collapsed
            ? `0 4px 24px color-mix(in srgb, ${timerBrand} 15%, transparent)`
            : `0 2px 18px color-mix(in srgb, ${timerBrand} 16%, transparent)`,
          transition: reducedMotion
            ? "none"
            : "background-color 520ms cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 520ms cubic-bezier(0.22, 1, 0.36, 1), border-color 520ms ease, border-radius 520ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 520ms ease, top 520ms cubic-bezier(0.22, 1, 0.36, 1), height 520ms cubic-bezier(0.22, 1, 0.36, 1), gap 520ms ease, padding 520ms ease, left 520ms cubic-bezier(0.22, 1, 0.36, 1), right 520ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span
          className="cb-gift"
          style={{
            display: "inline-block",
            fontSize: collapsed
              ? "calc(15px * var(--lp-font-scale, 1))"
              : "calc(18px * var(--lp-font-scale, 1))",
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
            color: collapsed ? "#1a1a2e" : "#ffffff",
            letterSpacing: 0.5,
            whiteSpace: "nowrap",
            textTransform: "uppercase",
            fontSize: collapsed
              ? "calc(12px * var(--lp-font-scale, 1))"
              : "clamp(calc(12px * var(--lp-font-scale, 1)), calc(3.6vw * var(--lp-font-scale, 1)), calc(14px * var(--lp-font-scale, 1)))",
          }}
        >
          Bônus encerram em
        </span>
        <div
          role="timer"
          aria-label="Oferta por tempo limitado"
          aria-live="polite"
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
