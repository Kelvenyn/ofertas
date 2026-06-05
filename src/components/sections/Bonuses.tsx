"use client"

import { useState, useEffect, useRef } from "react"

interface BonusItem {
  front: string
  back: string
  title: string
  desc: string
  price: string
}

const bonuses: BonusItem[] = [
  {
    front: "/images/CR-NINJA-15.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_26_00.webp",
    title: "Cartões de Reforço Positivo",
    desc: "Quadro de incentivo lúdico para motivar a criança durante as sessões.",
    price: "R$ 27,00",
  },
  {
    front: "/images/CR-NINJA-16.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_56-1.webp",
    title: "Roteiro de Sondagem Inicial",
    desc: "Guia prático para avaliar o nível da criança e planejar intervenções.",
    price: "R$ 27,00",
  },
  {
    front: "/images/CR-NINJA-17.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_52-1.webp",
    title: "Atividades para Casa",
    desc: "Exercícios para os pais aplicar em casa e reforçar o trabalho.",
    price: "R$ 27,00",
  },
  {
    front: "/images/CR-NINJA-18.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_33.webp",
    title: "Registro de Evolução",
    desc: "Fichas para documentar a evolução da criança com clareza.",
    price: "R$ 27,00",
  },
  {
    front: "/images/CR-NINJA-15.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_44-1.webp",
    title: "Jogo da Memória",
    desc: "Atividade lúdica para estimular memória visual e concentração.",
    price: "R$ 27,00",
  },
  {
    front: "/images/CR-NINJA-16.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_48-1.webp",
    title: "Sequência Lógica",
    desc: "Exercícios para desenvolver raciocínio e organização mental.",
    price: "R$ 27,00",
  },
]

const totalBonusValue = bonuses.reduce((sum, b) => {
  const val = parseFloat(b.price.replace("R$ ", "").replace(".", "").replace(",", "."))
  return sum + val
}, 0)

function BonusCard({ bonus, index }: { bonus: BonusItem; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)
  const [backLoaded, setBackLoaded] = useState(false)
  const backImgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = bonus.back
    img.onload = () => setBackLoaded(true)
    backImgRef.current = img
  }, [bonus.back])

  const handleFlip = () => {
    if (backLoaded) setFlipped(!flipped)
  }

  return (
    <div className="bon-card">
      <div className="bon-card-emoji">&#9757;&#65039;</div>

      <div
        className={`bon-card-image-wrapper ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        {!frontLoaded && <div className="bon-card-skeleton" />}

        <div className="bon-card-image-inner" style={{ opacity: frontLoaded ? 1 : 0 }}>
          {!flipped ? (
            <img
              src={bonus.front}
              alt={bonus.title}
              className="bon-card-image"
              loading="lazy"
              onLoad={() => setFrontLoaded(true)}
            />
          ) : (
            <img
              src={bonus.back}
              alt={`${bonus.title} - conteúdo`}
              className="bon-card-image"
              loading="lazy"
            />
          )}
        </div>

        <div className="bon-card-banner">
          <span>&#127873; BÔNUS #{index + 1}</span>
        </div>
      </div>

      <p className="bon-card-hint">Toque na imagem acima para ver o conteúdo.</p>

      <div className="bon-card-pill">{bonus.title}</div>

      <p className="bon-card-desc">{bonus.desc}</p>

      <div className="bon-card-value">
        Valor: <span>{bonus.price}</span>
      </div>

      <div className="bon-card-gratis-pill">&#127873; GRÁTIS</div>
    </div>
  )
}

function SummaryCard() {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 52, seconds: 20 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const format = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="bon-summary">
      <h3 className="bon-summary-title">VALOR TOTAL DOS BÔNUS</h3>

      <div className="bon-summary-price">
        R$ {totalBonusValue.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </div>

      <button className="bon-summary-btn">
        &#127873; GRÁTIS
      </button>

      <p className="bon-summary-note">Incluso no Plano Completo</p>

      <div className="bon-summary-timer-label">
        &#9203; OFERTA EXPIRA EM
      </div>

      <div className="bon-summary-timer">
        <div className="bon-summary-timer-block">
          <span className="bon-summary-timer-num">{format(timeLeft.hours)}</span>
          <span className="bon-summary-timer-unit">h</span>
        </div>
        <span className="bon-summary-timer-sep">:</span>
        <div className="bon-summary-timer-block">
          <span className="bon-summary-timer-num">{format(timeLeft.minutes)}</span>
          <span className="bon-summary-timer-unit">m</span>
        </div>
        <span className="bon-summary-timer-sep">:</span>
        <div className="bon-summary-timer-block">
          <span className="bon-summary-timer-num">{format(timeLeft.seconds)}</span>
          <span className="bon-summary-timer-unit">s</span>
        </div>
      </div>
    </div>
  )
}

export function Bonuses() {
  return (
    <section className="bon-section">
      <div className="bon-inner">
        <div className="bon-pill">BÔNUS INCLUÍDOS</div>

        <h2 className="bon-title">6 bônus exclusivos</h2>

        <p className="bon-sub">
          Ao garantir o NeuroAtividades Kids hoje, você leva também estes materiais
          extras para enriquecer ainda mais seus atendimentos.
        </p>

        <div className="bon-cards">
          {bonuses.map((b, i) => (
            <BonusCard key={i} bonus={b} index={i} />
          ))}
        </div>

        <SummaryCard />
      </div>
    </section>
  )
}
