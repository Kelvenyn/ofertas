"use client"

import { useEffect, useState, useRef } from "react"

export function VendaImediata() {
  const [time, setTime] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFixed, setIsFixed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update() {
      const agora = new Date()
      const fim = new Date()
      fim.setHours(23, 59, 59, 999)
      let diff = fim.getTime() - agora.getTime()
      if (diff <= 0) { setTime("00h 00m 00s"); return }
      const h = Math.floor(diff / 3600000)
      diff -= h * 3600000
      const m = Math.floor(diff / 60000)
      diff -= m * 60000
      const s = Math.floor(diff / 1000)
      setTime(`${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}min ${String(s).padStart(2,"0")}s`)
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      setIsFixed(scrollY > 100)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH > 0) {
        setScrollProgress(Math.min((scrollY / docH) * 100, 100))
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className={`vi-top-bar${isFixed ? " fixed" : ""}`}>
        <div className="vi-top-bar-inner">
          <div className="vi-top-bar-label">
            <span className="vi-top-bar-icon">&#10024;</span>
            Oferta por tempo limitado
          </div>
          <div className="vi-top-bar-timer">
            <span>Termina em</span>
            <strong>{time}</strong>
          </div>
        </div>
      </div>

      <section className="vi-hero" ref={sectionRef}>
        <div className="vi-hero-inner">
          <div className="vi-pill">NEUROATIVIDADES KIDS</div>

          <h1 className="vi-title">
            <span className="vi-title-line1">+250 atividades prontas</span>
            <span className="vi-title-line2">para atendimentos</span>
            <span className="vi-title-line3">Psicopedagógicos infantis</span>
          </h1>

          <div className="vi-image">
            <img
              src="/images/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp"
              alt="NeuroAtividades Kids"
              width={500}
              height={625}
            />
          </div>

          <p className="vi-sub">
            Materiais lúdicos, fichas de aplicação e atividades imprimíveis para trabalhar
            atenção, memória, leitura, escrita e raciocínio lógico com mais praticidade nos
            atendimentos infantis.
          </p>

          <a href="#oferta" className="vi-cta">
            QUERO ACESSAR O KIT AGORA
          </a>

          <div className="vi-price-preview">
            <span className="vi-price-old">de R$ 47,00</span>
            <span className="vi-price-new">R$ 14,90</span>
            <span className="vi-price-note">pagamento único &bull; acesso imediato</span>
          </div>
        </div>
      </section>

      <div className="vi-progress-track">
        <div className="vi-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>
    </>
  )
}
