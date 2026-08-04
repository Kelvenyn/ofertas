import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Termos de Uso | Universo Eduk",
  description: "Termos de uso aplicáveis às ofertas digitais da Universo Eduk.",
}

export default function TermosDeUsoPage() {
  return (
    <LegalPage title="Termos de Uso">
      <LegalSection title="1. Aceitação e abrangência"><p>Ao navegar, adquirir ou acessar qualquer produto digital da Universo Eduk, você concorda com estes Termos. Eles se aplicam a todas as ofertas, materiais em PDF, arquivos complementares e conteúdos digitais disponibilizados sob a marca Universo Eduk.</p></LegalSection>
      <LegalSection title="2. Compra e acesso"><p>Os produtos são entregues em formato digital. Após a confirmação do pagamento pela plataforma de checkout, o acesso é liberado conforme as instruções apresentadas na oferta e no e-mail informado na compra. É responsabilidade do comprador informar um e-mail válido e guardar suas informações de acesso.</p></LegalSection>
      <LegalSection title="3. Licença de uso e propriedade intelectual"><p>A compra concede uma licença pessoal, limitada, não exclusiva e intransferível para uso do material adquirido. Os textos, imagens, layouts, arquivos e demais elementos continuam protegidos por direitos autorais e pertencem aos seus respectivos titulares.</p><p>Não é permitido revender, redistribuir, compartilhar arquivos em grupos ou plataformas, sublicenciar, remover créditos ou marcas, nem disponibilizar o material para terceiros sem autorização expressa.</p></LegalSection>
      <LegalSection title="4. Uso responsável"><p>Os materiais têm finalidade informativa, educativa ou criativa, conforme a oferta escolhida. Eles não substituem avaliação, orientação ou protocolos de profissionais habilitados, especialmente em contextos de saúde, educação, atendimento clínico, rotina veterinária ou decisão religiosa individual. O uso deve respeitar a legislação, o contexto profissional e as orientações aplicáveis.</p></LegalSection>
      <LegalSection title="5. Garantia e reembolso"><p>O prazo e as condições de garantia são os informados de forma clara na página da oferta no momento da compra. Para solicitar reembolso dentro do prazo divulgado, utilize os canais de suporte ou a plataforma de checkout. Eventuais atualizações do material não alteram os direitos de garantia apresentados na oferta adquirida.</p></LegalSection>
      <LegalSection title="6. Disponibilidade e atualizações"><p>Buscamos manter o acesso e os materiais disponíveis conforme anunciado. Poderemos corrigir erros, melhorar arquivos ou atualizar conteúdos quando necessário, sem reduzir o que foi expressamente incluído no plano adquirido.</p></LegalSection>
      <LegalSection title="7. Limitação de responsabilidade"><p>Não nos responsabilizamos por incompatibilidades causadas por equipamentos, programas, conexão do comprador ou uso do material em desacordo com estes Termos. Quando houver responsabilidade legal aplicável, ela será tratada nos limites da legislação brasileira e dos direitos do consumidor.</p></LegalSection>
      <LegalSection title="8. Alterações e contato"><p>Estes Termos podem ser atualizados periodicamente; a versão vigente estará nesta página. Para dúvidas sobre compra, acesso ou uso, escreva para <strong>contatouniversoeduk@gmail.com</strong>.</p></LegalSection>
    </LegalPage>
  )
}
