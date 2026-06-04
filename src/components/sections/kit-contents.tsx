import Image from "next/image"

const items = [
  { image: "asset-2", title: "Jogo da Atenção" },
  { image: "asset-3", title: "Sequência Lógica" },
  { image: "asset-4", title: "Memória das Figuras" },
  { image: "asset-5", title: "Sílabas em Ação" },
  { image: "asset-6", title: "Trilha da Leitura" },
  { image: "asset-7", title: "Coordenação Motora Fina" },
  { image: "asset-8", title: "Atividades para Casa" },
]

export function KitContents() {
  return (
    <section id="kit-contents" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-nunito text-2xl font-bold text-dark-blue text-center sm:text-3xl md:text-4xl">
          Veja o que você recebe no NeuroAtividades Kids
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={`/images/${item.image}.webp`}
                  alt={item.title}
                  width={400}
                  height={400}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="p-3 text-center font-nunito text-base font-bold text-dark-blue sm:text-lg">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-nunito text-xl font-bold text-primary-blue sm:text-2xl">
          E MUITO MAIS! +250 atividades no total
        </p>
      </div>
    </section>
  )
}
