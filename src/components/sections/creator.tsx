import Image from "next/image"

export function Creator() {
  return (
    <section id="creator" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
          <div className="flex-shrink-0">
            <Image
              src="/images/asset-19.webp"
              alt="Laura Martins"
              width={300}
              height={300}
              unoptimized
              className="h-auto w-56 rounded-2xl object-cover shadow-lg sm:w-64"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="font-nunito text-2xl font-bold text-dark-blue sm:text-3xl md:text-4xl">
              Conheça a Criadora
            </h2>
            <p className="mt-2 text-sm font-semibold text-primary-blue">
              Laura Martins — Psicopedagoga (CRP: XX/XXXXX)
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-gray">
              Com mais de 10 anos de experiência em atendimento psicopedagógico
              infantil, Laura Martins desenvolveu o NeuroAtividades Kids para
              ajudar profissionais como você a terem acesso a materiais de
              qualidade sem precisar passar horas preparando atividades.
            </p>
            <blockquote className="mt-6 border-l-4 border-primary-blue bg-body-bg rounded-r-xl p-5 text-left">
              <p className="text-base italic text-dark-blue">
                &quot;Criei este material para que cada psicopedagoga possa
                focar no que realmente importa: a evolução da criança. Saber
                que meu trabalho ajuda tantas profissionais me enche de
                orgulho.&quot;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
