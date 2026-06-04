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

const features = [
  {
    num: "01",
    title: "250 atividades prontas",
    desc: "Economize tempo com materiais organizados e prontos para imprimir e aplicar.",
  },
  {
    num: "02",
    title: "Atendimentos mais dinâmicos",
    desc: "Recursos lúdicos que ajudam a manter o interesse e a participação das crianças.",
  },
  {
    num: "03",
    title: "Diversas habilidades trabalhadas",
    desc: "Exercícios para estimular leitura, escrita, memória, atenção e raciocínio lógico.",
  },
  {
    num: "04",
    title: "Mais praticidade no dia a dia",
    desc: "Tenha sempre atividades preparadas para usar em atendimentos psicopedagógicos infantis.",
  },
]

export function KitCards() {
  return (
    <div className="bloco-categoria-interpretacao">
      <div className="bloco-categoria-inner">
        <div className="cat-topo-interpretacao">
          <div className="cat-titulo-interpretacao">
            <span className="cat-numero-destaque">+250 Atividades</span>
            <span className="cat-linha-titulo">Psicopedagógicas</span>
            <span className="cat-linha-titulo menor">para atendimentos infantis</span>
          </div>

          <div className="cat-linha-interpretacao"></div>

          <p className="cat-intro-interpretacao">
            Recursos organizados para trabalhar <strong>atenção</strong>, <strong>memória</strong>,{" "}
            <strong>leitura</strong>, <strong>escrita</strong> e <strong>raciocínio lógico</strong>{" "}
            com mais praticidade durante os atendimentos.
          </p>
        </div>

        <div className="esteira-interpretacao-wrap">
          <div className="esteira-interpretacao">
            <div className="esteira-interpretacao-track">
              {[...kitImages, ...kitImages].map((img, i) => (
                <div className="esteira-interpretacao-img" key={i}>
                  <img src={img.src} alt={img.alt} width={140} height={210} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cat-recursos-lista">
          {features.map((feat, i) => (
            <div className="cat-recurso-item" key={i}>
              <div className="cat-recurso-num">{feat.num}</div>
              <div className="cat-recurso-conteudo">
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
