import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = { title: "Política de Privacidade | Mapa de Perfil Infantil", description: "Política de privacidade aplicável ao Mapa de Perfil Infantil." }

export default function Page() {
  return <LegalPage title="Política de Privacidade" backHref="/psicopedagogia" backLabel="← Voltar ao Mapa de Perfil Infantil">
    <LegalSection title="1. Escopo"><p>Esta Política explica como são tratados dados pessoais na página e na compra do Mapa de Perfil Infantil.</p></LegalSection>
    <LegalSection title="2. Dados e finalidades"><p>Podemos tratar nome, e-mail e dados técnicos de navegação, como IP, dispositivo, cookies e parâmetros de campanha, para processar compras, liberar acesso, atender solicitações, manter a segurança e medir campanhas. O pagamento é processado pela plataforma de checkout; não armazenamos dados completos de cartão.</p></LegalSection>
    <LegalSection title="3. Compartilhamento e direitos"><p>Dados são compartilhados apenas com fornecedores de pagamento, entrega, hospedagem, suporte, segurança e medição. Nos termos da LGPD, você pode solicitar acesso, correção, eliminação de dados desnecessários e informações sobre o tratamento pelo canal de suporte informado na confirmação do pedido.</p></LegalSection>
  </LegalPage>
}
