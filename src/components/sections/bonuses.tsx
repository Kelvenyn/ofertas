import Image from "next/image"

const bonuses = [
  {
    image: "asset-9",
    title: "Cartões de Reforço Positivo",
  },
  {
    image: "asset-10",
    title: "Roteiro de Sondagem Inicial",
  },
  {
    image: "asset-11",
    title: "Atividades para Enviar para Casa",
  },
  {
    image: "asset-12",
    title: "Registro de Evolução Psicopedagógica",
  },
]

export function Bonuses() {
  return (
    <section id="bonuses" className="bg-body-bg py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <h2 className="font-nunito text-2xl font-bold text-dark-blue text-center sm:text-3xl md:text-4xl">
            Bônus Exclusivos
          </h2>
          <span className="rounded-full bg-accent-coral px-3 py-1 text-xs font-bold text-white sm:text-sm">
            apenas hoje
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {bonuses.map((bonus, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border-2 border-yellow bg-white shadow-lg"
            >
              <div className="relative">
                <Image
                  src={`/images/${bonus.image}.webp`}
                  alt={bonus.title}
                  width={600}
                  height={400}
                  unoptimized
                  className="w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-lg bg-accent-coral px-3 py-1 text-xs font-bold text-white">
                  BÔNUS
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-nunito text-base font-bold text-dark-blue sm:text-lg">
                  {bonus.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-nunito text-lg font-bold text-green-cta sm:text-xl">
          Valor total: R$ 117,60 — Hoje: GRÁTIS
        </p>
      </div>
    </section>
  )
}
