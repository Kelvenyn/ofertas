const steps = [
  {
    num: "01",
    title: "Você escolhe a atividade com rapidez",
    desc: "Encontre recursos para atenção, memória, leitura, escrita e raciocínio sem perder tempo procurando.",
  },
  {
    num: "02",
    title: "A criança participa com mais interesse",
    desc: "As propostas lúdicas deixam a sessão mais visual, dinâmica e fácil de conduzir.",
  },
  {
    num: "03",
    title: "Você trabalha com mais intenção",
    desc: "Cada atividade ajuda a estimular habilidades específicas, tornando o atendimento mais direcionado.",
  },
  {
    num: "04",
    title: "Fica mais fácil acompanhar a evolução",
    desc: "Use os registros e fichas de apoio para organizar observações e visualizar o progresso da criança.",
  },
]

export function ProcessSteps() {
  return (
    <div className="neuro-processo">
      <div className="neuro-processo-inner">
        <div className="neuro-processo-topo">
          <div className="neuro-processo-pill">ATENDIMENTO MAIS PRÁTICO</div>
          <h2 className="neuro-processo-title">
            Do improviso para um atendimento<br />mais leve, organizado e intencional
          </h2>
          <p className="neuro-processo-sub">
            Com atividades prontas e separadas por habilidade, você consegue escolher o recurso certo,
            aplicar com mais segurança e acompanhar melhor a evolução da criança.
          </p>
        </div>

        <div className="neuro-processo-grid">
          {steps.map((step, i) => (
            <div className="neuro-processo-card" key={i}>
              <div className="neuro-processo-numero">{step.num}</div>
              <div className="neuro-processo-card-conteudo">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
