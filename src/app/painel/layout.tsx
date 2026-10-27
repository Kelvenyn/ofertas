import { redirect } from "next/navigation"
import { hubPagesUrl } from "@/lib/hub-pages"

export const dynamic = "force-dynamic"

/** With the hub switched on (HUB_PAGES_URL), the pages are managed in the hub's "Páginas" tab. */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const hub = hubPagesUrl()
  if (hub) redirect(`${hub}/ofertas/paginas`)
  return children
}
