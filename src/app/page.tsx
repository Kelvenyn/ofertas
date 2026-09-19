import { notFound, redirect } from "next/navigation"
import { isOfferPublic } from "@/config/offers/catalog"
import { getOperationalCatalog } from "@/lib/operational-catalog"

export default async function Home() {
  const catalog = await getOperationalCatalog()
  const slug = catalog.homepageOffer
  const entry = catalog.offers[slug]
  if (!entry || !isOfferPublic(entry)) notFound()
  redirect(`/${slug}`)
}
