import Image from "next/image"

export function Guarantee() {
  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-4xl mx-auto px-4 flex md:flex-row flex-col items-center gap-8">
        <Image
          src="/images/asset-23.webp"
          alt="Garantia de 7 dias"
          width={200}
          height={200}
          unoptimized
          className="w-48 h-auto"
        />
        <div>
          <h2 className="font-nunito text-3xl font-extrabold text-[#123A6D] mb-4">
            Compre com tranquilidade: você tem 7 dias de garantia
          </h2>
          <p className="text-[#425466] text-sm leading-relaxed">
            Se por qualquer motivo você não ficar satisfeito com o NeuroAtividades Kids,
            devolvemos 100% do seu dinheiro. Sem burocracia, sem perguntas.
            Você tem 7 dias de garantia incondicional a partir da data da compra.
          </p>
        </div>
      </div>
    </section>
  )
}
