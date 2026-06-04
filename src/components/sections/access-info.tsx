import Image from "next/image"

export function AccessInfo() {
  return (
    <section id="access-info" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl bg-body-bg p-8 text-center">
            <Image
              src="/images/asset-20.webp"
              alt="Acesso via WhatsApp"
              width={300}
              height={200}
              unoptimized
              className="mb-4 h-auto w-48 object-contain"
            />
            <p className="text-base font-semibold text-dark-blue sm:text-lg">
              Acesso via WhatsApp e E-mail — Receba tudo no conforto do seu celular
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl bg-body-bg p-8 text-center">
            <Image
              src="/images/asset-21.webp"
              alt="Material para imprimir"
              width={300}
              height={200}
              unoptimized
              className="mb-4 h-auto w-48 object-contain"
            />
            <p className="text-base font-semibold text-dark-blue sm:text-lg">
              Material pronto para baixar, imprimir e aplicar
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
