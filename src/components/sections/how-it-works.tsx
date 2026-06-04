export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Escolha a Atividade",
      description: "Navegue pelo acervo organizado por habilidade e faixa etária.",
    },
    {
      number: "02",
      title: "Faça o Download",
      description: "Baixe o PDF imediatamente e tenha o material em suas mãos.",
    },
    {
      number: "03",
      title: "Aplique na Sessão",
      description: "Material pronto para usar, sem necessidade de preparo.",
    },
    {
      number: "04",
      title: "Acompanhe a Evolução",
      description: "Use as fichas de registro para monitorar o progresso.",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-16 text-white"
      style={{ background: "#082F63" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-center sm:text-3xl md:text-4xl">
          Do Improviso ao Atendimento de Excelência
        </h2>
        <p className="mt-3 text-center text-base text-white/70 sm:text-lg">
          Veja como funciona
        </p>

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-bold text-darker-blue">
                {step.number}
              </div>
              <h3 className="mt-4 font-nunito text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
