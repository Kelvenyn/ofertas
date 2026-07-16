"use client"

import { useRef, useState, useEffect } from "react"
import { useOffer } from "@/context/offer-context"

const STEP_COLORS = ["var(--brand)"]
const CIRCLE_RADIUS = 34
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

function StepCircle({ index, color, total }: { index: number; color: string; total: number }) {
  const [fill, setFill] = useState(0)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = circleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) {
          const targetFill = ((index + 1) / total) * 100
          setTimeout(() => setFill(targetFill), index * 150)
          obs.disconnect()
        }
      },
      { threshold: [0, 0.3] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, total])

  const dashoffset = CIRCUMFERENCE - (fill / 100) * CIRCUMFERENCE

  return (
    <div
      ref={circleRef}
      className="cea-circle-wrap"
      style={{ "--step-color": color } as React.CSSProperties}
    >
      <svg className="cea-circle-svg" viewBox="0 0 80 80">
        <circle
          className="cea-circle-bg"
          cx="40"
          cy="40"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="5"
        />
        <circle
          className="cea-circle-progress"
          cx="40"
          cy="40"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <span className="cea-circle-number" style={{ color }}>{index + 1}</span>
    </div>
  )
}

export function ComoEAcesso() {
  const offer = useOffer()
  const { title, steps } = offer.access
  return (
    <section className="cea-section" aria-labelledby="access-title">
      <div className="cea-inner">
        <h2 className="cea-title" id="access-title">{title}</h2>

        <div className="cea-grid">
          {steps.map((step, i) => {
            const color = STEP_COLORS[i]
            return (
              <div className="cea-card" key={i} style={{ "--step-color": color } as React.CSSProperties}>
                <StepCircle index={i} color={color} total={steps.length} />
                <h3 className="cea-card-title">{step.title}</h3>
                <p className="cea-card-desc">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
