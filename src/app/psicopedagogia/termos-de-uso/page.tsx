import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = { title: "Termos de Uso | Mapa de Perfil Infantil", description: "Termos de uso aplicáveis ao Mapa de Perfil Infantil." }

export default function Page() {
  return <LegalPage title="Termos de Uso" backHref="/psicopedagogia" backLabel="← Voltar ao Mapa de Perfil Infantil">
    <LegalSection title="1. Compra e acesso"><p>Ao adquirir o Mapa de Perfil Infantil, você recebe acesso ao material digital após a confirmação do pagamento, conforme as instruções enviadas ao e-mail informado.</p></LegalSection>
    <LegalSection title="2. Licença de uso"><p>A compra concede uma licença pessoal, limitada, não exclusiva e intransferível. Não é permitido revender, redistribuir ou disponibilizar os arquivos a terceiros sem autorização expressa.</p></LegalSection>
    <LegalSection title="3. Uso, garantia e suporte"><p>O material tem finalidade educativa e informativa e não substitui avaliação profissional. O prazo de garantia é o informado na oferta. Para reembolso, compra ou acesso, utilize o canal de suporte informado na confirmação do pedido.</p></LegalSection>
  </LegalPage>
}
