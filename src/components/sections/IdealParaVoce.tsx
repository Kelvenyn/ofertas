const items = [
  {
    icon: "🎯",
    title: "Atividades prontas",
    desc: "Sem precisar criar do zero para cada atendimento",
  },
  {
    icon: "🎮",
    title: "Sessões lúdicas",
    desc: "Recursos que prendem a atenção e motivam as crianças",
  },
  {
    icon: "⚡",
    title: "Aplicação rápida",
    desc: "Materiais organizados por habilidade para usar no momento",
  },
  {
    icon: "📊",
    title: "Acompanhamento",
    desc: "Fichas e registros para documentar a evolução",
  },
]

export function IdealParaVoce() {
  return (
    <section className="idv-section">
      <div className="idv-inner">
        <div className="idv-pill">É PARA VOCÊ</div>

        <h2 className="idv-title">Ideal para você que…</h2>

        <p className="idv-sub">
          Este material foi pensado para psicopedagogos, terapeutas e educadores que atuam
          com crianças e buscam mais organização e praticidade.
        </p>

        <div className="idv-grid">
          {items.map((item, i) => (
            <div className="idv-card" key={i}>
              <div className="idv-card-icon">{item.icon}</div>
              <h3 className="idv-card-title">{item.title}</h3>
              <p className="idv-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
