"use client"

import { useState, useCallback, useEffect } from "react"

const HAND_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='80'%3E%F%EF%B8%8F%3C/text%3E%3C/svg%3E"

const bonuses = [
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

interface FlipCardProps {
  front: string
  back: string
  title: string
  desc: string
  price: string
  index: number
}

function FlipCard({ front, back, title, desc, price }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [hasFlipped, setHasFlipped] = useState(false)
  const [frontLoaded, setFrontLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = back
  }, [back])

  const handleClick = useCallback(() => {
    setFlipped(f => {
      const next = !f
      if (!next) setHasFlipped(false)
      else if (!hasFlipped) setHasFlipped(true)
      return next
    })
  }, [hasFlipped])

  return (
    <div className="bon-flip-card" onClick={handleClick}>
      {!frontLoaded && (
        <div className="bon-flip-skeleton" />
      )}

      <div
        className="bon-flip-perspective"
        style={{ opacity: frontLoaded ? 1 : 0 }}
      >
        <div
          className="bon-flip-inner"
          style={{
            transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div className="bon-flip-face bon-flip-front">
            <img
              src={front}
              alt={title}
              className="bon-flip-img"
              loading="lazy"
              onLoad={() => setFrontLoaded(true)}
            />
            <div className="bon-flip-ribbon">Grátis</div>
            {!hasFlipped && (
              <div className="bon-flip-hand">
                <span className="bon-flip-hand-emoji">&#9757;&#65039;</span>
              </div>
            )}
          </div>

          {/* Back */}
          <div className="bon-flip-face bon-flip-back">
            <img
              src={back}
              alt={`${title} - conteúdo`}
              className="bon-flip-img"
              loading="lazy"
            />
            <div className="bon-flip-back-hint">
              &#8634; Toque para voltar
            </div>
          </div>
        </div>
      </div>

      <div className="bon-card-info">
        <h3 className="bon-card-title">{title}</h3>
        <p className="bon-card-desc">{desc}</p>
        <span className="bon-card-price">{price}</span>
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

        <div className="bon-grid">
          {bonuses.map((b, i) => (
            <FlipCard key={i} index={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  )
}
