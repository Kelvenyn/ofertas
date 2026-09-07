import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Política de Privacidade | Projetos de Criadouros para Tilápia",
  description: "Política de privacidade aplicável aos Projetos de Criadouros para Tilápia.",
}

export default function TilapiaPrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade" backHref="/tilapia" backLabel="← Voltar aos projetos de Tilápia">
      <LegalSection title="1. Escopo"><p>Esta Política explica como são tratados dados pessoais na página e na compra dos Projetos de Criadouros para Tilápia.</p></LegalSection>
      <LegalSection title="2. Dados tratados"><p>Podemos tratar dados fornecidos na compra, como nome e e-mail, e dados técnicos de navegação, como endereço IP, dispositivo, navegador, páginas acessadas, cookies e parâmetros de campanha. O pagamento é processado pela plataforma de checkout; não armazenamos dados completos de cartão ou senha.</p></LegalSection>
      <LegalSection title="3. Finalidades"><ul><li>Processar a compra e liberar o acesso ao material digital;</li><li>Enviar comunicações necessárias sobre pedido, acesso e suporte;</li><li>Manter a segurança e o funcionamento da página;</li><li>Medir visitas e a origem de campanhas;</li><li>Cumprir obrigações legais, fiscais e regulatórias.</li></ul></LegalSection>
      <LegalSection title="4. Compartilhamento"><p>Dados podem ser compartilhados apenas com fornecedores necessários para pagamento, entrega, hospedagem, atendimento, segurança e medição de desempenho, sempre para as finalidades descritas. Não vendemos nem alugamos dados pessoais.</p></LegalSection>
      <LegalSection title="5. Cookies e tecnologias semelhantes"><p>Usamos cookies, parâmetros de campanha e identificadores técnicos para medir visitas, compreender a origem de acessos e manter o funcionamento da página. Você pode gerenciar cookies nas configurações do navegador; algumas funções podem ser afetadas.</p></LegalSection>
      <LegalSection title="6. Seus direitos"><p>Nos termos da LGPD, você pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade quando aplicável, informação sobre compartilhamentos e revogação do consentimento.</p></LegalSection>
      <LegalSection title="7. Alterações e contato"><p>Esta Política pode ser atualizada para refletir mudanças nos serviços ou na legislação. Para solicitações relacionadas à compra ou aos seus dados, utilize o canal de suporte informado na confirmação do pedido.</p></LegalSection>
    </LegalPage>
  )
}
