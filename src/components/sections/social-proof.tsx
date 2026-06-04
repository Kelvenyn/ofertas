export function SocialProof() {
  const testimonials = [
    {
      text: "Finalmente um material completo! Uso com todos meus pacientes e eles amam.",
      author: "Carla M., Psicopedagoga",
    },
    {
      text: "Economizo horas de preparo por semana. Valeu cada centavo!",
      author: "Juliana S., Psicopedagoga",
    },
    {
      text: "Minha filha tem TDAH e as atividades de atenção são incríveis.",
      author: "Renata O., Mãe atípica",
    },
    {
      text: "Uso no consultório e recomendo para envio para casa. Nota 10!",
      author: "Dra. Patrícia L., Neuropedagoga",
    },
    {
      text: "As crianças amam! O material é lúdico e muito bem elaborado.",
      author: "Amanda F., Psicopedagoga",
    },
  ]

  return (
    <section id="social-proof" className="bg-[#F3F8FF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-dark-blue text-center sm:text-3xl md:text-4xl">
          O que estão dizendo sobre o NeuroAtividades Kids
        </h2>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-fit w-72 flex-shrink-0 snap-center rounded-xl bg-white p-6 shadow"
            >
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="mt-3 text-sm text-text-gray">&quot;{t.text}&quot;</p>
              <p className="mt-3 text-xs font-semibold text-dark-blue">
                {t.author}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow">
            <p className="font-nunito text-3xl font-bold text-primary-blue">
              +2.500
            </p>
            <p className="mt-1 text-sm text-text-gray">psicopedagogas</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow">
            <p className="font-nunito text-3xl font-bold text-green-cta">98%</p>
            <p className="mt-1 text-sm text-text-gray">satisfação</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow">
            <p className="font-nunito text-3xl font-bold text-accent-coral">
              +50.000
            </p>
            <p className="mt-1 text-sm text-text-gray">atividades baixadas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
