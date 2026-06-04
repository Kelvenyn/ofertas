"use client"

import { useEffect, useRef, useState } from "react"

const bullets = [
  "Mais de 250 atividades psicopedagógicas prontas",
  "Materiais para atenção, memória, leitura e escrita",
  "Atividades lúdicas e imprimíveis",
  "Fichas de aplicação organizadas por habilidade",
  "Material pronto para baixar e imprimir",
  "Acesso imediato após a compra",
]

export function TudoQueVoceRecebe() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(bullets.length).fill(false))
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-idx"))
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev]
                next[idx] = true
                return next
              })
            }, idx * 150)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    el.querySelectorAll("[data-idx]").forEach((child) => obs.observe(child))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="tqvr-section">
      <div className="tqvr-card">
        <div className="tqvr-pill">CONTEÚDO DO KIT</div>

        <h2 className="tqvr-title">
          Veja o que você recebe
          <span>no <strong>NeuroAtividades Kids</strong></span>
        </h2>

        <div className="tqvr-image">
          <img
            src="/images/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp"
            alt="NeuroAtividades Kids"
            width={340}
            height={425}
          />
        </div>

        <div className="tqvr-bullets" ref={listRef}>
          {bullets.map((text, i) => (
            <div
              className={`tqvr-bullet${visibleItems[i] ? " visible" : ""}`}
              key={i}
              data-idx={i}
            >
              <div className="tqvr-bullet-icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7L6 10L11 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
