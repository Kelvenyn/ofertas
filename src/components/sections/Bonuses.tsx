const bonuses = [
  {
    src: "/images/CR-NINJA-15.webp",
    title: "Cartões de Reforço Positivo",
    desc: "Quadro de incentivo lúdico para motivar a criança durante as sessões.",
    price: "R$ 27,00",
  },
  {
    src: "/images/CR-NINJA-16.webp",
    title: "Roteiro de Sondagem Inicial",
    desc: "Guia prático para avaliar o nível da criança e planejar intervenções.",
    price: "R$ 27,00",
  },
  {
    src: "/images/CR-NINJA-17.webp",
    title: "Atividades para Casa",
    desc: "Exercícios para os pais aplicar em casa e reforçar o trabalho.",
    price: "R$ 27,00",
  },
  {
    src: "/images/CR-NINJA-18.webp",
    title: "Registro de Evolução",
    desc: "Fichas para documentar a evolução da criança com clareza.",
    price: "R$ 27,00",
  },
  {
    src: "/images/CR-NINJA-15.webp",
    title: "Jogo da Memória",
    desc: "Atividade lúdica para estimular memória visual e concentração.",
    price: "R$ 27,00",
  },
  {
    src: "/images/CR-NINJA-16.webp",
    title: "Sequência Lógica",
    desc: "Exercícios para desenvolver raciocínio e organização mental.",
    price: "R$ 27,00",
  },
]

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
            <div className="bon-card" key={i}>
              <div className="bon-card-ribbon">Grátis</div>
              <div className="bon-card-img">
                <img src={b.src} alt={b.title} width={100} height={100} />
              </div>
              <h3 className="bon-card-title">{b.title}</h3>
              <p className="bon-card-desc">{b.desc}</p>
              <span className="bon-card-price">{b.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
