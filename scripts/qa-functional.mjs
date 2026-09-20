#!/usr/bin/env node
import assert from "node:assert/strict"

const BASE_URL = new URL(process.env.QA_BASE_URL ?? "http://127.0.0.1:3102")
const email = process.env.QA_ADMIN_EMAIL ?? "qa@universoeduk.test"
const password = process.env.QA_ADMIN_PASSWORD ?? "local-qa-only-password-924"
const failures = []

async function request(path, options) {
  return fetch(new URL(path, BASE_URL), { redirect: "manual", ...options })
}

async function check(name, action) {
  try { await action() } catch (error) { failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`) }
}

await check("painel protegido", async () => {
  const response = await request("/painel")
  assert.equal(response.status, 307)
  assert.match(response.headers.get("location") ?? "", /^\/painel\/login/)
})

await check("APIs protegidas", async () => {
  const response = await request("/api/painel/offers/psicopedagogia")
  assert.equal(response.status, 401)
  const assets = await request("/api/painel/offers/psicopedagogia/assets", { method: "POST" })
  assert.equal(assets.status, 401)
})

await check("login rejeita credenciais incorretas", async () => {
  const response = await request("/api/painel/login", {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password: `${password}-errada` }),
  })
  assert.equal(response.status, 401)
})

const login = await request("/api/painel/login", {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ email, password, next: "//example.org" }),
})
assert.equal(login.status, 200, "credenciais de QA devem autenticar a sessão local")
const loginBody = await login.json()
assert.equal(loginBody.next, "/painel", "login não deve aceitar redirecionamento externo")
const cookie = login.headers.getSetCookie().map((line) => line.split(";", 1)[0]).join("; ")
assert.ok(cookie, "cookie de sessão ausente")
const auth = { Cookie: cookie }

await check("editor e preview autenticados", async () => {
  for (const route of ["/painel", "/painel/psicopedagogia", "/psicopedagogia/preview", "/psicopedagogia/paleta"]) {
    const response = await request(route, { headers: auth })
    assert.equal(response.status, 200, `${route} não abriu`)
    const html = await response.text()
    if (route.startsWith("/painel")) assert.match(html, /EDIÇÃO DE OFERTA|Ofertas/i)
  }
})

await check("slug ausente responde com 404 personalizado", async () => {
  const response = await request("/rota-que-nao-existe")
  assert.equal(response.status, 404)
  const html = await response.text()
  assert.match(html, /Esta página não está disponível/)
  assert.ok(
    html.includes('href="/lembrancinhas"') || html.includes('\\"href\\":\\"/lembrancinhas\\"'),
    "o botão do 404 deve levar a uma oferta ativa",
  )
})

await check("API carrega configuração e gera paletas", async () => {
  const get = await request("/api/painel/offers/psicopedagogia", { headers: auth })
  assert.equal(get.status, 200)
  const config = await get.json()
  assert.equal(config.offer.faq.items.length, 5)
  assert.equal(config.offer.paletteCandidates.length, 10)
  assert.equal(config.slug, "psicopedagogia")
  assert.equal(config.status, "active")
  assert.equal(config.checkout.count, 2)
  assert.equal(config.checkout.valid, true)

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const generated = await request("/api/painel/offers/psicopedagogia", {
      method: "POST", headers: { ...auth, "content-type": "application/json" },
      body: JSON.stringify({ action: "generate-palettes" }),
    })
    assert.equal(generated.status, 200)
    const palettes = (await generated.json()).paletteCandidates
    assert.equal(palettes.length, 10)
    assert.equal(new Set(palettes.map((palette) => palette.brand)).size, 10)
  }
})

await check("PATCH rejeita status inválido e slugs em conflito", async () => {
  for (const patch of [{ status: "paused" }, { slug: "painel" }, { slug: "box" }]) {
    const response = await request("/api/painel/offers/psicopedagogia", {
      method: "PATCH", headers: { ...auth, "content-type": "application/json" },
      body: JSON.stringify(patch),
    })
    assert.equal(response.status, 400)
  }
})

await check("API bloqueia copy acima do limite", async () => {
  const get = await request("/api/painel/offers/psicopedagogia", { headers: auth })
  const config = await get.json()
  config.offer.hero.pill = "X".repeat(31)
  const response = await request("/api/painel/offers/psicopedagogia", {
    method: "PATCH", headers: { ...auth, "content-type": "application/json" },
    body: JSON.stringify({ offer: config.offer, cashflow: config.cashflow, favicon: config.favicon }),
  })
  assert.equal(response.status, 400)
  assert.match((await response.json()).error, /Hero: pill/)
})

await check("logout encerra a sessão", async () => {
  const response = await request("/api/painel/logout", { method: "POST", headers: auth })
  assert.equal(response.status, 200)
  const after = await request("/api/painel/offers/psicopedagogia")
  assert.equal(after.status, 401)
})

const report = { checks: 9, status: failures.length ? "failed" : "passed", failures }
console.log(JSON.stringify(report, null, 2))
assert.deepEqual(failures, [], "QA funcional encontrou problemas")
