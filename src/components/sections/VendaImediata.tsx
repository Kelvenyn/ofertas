"use client"

import { useEffect, useState, useRef } from "react"
import { ShinyButton } from "@/components/ui/ShinyButton"
import { ScrollMarquee } from "@/components/ui/ScrollMarquee"

export function VendaImediata() {
  const [time, setTime] = useState("")
  const [flipping, setFlipping] = useState<boolean[]>([false, false, false])
  const prevPartsRef = useRef<string[]>(["", "", ""])
  const [isFixed, setIsFixed] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

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
      const newParts = [
        `${String(h).padStart(2,"0")}h`,
        `${String(m).padStart(2,"0")}m`,
        `${String(s).padStart(2,"0")}s`
      ]

      const prevParts = prevPartsRef.current
      const newFlipping = newParts.map((p, i) => p !== prevParts[i])
      setFlipping(newFlipping)
      prevPartsRef.current = newParts

      if (newFlipping.some(Boolean)) {
        setTimeout(() => setFlipping([false, false, false]), 150)
      }

      setTime(newParts.join(" "))
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    function onScroll() {
      const hero = heroRef.current
      if (!hero) return
      const heroBottom = hero.offsetTop + hero.offsetHeight
      const scrollY = window.scrollY
      setIsFixed(scrollY > 60)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const timerParts = time.split(" ")

  return (
    <>
      <div className={`vi-top-bar${isFixed ? " fixed" : ""}`}>
        <div className="vi-top-bar-inner">
          <div className="vi-top-bar-label">
            <span className="vi-top-bar-icon">&#127873;</span>
            <span className="vi-top-bar-text">BÔNUS ENCERRAM EM</span>
          </div>
          <div className="vi-top-bar-timer">
            {timerParts.map((part, i) => (
              <span key={i} className={`vi-timer-segment${flipping[i] ? " flip" : ""}`}>
                {part}
                {i < 2 && <span className="vi-timer-sep">:</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="vi-hero" ref={heroRef}>
        <div className="vi-hero-inner">
          <div className="vi-pill">NEUROATIVIDADES KIDS</div>

          <h1 className="vi-title">
            <span className="vi-title-line1">+250 Atividades Prontas</span>
            <span className="vi-title-line2">para atendimentos</span>
            <span className="vi-title-line3">Psicopedagógicos infantis</span>
          </h1>

          <div className="vi-image">
            <img
              src="/images/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp"
              alt="NeuroAtividades Kids"
              width={340}
              height={425}
            />
          </div>

          <p className="vi-sub">
            Materiais lúdicos, fichas de aplicação e atividades imprimíveis para trabalhar
            atenção, memória, leitura, escrita e raciocínio lógico com mais praticidade nos
            atendimentos infantis.
          </p>

          <ShinyButton href="#oferta" className="vi-cta-btn">
            QUERO ACESSAR O KIT AGORA
          </ShinyButton>

          <ScrollMarquee
            text="Material em Alta Qualidade • Acesso Imediato • "
            gradient="linear-gradient(135deg, #fd5b00 0%, #ff8c1a 35%, #ffc107 65%, #ffd41e 100%)"
            className="vi-marquee"
          />
        </div>
      </section>
    </>
  )
}
