"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function CountdownTimer({ initial }: { initial: number }) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    if (time <= 0) return;
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [time]);

  return <span className="font-mono">{formatTime(time)}</span>;
}

export default function Hero() {
  return (
    <>
      <div className="bg-[#0B7FE8] text-center text-white text-sm md:text-base font-bold py-2 px-4">
        ⚡ ATENÇÃO: Acesso promocional disponível HOJE! ⚡{" "}
        <CountdownTimer initial={23 * 3600 + 59 * 60 + 59} />
      </div>

      <section className="bg-gradient-to-b from-[#082F63] via-[#0B7FE8] to-[#49A6FF] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left space-y-8">
            <h1 className="font-nunito text-3xl md:text-5xl font-extrabold leading-tight whitespace-pre-line">
              {"+250 atividades prontas\npara atendimentos\nPsicopedagógicos infantis"}
            </h1>

            <a
              href="#oferta"
              className="inline-block bg-gradient-to-b from-[#22C978] to-[#00B368] text-white font-bold px-8 py-4 rounded-xl text-lg md:text-xl shadow-lg hover:brightness-110 transition-all"
            >
              QUERO ACESSAR O KIT AGORA
            </a>

            <p className="text-white/60 text-sm">
              🔒 Compra 100% segura • Acesso imediato
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/asset-0.webp"
              alt="Kit de Atividades Psicopedagógicas"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto drop-shadow-2xl"
              unoptimized
            />
          </div>
        </div>
      </section>

      <div className="bg-white/10 backdrop-blur border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center text-white">
          <div>
            <p className="font-nunito font-extrabold text-2xl md:text-3xl">
              +250
            </p>
            <p className="text-sm md:text-base text-white/70">Atividades</p>
          </div>
          <div>
            <p className="font-nunito font-extrabold text-2xl md:text-3xl">
              +2.500
            </p>
            <p className="text-sm md:text-base text-white/70">Profissionais</p>
          </div>
          <div>
            <p className="font-nunito font-extrabold text-2xl md:text-3xl">
              98%
            </p>
            <p className="text-sm md:text-base text-white/70">Satisfação</p>
          </div>
        </div>
      </div>
    </>
  );
}
