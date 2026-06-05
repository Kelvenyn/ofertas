import { OFFER } from "@/config/offer"

export function IdealParaVoce() {
  const { items } = OFFER.idealPara
  return (
    <section className="idv-section">
      <div className="idv-inner">
        <h2 className="idv-title">
          Ideal para você{" "}
          <span className="idv-title-accent">que…</span>
        </h2>

        <div className="idv-grid">
          {items.map((item, i) => (
            <div className="idv-card" key={i}>
              <div className="idv-card-icon">{item.icon}</div>
              <h3 className="idv-card-title">{item.title}</h3>
              <p className="idv-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
