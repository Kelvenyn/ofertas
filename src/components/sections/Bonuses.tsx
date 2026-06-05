"use client"

import { useState, useCallback, useEffect } from "react"

const bonuses = [
  {
    front: "/images/CR-NINJA-15.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_26_00.webp",
    title: "Planner Bíblico",
    desc: "Cronograma organizado para criar constância na leitura diária.",
    price: "R$ 47,00",
  },
  {
    front: "/images/CR-NINJA-16.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_56-1.webp",
    title: "Guia de Oração",
    desc: "Roteiro diário para aprofundar sua vida espiritual.",
    price: "R$ 47,00",
  },
  {
    front: "/images/CR-NINJA-17.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_52-1.webp",
    title: "Planilha de Estudos",
    desc: "Acompanhe seu progresso na leitura bíblica.",
    price: "R$ 47,00",
  },
  {
    front: "/images/CR-NINJA-18.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_33.webp",
    title: "Marcadores Exclusivos",
    desc: "Organize suas passagens favoritas com facilidade.",
    price: "R$ 47,00",
  },
  {
    front: "/images/CR-NINJA-15.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_44-1.webp",
    title: "Devocional Semanal",
    desc: "Reflexões práticas para cada dia da semana.",
    price: "R$ 47,00",
  },
  {
    front: "/images/CR-NINJA-16.webp",
    back: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_48-1.webp",
    title: "Atlas Bíblico",
    desc: "Mapas ilustrados para entender o contexto geográfico.",
    price: "R$ 47,00",
  },
]

interface FlipCardProps {
  front: string
  back: string
  title: string
  desc: string
  price: string
  index: number
}

function FlipCard({ front, back, title, desc, price, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = back
  }, [back])

  const handleClick = useCallback(() => {
    setFlipped(f => !f)
  }, [])

  const bonusNumber = index + 1

  return (
    <div className="bon-new-card">
      <div className="bon-new-image-wrapper" onClick={handleClick}>
        {!frontLoaded && <div className="bon-flip-skeleton" />}

        <div
          className="bon-new-perspective"
          style={{ opacity: frontLoaded ? 1 : 0 }}
        >
          <div
            className="bon-new-inner"
            style={{
              transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div className="bon-new-face bon-new-front">
              <img
                src={front}
                alt={title}
                className="bon-new-img"
                loading="lazy"
                onLoad={() => setFrontLoaded(true)}
              />
              <div className="bon-new-stripe">
                <span className="bon-new-stripe-text">🎁 BÔNUS #{bonusNumber}</span>
              </div>
              {!flipped && (
                <div className="bon-new-hand">
                  <span className="bon-new-hand-emoji">☝🏽</span>
                </div>
              )}
            </div>

            {/* Back */}
            <div className="bon-new-face bon-new-back">
              <img
                src={back}
                alt={`${title} - conteúdo`}
                className="bon-new-img"
                loading="lazy"
              />
              <div className="bon-new-back-hint">
                &#8634; Toque para voltar
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="bon-new-touch-hint">
        <em>Toque na imagem acima para ver o conteúdo.</em>
      </p>

      <div className="bon-new-info">
        <span className="bon-new-pill-title">{title}</span>
        <p className="bon-new-desc">{desc}</p>
        <span className="bon-new-price">{price}</span>

        <div className="bon-new-timer">
          <span className="bon-new-timer-icon">&#9203;</span>
          <span className="bon-new-timer-text">OFERTA EXPIRA COM O CRONÔMETRO</span>
        </div>

        <div className="bon-new-pill-free">
          🎁 GRÁTIS
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
          Ao garantir o kit hoje, você leva também estes materiais
          extras para enriquecer ainda mais sua experiência.
        </p>

        <div className="bon-grid">
          {bonuses.map((b, i) => (
            <FlipCard key={i} index={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  )
}
