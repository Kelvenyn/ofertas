import Image from "next/image"

export function Creator() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 flex md:flex-row flex-col items-center gap-8">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-[#F3F8FF] flex-shrink-0">
          <Image
            src="/images/asset-19.webp"
            alt="Laura Martins"
            width={200}
            height={200}
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-nunito font-extrabold text-2xl text-[#123A6D] mb-1">Laura Martins</h2>
          <p className="text-[#0B7FE8] font-semibold text-sm mb-4">Psicopedagoga (CRP: 12/34567)</p>
          <p className="text-[#425466] text-sm leading-relaxed">
            Com mais de 10 anos de experiência em psicopedagogia clínica e institucional,
            Laura desenvolveu o NeuroAtividades Kids para ajudar profissionais a terem
            sessões mais produtivas e organizadas. Seu material já é utilizado por mais
            de 2.500 psicopedagogas em todo o Brasil.
          </p>
          <blockquote className="mt-4 italic text-[#5B6B7B] border-l-4 border-[#0B7FE8] pl-4 text-sm">
            &ldquo;Criei esse material para que você não precise mais passar horas preparando
            atividades. São anos de experiência organizados em um só lugar.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
