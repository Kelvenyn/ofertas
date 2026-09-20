#!/usr/bin/env node
import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { access, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import http from "node:http"
import net from "node:net"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const VIEWPORTS = [
  { width: 320, height: 568, mobile: true },
  { width: 360, height: 640, mobile: true },
  { width: 375, height: 667, mobile: true },
  { width: 390, height: 844, mobile: true },
  { width: 430, height: 932, mobile: true },
  { width: 1366, height: 768, mobile: false },
  { width: 1920, height: 1080, mobile: false },
]
const CATALOG = JSON.parse(await (await import("node:fs/promises")).readFile(path.join(ROOT, "src/config/offers/catalog.json"), "utf8"))
const SLUGS = Object.entries(CATALOG.offers).filter(([, entry]) => entry.status !== "draft").map(([slug]) => slug)
const args = process.argv.slice(2)
const baseArg = args.indexOf("--base-url")
const screenshotArg = args.indexOf("--screenshots-dir")
const BASE_URL = new URL(baseArg >= 0 ? args[baseArg + 1] : process.env.QA_BASE_URL ?? "http://127.0.0.1:3102")
const SCREENSHOT_DIR = screenshotArg >= 0 ? path.resolve(args[screenshotArg + 1]) : path.join(os.tmpdir(), `ofertas-qa-${Date.now()}`)

async function pickPort() {
  const server = net.createServer()
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve))
  const { port } = server.address()
  await new Promise((resolve) => server.close(resolve))
  return port
}

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean)
  for (const candidate of candidates) {
    try { await access(candidate); return candidate } catch { /* keep looking */ }
  }
  throw new Error("Chrome/Chromium não encontrado. Defina CHROME_PATH para o executável.")
}

async function waitForJson(url, attempts = 100) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
    } catch { /* Chrome ainda inicializando */ }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`Chrome DevTools não respondeu em ${url}.`)
}

function connectCdp(url) {
  const socket = new WebSocket(url)
  const pending = new Map()
  const listeners = new Map()
  let sequence = 0
  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true })
    socket.addEventListener("error", reject, { once: true })
  })
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data)
    if (message.id) {
      const request = pending.get(message.id)
      if (!request) return
      pending.delete(message.id)
      if (message.error) request.reject(new Error(message.error.message))
      else request.resolve(message.result)
      return
    }
    for (const listener of listeners.get(message.method) ?? []) listener(message.params)
  })
  return {
    opened,
    call(method, params = {}) {
      const id = ++sequence
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)) }, 30000)
        pending.set(id, {
          resolve: (value) => { clearTimeout(timeout); resolve(value) },
          reject: (error) => { clearTimeout(timeout); reject(error) },
        })
        socket.send(JSON.stringify({ id, method, params }))
      })
    },
    on(method, listener) {
      const current = listeners.get(method) ?? []
      current.push(listener)
      listeners.set(method, current)
    },
    waitFor(method, timeoutMs = 30000) {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error(`CDP event timeout: ${method}`)), timeoutMs)
        const listener = (value) => {
          clearTimeout(timeout)
          listeners.set(method, (listeners.get(method) ?? []).filter((item) => item !== listener))
          resolve(value)
        }
        this.on(method, listener)
      })
    },
    close() { socket.close() },
  }
}

async function expectRedirect(host, expectedPath) {
  const response = await new Promise((resolve, reject) => {
    const request = http.request(new URL("/", BASE_URL), { headers: { host } }, (incoming) => {
      incoming.resume()
      incoming.on("end", () => resolve({ status: incoming.statusCode, location: incoming.headers.location }))
    })
    request.on("error", reject)
    request.end()
  })
  assert.equal(response.status, 307, `${host}/ deve responder 307`)
  assert.equal(response.location, expectedPath, `${host}/ deve redirecionar para ${expectedPath}`)
}

assert.ok(SLUGS.length === 15, `esperava 15 ofertas publicadas, recebi ${SLUGS.length}`)
await mkdir(SCREENSHOT_DIR, { recursive: true })
await expectRedirect("universoeduk.com", "/painel")
await expectRedirect("www.universoeduk.com", "/painel")
await expectRedirect("preview.invalid", "/lembrancinhas")

