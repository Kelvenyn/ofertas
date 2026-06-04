const testimonials = [
  {
    stars: "★★★★★",
    text: "Finalmente encontrei um material completo e organizado. Uso praticamente todos os dias nos meus atendimentos e as crianças adoram as atividades.",
  },
  {
    stars: "★★★★★",
    text: "Economizo muito tempo preparando sessões. O material é intuitivo e as fichas de aplicação são muito úteis para o dia a dia.",
  },
  {
    stars: "★★★★★",
    text: "As atividades são lúdicas e realmente prendem a atenção das crianças. Recomendo para todo psicopedagogo que trabalha com infantil.",
  },
]

export function SocialProof() {
  return (
    <div className="qs-social-wrap">
      <div className="qs-social-inner">
        <div className="qs-social-pill">RESULTADOS DE QUEM JÁ USA</div>
        <h2 className="qs-social-title">O que estão dizendo</h2>

        <div className="qs-social-grid">
          {testimonials.map((t, i) => (
            <div className="qs-social-card" key={i}>
              <div className="qs-social-stars">{t.stars}</div>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
