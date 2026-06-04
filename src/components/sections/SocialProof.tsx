"use client"

const testimonials = [
  { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 1" },
  { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 2" },
  { src: "/images/CR-NINJA-17.webp", alt: "Depoimento 3" },
  { src: "/images/CR-NINJA-18.webp", alt: "Depoimento 4" },
  { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 5" },
  { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 6" },
]

export function SocialProof() {
  return (
    <section className="sp-section">
      <div className="sp-inner">
        <h2 className="sp-title">O que estão dizendo</h2>
      </div>

      <div className="sp-carousel-wrap">
        <div className="sp-carousel-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div className="sp-carousel-item" key={i}>
              <img src={t.src} alt={t.alt} width={200} height={280} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
