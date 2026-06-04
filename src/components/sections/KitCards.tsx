const kitImages = [
  { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_26_00.webp", alt: "Jogo da Atenção" },
  { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_56-1.webp", alt: "Sequência Lógica" },
  { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_52-1.webp", alt: "Memória das Figuras" },
  { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_33.webp", alt: "Sílabas em Ação" },
  { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_44-1.webp", alt: "Trilha da Leitura" },
  { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_48-1.webp", alt: "Coordenação Motora Fina" },
  { src: "/images/2dd43d5e-6d02-4303-b0f8-be047df9bb0c.webp", alt: "Atividade para Casa" },
  { src: "/images/7886b7ae-8c1b-49a2-b185-e4955ab73050.webp", alt: "Registro de Evolução" },
]

export function KitCards() {
  return (
    <div className="bloco-categoria-interpretacao">
      <div className="bloco-categoria-inner">
        <div className="cat-topo-interpretacao">
          <div className="cat-titulo-interpretacao">
            <span className="cat-numero-destaque">Conheça o Material</span>
            <span className="cat-linha-titulo">Que Vai Transformar<br />Seus Atendimentos</span>
          </div>
        </div>

        <div className="esteira-interpretacao-wrap">
          <div className="esteira-interpretacao">
            <div className="esteira-interpretacao-track">
              {[...kitImages, ...kitImages].map((img, i) => (
                <div className="esteira-interpretacao-img" key={i}>
                  <img src={img.src} alt={img.alt} width={200} height={280} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
