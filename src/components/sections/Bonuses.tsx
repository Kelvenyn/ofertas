import Image from "next/image"

const bonuses = [
  { title: "Cartões de Reforço Positivo", image: "/images/asset-9.webp", value: "R$27" },
  { title: "Roteiro de Sondagem Inicial", image: "/images/asset-10.webp", value: "R$37" },
  { title: "Atividades para Enviar para Casa", image: "/images/asset-11.webp", value: "R$27" },
  { title: "Registro de Evolução Psicopedagógica", image: "/images/asset-12.webp", value: "R$27" },
]

export function Bonuses() {
  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] mb-2">
            Bônus Exclusivos
          </h2>
          <span className="inline-block bg-[#FF8A5B] text-white text-sm font-bold px-4 py-1 rounded-full">
            apenas hoje
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {bonuses.map((bonus) => (
            <div
              key={bonus.title}
              className="bg-white rounded-2xl border-2 border-[#FFD166] shadow-lg overflow-hidden flex md:flex-row flex-col"
            >
              <div className="md:w-48 h-48 bg-[#F3F8FF] flex-shrink-0">
                <Image
                  src={bonus.image}
                  alt={bonus.title}
                  width={200}
                  height={200}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-xs font-bold text-white bg-[#FF8A5B] px-2 py-0.5 rounded-full inline-block w-fit mb-2">
                  BÔNUS
                </span>
                <h3 className="font-nunito font-bold text-lg text-[#123A6D]">{bonus.title}</h3>
                <p className="text-[#425466] text-sm mt-1">Valor: {bonus.value}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 font-bold text-[#0BB869] text-lg">
          Valor total dos bônus: R$ 117,60 — Hoje: GRÁTIS
        </p>
      </div>
    </section>
  )
}
