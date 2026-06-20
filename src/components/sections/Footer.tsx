import { OFFER } from "@/config/offer"

export function Footer() {
  const { updateTitle, updateBody, copyright, privacyUrl, termsUrl } = OFFER.footer
  return (
    <>
      <div className="pei-promo-wrap">
        <div className="pei-promo-inner">
          <h3>{updateTitle}</h3>
          <p>{updateBody}</p>
        </div>
      </div>

      <div className="footer-mission">
        <div className="footer-mission-inner">
          <p>
            Prepare encontros de Crisma mais bonitos e significativos com lembrancinhas de Fé e Propósito. Cada modelo é pensado para ser impresso em casa, sem complicação, sem precisar de materiais extras.
          </p>
        </div>
      </div>

      <footer className="edu-toast-wrap" role="contentinfo">
        <p className="footer-copyright">{copyright}</p>
        <div className="footer-links">
          <a href={privacyUrl} className="footer-link">Política de Privacidade</a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a href={termsUrl} className="footer-link">Termos de Uso</a>
        </div>
      </footer>
    </>
  )
}
