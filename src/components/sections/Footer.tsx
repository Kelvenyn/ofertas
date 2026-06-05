import { OFFER } from "@/config/offer"

export function Footer() {
  const { updateTitle, updateBody, copyright } = OFFER.footer
  return (
    <>
      <div className="pei-promo-wrap">
        <div className="pei-promo-inner">
          <h3>{updateTitle}</h3>
          <p>
            {updateBody}
          </p>
        </div>
      </div>
      <footer className="edu-toast-wrap" role="contentinfo">
        {copyright}
      </footer>
    </>
  )
}
