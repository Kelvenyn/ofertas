import Image from "next/image"

const ageGroups = [
  {
    title: "3 a 5 anos",
    desc: "Atividades sensoriais, percepção visual, coordenação motora grossa e fina, primeiras letras e números.",
    image: "/images/asset-2.webp",
    count: "+60 atividades",
  },
  {
    title: "5 a 7 anos",
    desc: "Alfabetização, raciocínio lógico, atenção seletiva, memória, consciência fonológica.",
    image: "/images/asset-3.webp",
    count: "+80 atividades",
  },
  {
    title: "7 a 10 anos",
    desc: "Interpretação textual, produção escrita, resolução de problemas, pensamento crítico, funções executivas.",
    image: "/images/asset-4.webp",
    count: "+70 atividades",
  },
  {
    title: "10 a 12 anos",
    desc: "Leitura avançada, escrita criativa, operações matemáticas, planejamento, autonomia nos estudos.",
    image: "/images/asset-5.webp",
    count: "+40 atividades",
  },
]

export function PainPoints() {
  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-12">
          Atividades organizadas por faixa etária
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ageGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white rounded-2xl shadow-sm p-6 flex gap-4 items-start hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3F8FF]">
                <Image
                  src={group.image}
                  alt={group.title}
                  width={96}
                  height={96}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-nunito font-bold text-lg text-[#123A6D]">
                    {group.title}
                  </h3>
                  <span className="text-xs bg-[#0B7FE8] text-white px-2 py-0.5 rounded-full font-semibold">
                    {group.count}
                  </span>
                </div>
                <p className="text-[#425466] text-sm leading-relaxed">
                  {group.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
