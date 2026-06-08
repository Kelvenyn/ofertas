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
            O Pixel Art Bíblico foi criado com um propósito simples: ajudar mães cristãs a ocupar seus filhos com atividades saudáveis, longe das telas, enquanto ensina valores bíblicos de forma divertida e acessível. Cada arte é pensada para ser impressa em casa, sem complicação, sem precisar de materiais extras.
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