const chromePath = await findChrome()
const debugPort = await pickPort()
const profile = await mkdtemp(path.join(os.tmpdir(), "ofertas-chrome-"))
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage", "--no-first-run",
  "--no-default-browser-check", "--remote-allow-origins=*", `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore", windowsHide: true })

let cdp
const failures = []
const navigationTimes = []
const ttfbTimes = []
const initialTransferBytes = []
const completeTransferBytes = []
const routePerformance = []
const imageContentTypes = new Set()
let checks = 0

try {
  const browserInfo = await waitForJson(`http://127.0.0.1:${debugPort}/json/version`)
  const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })
  assert.ok(targetResponse.ok, "Chrome não criou uma aba de QA")
  const target = await targetResponse.json()
  cdp = connectCdp(target.webSocketDebuggerUrl ?? browserInfo.webSocketDebuggerUrl)
  await cdp.opened
  await Promise.all([
    cdp.call("Page.enable"), cdp.call("Runtime.enable"), cdp.call("Network.enable"), cdp.call("Performance.enable"),
    cdp.call("Network.setBlockedURLs", { urls: ["*cashflow.mentoriaprocesso.com/*"] }),
    cdp.call("Network.setCacheDisabled", { cacheDisabled: true }),
    cdp.call("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] }),
  ])
  cdp.on("Network.responseReceived", ({ response }) => {
    if (response.url.includes("/_next/image")) {
      const contentType = Object.entries(response.headers).find(([name]) => name.toLowerCase() === "content-type")?.[1]
      imageContentTypes.add(contentType ?? response.mimeType ?? "unknown")
    }
  })

  async function evaluate(expression) {
    const result = await cdp.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    return result.result.value
  }

  async function setViewport(viewport) {
    await Promise.all([
      cdp.call("Emulation.setDeviceMetricsOverride", {
        width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile,
        screenWidth: viewport.width, screenHeight: viewport.height,
      }),
      cdp.call("Emulation.setTouchEmulationEnabled", { enabled: viewport.mobile, maxTouchPoints: 1 }),
    ])
    await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
  }

  async function navigate(url) {
    const started = performance.now()
    const loaded = cdp.waitFor("Page.loadEventFired", 45000)
    await cdp.call("Page.navigate", { url })
    await loaded
    await evaluate("document.fonts.ready.then(() => true)")
    navigationTimes.push(performance.now() - started)
  }

  async function saveScreenshot(name) {
    const shot = await cdp.call("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })
    await writeFile(path.join(SCREENSHOT_DIR, name), Buffer.from(shot.data, "base64"))
  }

  for (const slug of SLUGS) {
    await setViewport(VIEWPORTS[3])
    await navigate(new URL(`/${slug}`, BASE_URL).href)
    const initialPerformance = await evaluate(`(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");
      return { ttfb: nav?.responseStart ?? 0, transfer: resources.reduce((sum, item) => sum + item.transferSize, 0) };
    })()`)
    ttfbTimes.push(initialPerformance.ttfb)
    initialTransferBytes.push(initialPerformance.transfer)

    const hydrated = await evaluate(`(async () => {
      const images = [...new Map([...document.images].map((image) => [image.dataset.kcSrc || image.currentSrc || image.src, image])).values()];
      images.forEach((image) => { image.loading = "eager"; });
      const decoded = await Promise.all(images.map(async (image) => {
        try { await image.decode(); return { src: image.dataset.kcSrc || image.currentSrc || image.src, ok: image.naturalWidth > 0 }; }
        catch { return { src: image.dataset.kcSrc || image.currentSrc || image.src, ok: false }; }
      }));
      const faq = [...document.querySelectorAll(".faq-acc-btn")];
      let accordionWorks = false;
      if (faq[0]) {
        faq[0].click();
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        accordionWorks = faq[0].getAttribute("aria-expanded") === "true";
        faq[0].click();
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        accordionWorks = accordionWorks && faq[0].getAttribute("aria-expanded") === "false";
      }
      const resources = performance.getEntriesByType("resource");
      const visibleDashLines = document.body.innerText.split("\\n").filter((line) => /[\\u2010-\\u2015\\u2212-]/u.test(line));
      return {
        faqCount: faq.length,
        accordionWorks,
        socialProofCount: document.querySelectorAll(".sp-testimonial-card").length,
        images: decoded,
        transfer: resources.reduce((sum, item) => sum + item.transferSize, 0),
        ctaHref: document.querySelector(".vi-cta-btn")?.getAttribute("href"),
        offerAnchor: Boolean(document.querySelector("#oferta")),
        visibleDashLines,
      };
    })()`)
    if (hydrated.faqCount !== 5) failures.push(`${slug}: FAQ tem ${hydrated.faqCount}, esperado 5`)
    if (!hydrated.accordionWorks) failures.push(`${slug}: acordeão do FAQ não abre/fecha`)
    if (hydrated.socialProofCount > 7) failures.push(`${slug}: ${hydrated.socialProofCount} depoimentos renderizados, limite 7`)
    if (hydrated.images.some((image) => !image.ok)) failures.push(`${slug}: imagem quebrada: ${hydrated.images.filter((image) => !image.ok).map((image) => image.src).join(", ")}`)
    if (hydrated.images.some((image) => !/\.webp(?:$|[?#])/i.test(image.src) && !image.src.includes("/_next/image?url="))) failures.push(`${slug}: imagem com origem que não termina em WebP`)
    if (hydrated.visibleDashLines.length) failures.push(`${slug}: hífens/travessões visíveis na copy (${hydrated.visibleDashLines.join(" | ")})`)
    if (hydrated.ctaHref !== "#oferta" || !hydrated.offerAnchor) failures.push(`${slug}: CTA principal não aponta para a seção de planos`)
    completeTransferBytes.push(hydrated.transfer)
    routePerformance.push({ slug, initialTransferKiB: Math.round(initialPerformance.transfer / 1024), fullPageTransferKiB: Math.round(hydrated.transfer / 1024), visibleDashLines: hydrated.visibleDashLines })

    for (const viewport of VIEWPORTS) {
      await setViewport(viewport)
      await evaluate("window.scrollTo(0, 0)")
      const metrics = await evaluate(`(() => {
      const cta = document.querySelector(".vi-cta-btn");
      const ctaRect = cta?.getBoundingClientRect();
      const foldRect = document.querySelector(".vi-fold")?.getBoundingClientRect();
        const card = document.querySelector(".kc-card");
        const cardRect = card?.getBoundingClientRect();
        const cardStyle = card ? getComputedStyle(card) : null;
        const clipped = [...document.querySelectorAll(".vi-title, .vi-subline, .vi-cta-btn, h2, .faq-acc-btn")]
          .filter((element) => element.getBoundingClientRect().width > 0 && element.scrollWidth > element.clientWidth + 1)
          .map((element) => element.className || element.tagName.toLowerCase());
        const uncontained = [...document.querySelectorAll("body *")].filter((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1 || rect.left >= -1 && rect.right <= innerWidth + 1) return false;
          return !element.closest(".kc-carousel, .kc-section, .sp-carousel, .scroll-marquee, .vi-marquee");
        }).slice(0, 8).map((element) => ({ name: element.tagName.toLowerCase(), className: String(element.className || "").slice(0, 50), left: Math.round(element.getBoundingClientRect().left), right: Math.round(element.getBoundingClientRect().right) }));
        return {
          viewport: innerWidth,
          layoutWidth: document.documentElement.clientWidth,
          pageWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          ctaVisible: Boolean(ctaRect && foldRect && ctaRect.top >= foldRect.top - 1 && ctaRect.bottom <= foldRect.bottom + 1 && ctaRect.bottom <= innerHeight + 1 && ctaRect.left >= -1 && ctaRect.right <= innerWidth + 1),
          ctaRect: ctaRect ? { top: Math.round(ctaRect.top), bottom: Math.round(ctaRect.bottom) } : null,
          card: cardRect && cardStyle ? { width: cardRect.width, height: cardRect.height, aspect: cardStyle.aspectRatio, objectFit: card.querySelector("img") ? getComputedStyle(card.querySelector("img")).objectFit : null } : null,
          clipped,
          uncontained,
        };
      })()`)
      checks += 1
      if (metrics.pageWidth > metrics.viewport + 1) failures.push(`${slug} @ ${viewport.width}px: overflow horizontal (${metrics.pageWidth}px para viewport de ${metrics.viewport}px)`)
      if (!metrics.ctaVisible) failures.push(`${slug} @ ${viewport.width}x${viewport.height}: CTA fora da primeira dobra (${JSON.stringify(metrics.ctaRect)})`)
      if (metrics.clipped.length) failures.push(`${slug} @ ${viewport.width}px: texto cortado em ${metrics.clipped.join(", ")}`)
      if (metrics.uncontained.length) failures.push(`${slug} @ ${viewport.width}px: elementos escapam da viewport (${JSON.stringify(metrics.uncontained)})`)
      if (metrics.card) {
        const expectedWidth = viewport.mobile ? viewport.width : null
        const ratio = metrics.card.aspect.includes("3 / 4") ? 0.75 : 1.5
        if (expectedWidth !== null && Math.abs(metrics.card.width - expectedWidth) > 2) failures.push(`${slug} @ ${viewport.width}px: card mobile ${metrics.card.width.toFixed(1)}px, esperado ${expectedWidth.toFixed(1)}px`)
        if (!viewport.mobile && (metrics.card.width < 418 || metrics.card.width > 482)) failures.push(`${slug} @ ${viewport.width}px: card desktop fora de 420–480px (${metrics.card.width.toFixed(1)}px)`)
        if (Math.abs(metrics.card.width / metrics.card.height - ratio) > 0.03) failures.push(`${slug} @ ${viewport.width}px: proporção do card ${metrics.card.width.toFixed(2)}:${metrics.card.height.toFixed(2)} diverge do layout`)
        if (metrics.card.objectFit !== "contain") failures.push(`${slug} @ ${viewport.width}px: imagem do demonstrativo pode ser cortada (${metrics.card.objectFit})`)
      }
      if (slug === "psicopedagogia" && [320, 390, 1366].includes(viewport.width)) {
        await evaluate("window.scrollTo(0, 0)")
        await saveScreenshot(`psicopedagogia-${viewport.width}-hero.png`)
        if (viewport.width === 390) {
          await evaluate("document.querySelector('.kc-section')?.scrollIntoView({block:'start'})")
          await new Promise((resolve) => setTimeout(resolve, 250))
          await saveScreenshot("psicopedagogia-390-demonstrativos.png")
        }
      }
    }

    await evaluate(`(() => {
      const root = document.querySelector('#offer-root');
      root?.style.setProperty('--lp-font-scale', '1.08');
      root?.style.setProperty('--lp-image-scale', '1.08');
    })()`)
    for (const viewport of VIEWPORTS.filter(({ width }) => width === 320 || width === 360)) {
      await setViewport(viewport)
      await evaluate("window.scrollTo(0, 0)")
      const metrics = await evaluate(`(() => {
        const button = document.querySelector('.vi-cta-btn');
        const rect = button?.getBoundingClientRect();
        const fold = document.querySelector('.vi-fold')?.getBoundingClientRect();
        const image = document.querySelector('.vi-image')?.getBoundingClientRect();
        return {
          button: rect ? { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, textWidth: button.scrollWidth, clientWidth: button.clientWidth } : null,
          fold: fold ? { top: fold.top, bottom: fold.bottom } : null,
          image: image ? { width: image.width, height: image.height, maxHeight: Number.parseFloat(getComputedStyle(document.querySelector('.vi-image')).maxHeight) } : null,
          pageWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          clippedText: [...document.querySelectorAll('.vi-title,.vi-subline,.vi-cta-btn,.vi-bullets .ab-text,h2,.faq-acc-btn')]
            .filter(element => element.getBoundingClientRect().width > 0 && element.scrollWidth > element.clientWidth + 1)
            .map(element => element.className || element.tagName.toLowerCase()),
          uncontained: [...document.querySelectorAll('body *')].filter(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 1 || rect.height < 1 || rect.left >= -1 && rect.right <= innerWidth + 1) return false;
            return !element.closest('.kc-carousel,.kc-section,.sp-carousel,.scroll-marquee,.vi-marquee');
          }).slice(0, 8).map(element => ({className:String(element.className || '').slice(0,48),left:Math.round(element.getBoundingClientRect().left),right:Math.round(element.getBoundingClientRect().right)})),
          viewport: { width: innerWidth, height: innerHeight },
        };
      })()`)
      checks += 1
      const buttonFits = metrics.button && metrics.fold && metrics.button.top >= metrics.fold.top - 1 && metrics.button.bottom <= metrics.fold.bottom + 1 && metrics.button.bottom <= metrics.viewport.height + 1 && metrics.button.left >= -1 && metrics.button.right <= metrics.viewport.width + 1 && metrics.button.textWidth <= metrics.button.clientWidth + 1
      if (!buttonFits) failures.push(`${slug} @ ${viewport.width}x${viewport.height}, fonte/imagem G: CTA fora da primeira dobra ou texto cortado (${JSON.stringify(metrics)})`)
      if (!metrics.image || metrics.image.maxHeight <= viewport.height * 0.6 + 1) failures.push(`${slug} @ ${viewport.width}px, imagem G não aumentou seu limite flexível (${JSON.stringify(metrics.image)})`)
      if (metrics.pageWidth > viewport.width + 1) failures.push(`${slug} @ ${viewport.width}px, fonte/imagem G: overflow horizontal (${metrics.pageWidth}px)`)
      if (metrics.clippedText.length) failures.push(`${slug} @ ${viewport.width}px, fonte/imagem G: texto cortado em ${metrics.clippedText.join(", ")}`)
      if (metrics.uncontained.length) failures.push(`${slug} @ ${viewport.width}px, fonte/imagem G: elementos escapam da viewport (${JSON.stringify(metrics.uncontained)})`)
      if (slug === "psicopedagogia" && viewport.width === 320) await saveScreenshot("psicopedagogia-320-hero-GG.png")
    }
  }

  if (!imageContentTypes.size) failures.push("Nenhuma resposta do otimizador de imagens foi observada.")
  if ([...imageContentTypes].some((type) => !type.toLowerCase().includes("image/webp"))) failures.push(`Next/Image respondeu formatos diferentes de WebP: ${[...imageContentTypes].join(", ")}`)
  const percentile = (values, fraction) => {
    const sorted = [...values].sort((a, b) => a - b)
    return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))] ?? 0
  }
  const p95NavigationMs = Math.round(percentile(navigationTimes, 0.95))
  const p95InitialTransferKiB = Math.round(percentile(initialTransferBytes, 0.95) / 1024)
  const p95FullPageTransferKiB = Math.round(percentile(completeTransferBytes, 0.95) / 1024)
  if (p95NavigationMs > 5000) failures.push(`navegação p95 acima de 5 s (${p95NavigationMs} ms)`)
  if (p95InitialTransferKiB > 1536) failures.push(`payload inicial p95 acima de 1,5 MiB (${p95InitialTransferKiB} KiB)`)
  if (p95FullPageTransferKiB > 5120) failures.push(`payload completo p95 acima de 5 MiB (${p95FullPageTransferKiB} KiB)`)
  const report = {
    routes: SLUGS.length,
    responsiveChecks: checks,
    viewportWidths: VIEWPORTS.map(({ width }) => width),
    imageResponseTypes: [...imageContentTypes],
    medianNavigationMs: Math.round(percentile(navigationTimes, 0.5)),
    p95NavigationMs,
    medianTtfbMs: Math.round(percentile(ttfbTimes, 0.5)),
    p95InitialTransferKiB,
    medianInitialTransferKiB: Math.round(percentile(initialTransferBytes, 0.5) / 1024),
    medianFullPageTransferKiB: Math.round(percentile(completeTransferBytes, 0.5) / 1024),
    p95FullPageTransferKiB,
    routePerformance,
    screenshots: SCREENSHOT_DIR,
    failures,
  }
  await writeFile(path.join(SCREENSHOT_DIR, "report.json"), JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ ...report, failures: failures.slice(0, 20), failureCount: failures.length }, null, 2))
  if (failures.length) throw new Error(`QA responsiva encontrou ${failures.length} problema(s); relatório completo: ${path.join(SCREENSHOT_DIR, "report.json")}`)
} finally {
  cdp?.close()
  const chromeClosed = chrome.exitCode !== null ? Promise.resolve() : new Promise((resolve) => chrome.once("exit", resolve))
  chrome.kill()
  await Promise.race([chromeClosed, new Promise((resolve) => setTimeout(resolve, 5000))])
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
}
