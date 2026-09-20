import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { getOperationalCatalog } from "@/lib/operational-catalog"

export default async function Home() {
  const host = (await headers()).get("host")?.split(":", 1)[0].toLowerCase()
  if (host === "universoeduk.com" || host === "www.universoeduk.com") redirect("/painel")

  const catalog = await getOperationalCatalog()
  const slug = catalog.homepageOffer
  const entry = catalog.offers[slug]
  if (!entry) notFound()
  redirect(`/${slug}`)
}
