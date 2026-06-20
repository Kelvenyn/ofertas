import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidade | Lembrancinhas para Crisma",
  description: "Política de privacidade e proteção de dados pessoais conforme a LGPD (Lei 13.709/2018).",
}

export default function PoliticaDePrivacidadePage() {
  return (
    <div style={{ background: "var(--bg, #FFF8E8)", minHeight: "100vh", padding: "60px 16px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Manrope', sans-serif", color: "var(--text, #333)" }}>

        <Link
          href="/lembrancinhas"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand, #0A1F44)", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}
        >
          ← Voltar para a página
        </Link>

        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: "var(--brand-ink, #061226)", marginBottom: 8, lineHeight: 1.15 }}>
          Política de Privacidade
        </h1>
        <p style={{ color: "var(--text-muted, #6B6B6B)", marginBottom: 40, fontSize: 14 }}>
          Última atualização: junho de 2026
        </p>

        <Section title="1. Identificação do Responsável">
          <p>
            Esta Política de Privacidade é aplicável ao site <strong>universoeduk.com</strong> e aos produtos
            digitais comercializados sob a marca <strong>Universo Eduk</strong>, operados por pessoa física
            com e-mail de contato: <strong>contatouniversoeduk@gmail.com</strong>.
          </p>
        </Section>

        <Section title="2. Dados Pessoais Coletados">
          <p>Coletamos os seguintes dados pessoais:</p>
          <ul>
            <li><strong>Dados de identificação:</strong> nome completo e endereço de e-mail fornecidos no momento da compra pela plataforma Hotmart.</li>
            <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, navegador, páginas visitadas e tempo de permanência, coletados automaticamente por ferramentas de análise.</li>
            <li><strong>Dados de rastreamento de marketing:</strong> identificadores de sessão e parâmetros UTM, coletados pelo Meta Pixel (Facebook) e pelo Utmify para mensuração de campanhas.</li>
          </ul>
        </Section>

        <Section title="3. Finalidade do Tratamento">
          <p>Os dados são tratados para as seguintes finalidades:</p>
          <ul>
            <li>Processamento e entrega do produto digital adquirido;</li>
            <li>Envio de comunicações relacionadas ao pedido (confirmação de compra, acesso ao material);</li>
            <li>Melhoria da experiência de navegação no site;</li>
            <li>Mensuração da eficácia de campanhas de marketing digital;</li>
            <li>Cumprimento de obrigações legais e fiscais.</li>
          </ul>
        </Section>

        <Section title="4. Base Legal (LGPD)">
          <p>O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na Lei 13.709/2018 (LGPD):</p>
          <ul>
            <li><strong>Execução de contrato</strong> (Art. 7º, V): para processar a compra e entregar o produto;</li>
            <li><strong>Legítimo interesse</strong> (Art. 7º, IX): para análise de navegação e melhoria do site;</li>
            <li><strong>Consentimento</strong> (Art. 7º, I): para o uso de pixels de rastreamento de marketing (que podem ser recusados via configurações do navegador).</li>
          </ul>
        </Section>

        <Section title="5. Compartilhamento de Dados">
          <p>Seus dados podem ser compartilhados com os seguintes terceiros, exclusivamente para as finalidades descritas:</p>
          <ul>
            <li><strong>Hotmart:</strong> plataforma de processamento de pagamentos e entrega do produto digital;</li>
            <li><strong>Meta Platforms (Facebook):</strong> ferramenta de mensuração de anúncios (Meta Pixel);</li>
            <li><strong>Utmify:</strong> ferramenta de rastreamento de fontes de tráfego.</li>
          </ul>
          <p>Não vendemos, alugamos ou cedemos seus dados a terceiros para fins comerciais.</p>
        </Section>

        <Section title="6. Retenção de Dados">
          <p>
            Os dados de compra são mantidos pelo tempo necessário ao cumprimento de obrigações fiscais e legais
            (mínimo de 5 anos, conforme legislação tributária). Dados de navegação coletados por ferramentas de
            análise são retidos conforme a política de cada ferramenta (geralmente 26 meses).
          </p>
        </Section>

        <Section title="7. Seus Direitos como Titular">
          <p>Conforme a LGPD, você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento de seus dados;</li>
            <li>Acessar seus dados pessoais;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Solicitar a portabilidade dos dados;</li>
            <li>Revogar o consentimento, quando aplicável.</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato pelo e-mail: <strong>contatouniversoeduk@gmail.com</strong>. Atendemos em até 15 dias úteis.</p>
        </Section>

        <Section title="8. Cookies e Tecnologias de Rastreamento">
          <p>
            Utilizamos cookies e pixels de rastreamento para analisar o tráfego e mensurar o desempenho de campanhas.
            Você pode desativar cookies nas configurações do seu navegador. Note que desativá-los pode afetar a
            funcionalidade de algumas áreas do site.
          </p>
        </Section>

        <Section title="9. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado,
            perda ou destruição. As transações financeiras são processadas integralmente pela Hotmart, que possui
            certificação PCI-DSS.
          </p>
        </Section>

        <Section title="10. Alterações nesta Política">
          <p>
            Esta política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas por e-mail
            aos compradores ativos. A data da última atualização está indicada no topo desta página.
          </p>
        </Section>

        <Section title="11. Contato">
          <p>
            Dúvidas sobre esta política ou sobre o tratamento dos seus dados pessoais:<br />
            <strong>E-mail:</strong> contatouniversoeduk@gmail.com
          </p>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 900, color: "var(--brand, #0A1F44)", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--text-muted, #6B6B6B)" }}>
        {children}
      </div>
    </section>
  )
}
