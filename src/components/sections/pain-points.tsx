export function PainPoints() {
  const points = [
    "Falta de materiais adequados para cada idade",
    "Atividades que não prendem a atenção da criança",
    "Dificuldade em manter a criança engajada na sessão",
    "Perde tempo preparando material para cada atendimento",
  ]

  return (
    <section id="pain-points" className="bg-body-bg py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-dark-blue text-center sm:text-3xl md:text-4xl">
          Você reconhece alguma destas situações?
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {points.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm"
            >
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm">
                ❌
              </span>
              <p className="text-base font-semibold text-dark-blue sm:text-lg">
                {point}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-base font-bold text-primary-blue sm:text-lg">
          Se você respondeu &quot;sim&quot; a qualquer uma delas, continue lendo...
        </p>
      </div>
    </section>
  )
}
