import { OFFER } from "@/config/offer"

const CARD_COLORS = ["#0B7FE8", "#22C978", "#FF8A5B", "#8B5CF6"]

export function IdealParaVoce() {
  const { items } = OFFER.idealPara
  return (
    <section className="idv-section" aria-labelledby="ideal-title">
      <div className="idv-inner">
        <h2 className="idv-title" id="ideal-title">
          Ideal para você{" "}
          <span className="idv-title-accent">que…</span>
        </h2>

        <div className="idv-grid">
          {items.map((item, i) => {
            const color = CARD_COLORS[i]
            const isAlt = i % 2 === 1
            return (
              <div
                className={`idv-card ${isAlt ? "idv-card-alt" : ""}`}
                key={i}
                style={{ "--card-accent": color } as React.CSSProperties}
              >
                <div className="idv-card-icon" role="img" aria-label={item.title}>
                  <span className="idv-emoji">{item.icon}</span>
                </div>
                <h3 className="idv-card-title">{item.title}</h3>
                <p className="idv-card-desc">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
