"use client"

import { useEffect, useRef, useState } from "react"

const painPoints = [
  "Falta de ideias para preparar um atendimento de última hora.",
  "Criança desmotivada, dispersa ou sem interesse durante a sessão.",
  "Repetição dos mesmos recursos semana após semana.",
  "Pouco tempo para adaptar atividades, organizar registros e acompanhar a evolução da criança.",
]

export function CounterPainPoints() {
  const [count, setCount] = useState(0)
  const [barWidth, setBarWidth] = useState("0%")
  const counterRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = counterRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animated.current) {
            animated.current = true
            const target = 250
            const duration = 1800
            let start: number | null = null

            function animate(ts: number) {
              if (!start) start = ts
              const p = Math.min((ts - start) / duration, 1)
              const ease = 1 - Math.pow(1 - p, 3)
              const val = Math.floor(ease * target)

              setCount(val)
              setBarWidth(`${ease * 100}%`)

              if (p < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
                setBarWidth("100%")
              }
            }

            requestAnimationFrame(animate)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="dc-wrap" ref={counterRef} id="docs-counter">
      <div className="dc-inner">
        <div className="dc-numberline">
          <span className="dc-prefix">+ de</span>
          <span className="dc-count" id="dc-count">
            {count}
          </span>
          <span className="dc-label">atividades psicopedagógicas</span>
        </div>

        <div className="dc-bar" role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={250}>
          <div className="dc-fill" style={{ width: barWidth }}></div>
        </div>

        <div className="dc-dores-wrap">
          <div className="dc-dores-intro">Você reconhece alguma destas situações?</div>
          <div className="dc-dores-lista">
            {painPoints.map((point, i) => (
              <div className="dc-dor-item" key={i}>
                <div className="dc-dor-icon">✕</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
