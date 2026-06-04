import Image from "next/image"

export function AccessInfo() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-12">
          Receba tudo de forma rápida e prática
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F3F8FF] rounded-2xl p-6 flex md:flex-row flex-col items-center gap-6">
            <Image src="/images/asset-20.webp" alt="Acesso via WhatsApp e E-mail" width={150} height={150} unoptimized className="rounded-xl" />
            <div>
              <h3 className="font-nunito font-bold text-lg text-[#123A6D] mb-2">Acesso via WhatsApp e E-mail</h3>
              <p className="text-[#425466] text-sm">Receba tudo no conforto do seu celular</p>
            </div>
          </div>
          <div className="bg-[#F3F8FF] rounded-2xl p-6 flex md:flex-row flex-col items-center gap-6">
            <Image src="/images/asset-21.webp" alt="Material pronto" width={150} height={150} unoptimized className="rounded-xl" />
            <div>
              <h3 className="font-nunito font-bold text-lg text-[#123A6D] mb-2">Material pronto para baixar, imprimir e aplicar</h3>
              <p className="text-[#425466] text-sm">Tudo em PDF de alta qualidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
