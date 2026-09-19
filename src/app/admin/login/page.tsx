import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { LoginForm } from "./LoginForm"
import styles from "./login.module.css"

export const metadata = { title: "Entrar | Administração Universo Eduk" }

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin/ofertas")

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>UNIVERSO EDUK</p>
        <h1>Administração de ofertas</h1>
        <p>Gerencie o status de publicação e as paletas das suas páginas em um só lugar.</p>
      </section>
      <section className={styles.panel} aria-labelledby="login-title">
        <div className={styles.formWrap}>
          <p className={styles.eyebrow}>ACESSO RESTRITO</p>
          <h2 id="login-title">Entrar no painel</h2>
          <p className={styles.description}>Use as credenciais administrativas para continuar.</p>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
