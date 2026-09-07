import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Termos de Uso | Projetos de Criadouros para Tilápia",
  description: "Termos de uso aplicáveis aos Projetos de Criadouros para Tilápia.",
}

export default function TilapiaTermsPage() {
  return (
    <LegalPage title="Termos de Uso" backHref="/tilapia" backLabel="← Voltar aos projetos de Tilápia">
      <LegalSection title="1. Aceitação e abrangência"><p>Ao navegar, adquirir ou acessar os Projetos de Criadouros para Tilápia, você concorda com estes Termos.</p></LegalSection>
      <LegalSection title="2. Compra e acesso"><p>O produto é digital. Após a confirmação do pagamento pela plataforma de checkout, o acesso é liberado conforme as instruções apresentadas na oferta e no e-mail informado na compra. É responsabilidade do comprador informar um e-mail válido e guardar suas informações de acesso.</p></LegalSection>
      <LegalSection title="3. Licença de uso e propriedade intelectual"><p>A compra concede uma licença pessoal, limitada, não exclusiva e intransferível para uso do material adquirido. Os textos, imagens, layouts e arquivos permanecem protegidos por direitos autorais e pertencem aos seus respectivos titulares.</p><p>Não é permitido revender, redistribuir, compartilhar arquivos em grupos ou plataformas, sublicenciar ou disponibilizar o material para terceiros sem autorização expressa.</p></LegalSection>
      <LegalSection title="4. Uso responsável"><p>Os projetos são materiais informativos e de planejamento. O uso deve respeitar a legislação, as condições do local, práticas de segurança e, quando necessário, a orientação de profissionais habilitados.</p></LegalSection>
      <LegalSection title="5. Garantia e reembolso"><p>O prazo e as condições de garantia são os informados claramente na página da oferta. Para solicitar reembolso dentro do prazo divulgado, utilize os canais de suporte ou a plataforma de checkout.</p></LegalSection>
      <LegalSection title="6. Alterações e contato"><p>Estes Termos podem ser atualizados periodicamente. Para dúvidas sobre compra, acesso ou uso, utilize o canal de suporte informado na confirmação do pedido.</p></LegalSection>
    </LegalPage>
  )
}
