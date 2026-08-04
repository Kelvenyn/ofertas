import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Política de Privacidade | Universo Eduk",
  description: "Política de privacidade aplicável às ofertas digitais da Universo Eduk.",
}

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade">
      <LegalSection title="1. Escopo"><p>Esta Política explica como a Universo Eduk trata dados pessoais nos seus sites e nas suas ofertas de produtos digitais, incluindo materiais educativos, criativos e de consulta. Ela se aplica a todas as páginas de oferta publicadas sob a marca Universo Eduk.</p></LegalSection>
      <LegalSection title="2. Dados que podem ser tratados"><p>Podemos tratar dados fornecidos por você na compra, como nome e e-mail, além de dados técnicos de navegação, como endereço IP, dispositivo, navegador, páginas acessadas e identificadores de sessão. Os pagamentos são processados pela plataforma de checkout; não armazenamos dados completos de cartão ou senha de pagamento.</p></LegalSection>
      <LegalSection title="3. Finalidades"><ul><li>Processar a compra e liberar o acesso ao produto digital;</li><li>Enviar comunicações necessárias sobre pedido, acesso e suporte;</li><li>Manter a segurança e o funcionamento dos sites;</li><li>Entender o desempenho das páginas e das campanhas;</li><li>Cumprir obrigações legais, fiscais e regulatórias.</li></ul></LegalSection>
      <LegalSection title="4. Bases legais e compartilhamento"><p>O tratamento ocorre conforme as hipóteses previstas na LGPD, especialmente execução de contrato, cumprimento de obrigação legal, legítimo interesse e consentimento, quando aplicável. Dados podem ser compartilhados somente com fornecedores necessários para pagamento, entrega, hospedagem, atendimento, segurança e medição de desempenho, sempre dentro dessas finalidades.</p><p>Não vendemos nem alugamos dados pessoais.</p></LegalSection>
      <LegalSection title="5. Cookies e tecnologias semelhantes"><p>Podemos usar cookies, parâmetros de campanha e identificadores técnicos para lembrar preferências, medir visitas e compreender a origem de acessos. Você pode gerenciar ou bloquear cookies nas configurações do navegador; algumas funções podem ser afetadas por essa escolha.</p></LegalSection>
      <LegalSection title="6. Retenção e segurança"><p>Os dados são mantidos pelo período necessário para as finalidades descritas e para o cumprimento de obrigações legais. Adotamos medidas técnicas e organizacionais razoáveis para reduzir riscos de acesso não autorizado, perda ou uso indevido.</p></LegalSection>
      <LegalSection title="7. Seus direitos"><p>Nos termos da LGPD, você pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade quando aplicável, informação sobre compartilhamentos e revogação do consentimento.</p></LegalSection>
      <LegalSection title="8. Contato e alterações"><p>Para dúvidas ou solicitações sobre dados pessoais, escreva para <strong>contatouniversoeduk@gmail.com</strong>. Esta Política pode ser atualizada para refletir mudanças nos serviços ou na legislação; a versão vigente será sempre a publicada nesta página.</p></LegalSection>
    </LegalPage>
  )
}
