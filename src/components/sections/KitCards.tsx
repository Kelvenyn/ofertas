import Image from "next/image"
import { OFFER } from "@/config/offer"

export function KitCards() {
  const { heading1, heading2, images } = OFFER.kitCards
  const headingLines = heading2.split('\n')
  return (
    <div className="bloco-categoria-interpretacao">
      <div className="bloco-categoria-inner">
        <div className="cat-topo-interpretacao">
          <div className="cat-titulo-interpretacao">
            <span className="cat-numero-destaque">{heading1}</span>
            <span className="cat-linha-titulo">{headingLines[0]}<br />{headingLines[1]}</span>
          </div>
        </div>

        <div className="esteira-interpretacao-wrap">
          <div className="esteira-interpretacao">
            <div className="esteira-interpretacao-track">
              {[...images, ...images].map((img, i) => (
                <div className="esteira-interpretacao-img" key={i}>
                  <Image src={img.src} alt={img.alt} width={200} height={280} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
