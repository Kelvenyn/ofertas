import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termos de Uso | Mapa de Perfil Infantil",
  description: "Termos e condições de uso do produto digital Mapa de Perfil Infantil para Psicopedagogas Iniciantes.",
}

export default function TermosDeUsoPage() {
  return (
    <div style={{ background: "var(--bg, #F5F8F0)", minHeight: "100vh", padding: "60px 16px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Manrope', sans-serif", color: "var(--text, #333)" }}>

        <Link
          href="/psicopedagogia"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand, #0D4F4F)", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}
        >
          ← Voltar para a página
        </Link>

        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: "var(--brand-ink, #062B2B)", marginBottom: 8, lineHeight: 1.15 }}>
          Termos de Uso
        </h1>
        <p style={{ color: "var(--text-muted, #6B6B6B)", marginBottom: 40, fontSize: 14 }}>
          Última atualização: junho de 2026
        </p>

        <Section title="1. Aceitação dos Termos">
          <p>
            Ao adquirir qualquer produto digital disponibilizado no site <strong>universoeduk.com</strong>,
            você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso.
            Caso não concorde com alguma condição, não realize a compra.
          </p>
        </Section>

        <Section title="2. Descrição do Produto">
          <p>
            <strong>Mapa de Perfil Infantil para Psicopedagogas Iniciantes</strong> é um produto digital composto por
            arquivos em formato PDF contendo um mapa visual de perfis infantis, atividades-guia e orientações
            para condução de sessões psicopedagógicas.
            O produto é entregue exclusivamente em formato digital, sem envio de material físico.
          </p>
          <p>
            Os arquivos são disponibilizados por e-mail e/ou plataforma Hotmart imediatamente após
            a confirmação do pagamento.
          </p>
        </Section>

        <Section title="3. Licença de Uso">
          <p>
            Ao adquirir o produto, o comprador recebe uma <strong>licença pessoal, intransferível e não exclusiva</strong>
            para uso do material. É expressamente proibido:
          </p>
          <ul>
            <li>Revender, redistribuir, sublicenciar ou ceder o produto a terceiros;</li>
            <li>Compartilhar o arquivo em grupos, plataformas de download ou redes sociais;</li>
            <li>Utilizar o material para fins comerciais além do uso pessoal (ex.: imprimir e vender fisicamente em escala);</li>
            <li>Remover ou alterar marcas d&#39;água, créditos ou informações de autoria.</li>
          </ul>
          <p>
            O uso permitido inclui: impressão para uso próprio, uso em atividades psicopedagógicas pessoais ou
            de uma única clínica/instituição onde o comprador atua.
          </p>
        </Section>

        <Section title="4. Propriedade Intelectual">
          <p>
            Todo o conteúdo do produto — incluindo textos, ilustrações, layouts e designs — é protegido
            pela Lei de Direitos Autorais (Lei nº 9.610/1998). A propriedade intelectual permanece
            integralmente com o autor. A compra não transfere qualquer direito autoral.
          </p>
        </Section>

        <Section title="5. Política de Reembolso">
          <p>
            Oferecemos <strong>garantia incondicional de 15 (quinze) dias</strong> a partir da data da compra.
            Se por qualquer motivo você não estiver satisfeito com o produto, basta solicitar o reembolso
            pelo e-mail <strong>contatouniversoeduk@gmail.com</strong> ou diretamente pela plataforma Hotmart.
            O valor será devolvido integralmente, sem perguntas.
          </p>
          <p>
            Após o prazo de 15 dias, não será possível solicitar reembolso.
          </p>
        </Section>

        <Section title="6. Limitação de Responsabilidade">
          <p>
            O produto é fornecido &quot;como está&quot;. Não nos responsabilizamos por:
          </p>
          <ul>
            <li>Problemas de impressão decorrentes de configurações do equipamento do comprador;</li>
            <li>Incompatibilidade de software para abertura dos arquivos PDF;</li>
            <li>Uso indevido do material em desacordo com estes Termos.</li>
          </ul>
          <p>
            Os arquivos são compatíveis com leitores de PDF padrão (Adobe Reader, Preview, Chrome PDF Viewer).
          </p>
        </Section>

        <Section title="7. Alterações nos Termos">
          <p>
            Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível
            nesta página, com a data de última atualização indicada no topo.
          </p>
        </Section>

        <Section title="8. Legislação Aplicável">
          <p>
            Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de domicílio
            do comprador para dirimir eventuais conflitos, conforme o Código de Defesa do Consumidor (Lei 8.078/1990).
          </p>
        </Section>

        <Section title="9. Contato">
          <p>
            Para dúvidas, sugestões ou exercício de direitos:<br />
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
      <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 900, color: "var(--brand, #0D4F4F)", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--text-muted, #6B6B6B)" }}>
        {children}
      </div>
    </section>
  )
}
