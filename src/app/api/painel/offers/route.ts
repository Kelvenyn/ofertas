import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { createOperationalOffer, OPERATIONAL_CATALOG_CACHE_TAG } from "@/lib/operational-catalog"
import { getOfferRevalidationPaths } from "@/lib/offer-routing"
import { handleOfferCreateRequest } from "@/lib/panel-offer-create"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const result = await handleOfferCreateRequest(request, {
    isAdminAuthenticated,
    createOperationalOffer,
    revalidateOffer: (slug) => {
      revalidateTag(OPERATIONAL_CATALOG_CACHE_TAG, { expire: 0 })
      for (const path of getOfferRevalidationPaths(slug, slug)) revalidatePath(path)
    },
  })
  return NextResponse.json(result.body, { status: result.status })
}
