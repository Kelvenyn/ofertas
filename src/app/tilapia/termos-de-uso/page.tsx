import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = { title: "Termos de Uso | Projetos de Criadouros para Tilápia", description: "Termos de uso aplicáveis aos Projetos de Criadouros para Tilápia." }

export default function Page() {
  return <LegalPage title="Termos de Uso" backHref="/tilapia" backLabel="← Voltar aos projetos de Tilápia">
    <LegalSection title="1. Compra e acesso"><p>Ao adquirir os Projetos de Criadouros para Tilápia, você recebe acesso ao material digital após a confirmação do pagamento, conforme as instruções enviadas ao e-mail informado.</p></LegalSection>
    <LegalSection title="2. Licença de uso"><p>A compra concede uma licença pessoal, limitada, não exclusiva e intransferível. Não é permitido revender, redistribuir ou disponibilizar os arquivos a terceiros sem autorização expressa.</p></LegalSection>
    <LegalSection title="3. Garantia e suporte"><p>O prazo de garantia é o informado na oferta. Para reembolso, compra ou acesso, utilize o canal de suporte informado na confirmação do pedido.</p></LegalSection>
  </LegalPage>
}
