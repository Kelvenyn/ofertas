const testimonials = [
  { name: "Carla M.", role: "Psicopedagoga", text: "Finalmente um material completo! Uso com todos meus pacientes e eles amam." },
  { name: "Juliana S.", role: "Psicopedagoga", text: "Economizo horas de preparo por semana. Valeu cada centavo!" },
  { name: "Renata O.", role: "Mãe atípica", text: "Minha filha tem TDAH e as atividades de atenção são incríveis." },
  { name: "Dra. Patrícia L.", role: "Neuropedagoga", text: "Uso no consultório e recomendo para envio para casa. Nota 10!" },
  { name: "Amanda F.", role: "Psicopedagoga", text: "As crianças amam! O material é lúdico e muito bem elaborado." },
]

export function SocialProof() {
  return (
    <section className="bg-[#F3F8FF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-4">
          Profissionais que já começaram a usar o NeuroAtividades Kids
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl shadow-sm p-6 min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0"
            >
              <div className="flex text-yellow-400 mb-3">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-[#425466] text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-bold text-[#123A6D] text-sm">{t.name}</p>
                <p className="text-[#5B6B7B] text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 text-center">
          <div>
            <div className="font-nunito text-2xl md:text-3xl font-extrabold text-[#0B7FE8]">+2.500</div>
            <div className="text-sm text-[#425466]">Psicopedagogas</div>
          </div>
          <div>
            <div className="font-nunito text-2xl md:text-3xl font-extrabold text-[#0B7FE8]">98%</div>
            <div className="text-sm text-[#425466]">Satisfação</div>
          </div>
          <div>
            <div className="font-nunito text-2xl md:text-3xl font-extrabold text-[#0B7FE8]">+50.000</div>
            <div className="text-sm text-[#425466]">Atividades baixadas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
