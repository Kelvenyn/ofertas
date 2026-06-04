const steps = [
  {
    num: "01",
    title: "Faça a compra",
    desc: "Escolha seu plano e finalize o pagamento de forma segura.",
  },
  {
    num: "02",
    title: "Receba o acesso",
    desc: "O material chega no seu e-mail e WhatsApp imediatamente.",
  },
  {
    num: "03",
    title: "Baixe e imprima",
    desc: "Acesse, baixe e imprima as atividades que quiser.",
  },
  {
    num: "04",
    title: "Aplique nos atendimentos",
    desc: "Use nas sessões ou envie para casa com os pais.",
  },
]

export function ComoEAcesso() {
  return (
    <section className="cea-section">
      <div className="cea-inner">
        <h2 className="cea-title">Como é o acesso</h2>

        <div className="cea-steps">
          {steps.map((step, i) => (
            <div className="cea-step" key={i}>
              <div className="cea-step-num">{step.num}</div>
              <div className="cea-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
