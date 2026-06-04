import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-14"
      style={{
        background: "linear-gradient(135deg, #082F63 0%, #0B7FE8 100%)",
      }}
    >
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-white/20 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-accent-coral/40 animate-pulse" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-nunito text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Transforme seus Atendimentos com Atividades Psicopedagógicas Prontas
            </h1>
            <p className="mt-4 text-base text-white/80 sm:text-lg md:mt-6 md:text-xl">
              +250 atividades lúdicas e fichas de aplicação para crianças de 3 a 12 anos
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6 md:mt-10">
              <Link
                href="#pricing"
                className="inline-block rounded-xl px-8 py-4 text-center text-base font-bold text-white shadow-lg transition-all hover:scale-105 sm:text-lg"
                style={{
                  background: "linear-gradient(#22C978 0%, #00B368 100%)",
                }}
              >
                QUERO MEU ACESSO
              </Link>
            </div>

            <p className="mt-3 text-xs text-white/70 sm:text-sm">
              🔒 Compra 100% segura • Acesso imediato • Menores preços
            </p>
          </div>

          <div className="flex-shrink-0">
            <Image
              src="/images/asset-0.webp"
              alt="NeuroAtividades Kids"
              width={390}
              height={487}
              unoptimized
              className="h-auto w-72 sm:w-80 md:w-96"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
