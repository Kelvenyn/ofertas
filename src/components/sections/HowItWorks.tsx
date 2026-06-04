export function HowItWorks() {
  const steps = [
    { num: "01", title: "Escolha a Atividade", desc: "Navegue pelo material organizado por faixa etária e habilidade. Encontre a atividade ideal para cada criança." },
    { num: "02", title: "Faça o Download", desc: "Baixe os PDFs imediatamente após a compra. Tudo pronto para imprimir, sem espera." },
    { num: "03", title: "Aplique na Sessão", desc: "Utilize as atividades lúdicas nos seus atendimentos. Materiais testados que engajam as crianças." },
    { num: "04", title: "Acompanhe a Evolução", desc: "Use as fichas de registro para monitorar o progresso e compartilhar com pais e escola." },
  ]

  return (
    <section className="bg-[#082F63] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-center mb-4">
          Do improviso para um atendimento mais leve, organizado e intencional
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Veja como funciona
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#0B7FE8]/30" />
              )}
              <div className="w-16 h-16 rounded-full bg-white text-[#0B7FE8] flex items-center justify-center font-nunito font-extrabold text-xl mx-auto mb-4 relative z-10">
                {step.num}
              </div>
              <h3 className="font-nunito font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
