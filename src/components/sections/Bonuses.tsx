const bonuses = [
  {
    src: "/images/CR-NINJA-15.webp",
    alt: "Cartões de Reforço Positivo",
    title: "Cartões de Reforço Positivo",
    desc: "Quadro de incentivo lúdico para motivar a criança durante as sessões e reforçar comportamentos positivos.",
  },
  {
    src: "/images/CR-NINJA-16.webp",
    alt: "Roteiro de Sondagem Inicial",
    title: "Roteiro de Sondagem Inicial",
    desc: "Um guia prático para avaliar o nível da criança e planejar as intervenções mais adequadas.",
  },
  {
    src: "/images/CR-NINJA-17.webp",
    alt: "Atividades para Enviar para Casa",
    title: "Atividades para Enviar para Casa",
    desc: "Exercícios simples que os pais podem aplicar em casa para reforçar o trabalho realizado no consultório.",
  },
  {
    src: "/images/CR-NINJA-18.webp",
    alt: "Registro de Evolução Psicopedagógica",
    title: "Registro de Evolução Psicopedagógica",
    desc: "Fichas para documentar a evolução da criança com mais clareza e agilidade.",
  },
]

export function Bonuses() {
  return (
    <div className="bonos-wrap">
      <div className="bonos-inner">
        <div className="bonos-pill">EXTRA INCLUÍDO</div>

        <h2 className="bonos-title">4 BÔNUS EXCLUSIVOS</h2>

        <p className="bonos-sub">
          Ao garantir o NeuroAtividades Kids hoje, você leva também estes materiais extras
          para enriquecer ainda mais seus atendimentos.
        </p>

        <div className="bonos-divider"></div>

        <div className="bonos-cards">
          {bonuses.map((bonus, i) => (
            <div className="bonus-card" key={i}>
              <div className="bonus-card-img">
                <img src={bonus.src} alt={bonus.alt} width={100} height={100} />
              </div>
              <div className="bonus-card-conteudo">
                <h3>{bonus.title}</h3>
                <p>{bonus.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
