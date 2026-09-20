import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { PanelLoginForm } from "@/components/PanelLoginForm"
import styles from "./login.module.css"

export const metadata = { title: "Entrar | Painel Universo Eduk" }

export default async function PanelLoginPage() {
  if (await isAdminAuthenticated()) redirect("/painel")
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>UNIVERSO EDUK</p>
        <h1>Gerencie suas ofertas</h1>
        <p>Edite cores, imagens, conteúdo e publicação das suas páginas.</p>
      </section>
      <section className={styles.panel} aria-labelledby="login-title">
        <div className={styles.formWrap}>
          <p className={styles.eyebrow}>ACESSO RESTRITO</p>
          <h2 id="login-title">Entrar no painel</h2>
          <p className={styles.description}>Use as credenciais administrativas para continuar.</p>
          <PanelLoginForm />
        </div>
      </section>
    </main>
  )
}
