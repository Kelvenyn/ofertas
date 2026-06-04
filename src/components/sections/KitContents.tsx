import Image from "next/image"

const categories = [
  { title: "Interpretação de Texto", image: "/images/asset-2.webp" },
  { title: "Coordenação Motora Fina", image: "/images/asset-7.webp" },
  { title: "Atenção e Foco", image: "/images/asset-2.webp" },
  { title: "Raciocínio Lógico", image: "/images/asset-3.webp" },
  { title: "Memória das Figuras", image: "/images/asset-4.webp" },
  { title: "Leitura e Escrita", image: "/images/asset-5.webp" },
  { title: "Sílabas em Ação", image: "/images/asset-6.webp" },
  { title: "Atividades para Casa", image: "/images/asset-8.webp" },
]

export function KitContents() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-4">
          Veja o que você recebe no NeuroAtividades Kids
        </h2>
        <p className="text-[#425466] text-center mb-12 max-w-2xl mx-auto">
          Mais de 250 atividades psicopedagógicas organizadas por categoria e faixa etária
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-[#F3F8FF]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={300}
                  height={300}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-nunito font-bold text-sm md:text-base text-[#123A6D]">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 font-nunito font-bold text-[#0B7FE8] text-xl">
          E MUITO MAIS! +250 atividades no total
        </p>
      </div>
    </section>
  )
}
