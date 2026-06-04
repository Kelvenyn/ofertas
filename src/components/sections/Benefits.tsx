const benefits = [
  {
    icon: "🧠",
    title: "Atenção e Concentração",
    desc: "Atividades lúdicas para estimular foco, controle inibitório e atenção sustentada.",
  },
  {
    icon: "🔍",
    title: "Memória e Raciocínio",
    desc: "Exercícios para desenvolver retenção, associação e pensamento lógico.",
  },
  {
    icon: "✏️",
    title: "Leitura e Escrita",
    desc: "Materiais para trabalhar consciência fonológica e alfabetização.",
  },
  {
    icon: "🧩",
    title: "Organização e Praticidade",
    desc: "Fichas prontas para aplicar rapidamente sem precisar criar do zero.",
  },
]

export function Benefits() {
  return (
    <section className="ben-section">
      <div className="ben-inner">
        <h2 className="ben-title">Benefícios do material</h2>

        <div className="ben-grid">
          {benefits.map((b, i) => (
            <div className="ben-card" key={i}>
              <div className="ben-card-icon">{b.icon}</div>
              <h3 className="ben-card-title">{b.title}</h3>
              <p className="ben-card-desc">{b.desc}</p>
            </div>
          ))}
        </div>

        <a href="#oferta" className="ben-cta">
          QUERO ACESSAR O KIT AGORA
        </a>
      </div>
    </section>
  )
}
