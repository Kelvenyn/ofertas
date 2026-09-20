#!/usr/bin/env node
import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { access, mkdtemp, rm } from "node:fs/promises"
import net from "node:net"
import os from "node:os"
import path from "node:path"

const BASE_URL = new URL(process.env.QA_BASE_URL ?? "http://127.0.0.1:3102")
const failures = []
const reports = {}

async function pickPort() {
  const server = net.createServer()
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve))
  const { port } = server.address()
  await new Promise((resolve) => server.close(resolve))
  return port
}

async function findChrome() {
  const candidates = [process.env.CHROME_PATH, "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean)
  for (const candidate of candidates) {
    try { await access(candidate); return candidate } catch { /* keep searching */ }
  }
  throw new Error("Chrome/Chromium não encontrado. Defina CHROME_PATH.")
}

async function waitForJson(url) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) return response.json() } catch { /* Chrome iniciando */ }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  throw new Error(`Chrome DevTools não respondeu em ${url}`)
}

function connectCdp(url) {
  const socket = new WebSocket(url)
  const pending = new Map()
  let sequence = 0
  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true })
    socket.addEventListener("error", reject, { once: true })
  })
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data)
    if (!message.id) return
    const request = pending.get(message.id)
    if (!request) return
    pending.delete(message.id)
    if (message.error) request.reject(new Error(message.error.message))
    else request.resolve(message.result)
  })
  return {
    opened,
    call(method, params = {}) {
      const id = ++sequence
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)) }, 30000)
        pending.set(id, { resolve: (value) => { clearTimeout(timeout); resolve(value) }, reject: (error) => { clearTimeout(timeout); reject(error) } })
        socket.send(JSON.stringify({ id, method, params }))
      })
    },
    waitFor(method, timeoutMs = 45000) {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => { cleanup(); reject(new Error(`CDP event timeout: ${method}`)) }, timeoutMs)
        const handler = (event) => { const message = JSON.parse(event.data); if (message.method !== method) return; cleanup(); resolve(message.params) }
        const cleanup = () => { clearTimeout(timeout); socket.removeEventListener("message", handler) }
        socket.addEventListener("message", handler)
      })
    },
    close() { socket.close() },
  }
}

const debugPort = await pickPort()
const profile = await mkdtemp(path.join(os.tmpdir(), "lp-ui-qa-"))
const chrome = spawn(await findChrome(), ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage", "--no-first-run", "--no-default-browser-check", "--remote-allow-origins=*", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore", windowsHide: true })
let cdp

try {
  const browserInfo = await waitForJson(`http://127.0.0.1:${debugPort}/json/version`)
  const created = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })
  assert.ok(created.ok, "Chrome não criou a aba de QA")
  const target = await created.json()
  cdp = connectCdp(target.webSocketDebuggerUrl ?? browserInfo.webSocketDebuggerUrl)
  await cdp.opened
  await Promise.all([
    cdp.call("Page.enable"), cdp.call("Runtime.enable"),
    cdp.call("Network.setBlockedURLs", { urls: ["*cashflow.mentoriaprocesso.com/*"] }),
    cdp.call("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] }),
    cdp.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844 }),
  ])
  const loaded = cdp.waitFor("Page.loadEventFired")
  await cdp.call("Page.navigate", { url: new URL("/psicopedagogia", BASE_URL).href })
  await loaded

  async function evaluate(expression) {
    const result = await cdp.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    return result.result.value
  }
  async function viewport(width, height) {
    await cdp.call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width <= 700, screenWidth: width, screenHeight: height })
    await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
  }

  await evaluate("document.fonts.ready.then(() => true)")
  reports.initial = await evaluate(`(() => {
    const rect = (selector) => { const el = document.querySelector(selector); return el ? { top: Math.round(el.getBoundingClientRect().top), width: Math.round(el.getBoundingClientRect().width), height: Math.round(el.getBoundingClientRect().height) } : null }
    const banner = document.querySelector('[role="banner"]')
    const bannerStyle = banner ? getComputedStyle(banner) : null
    const marquee = document.querySelector('.vi-marquee')
    const deliverableItems = [...document.querySelectorAll('.tqvr-bullets .ab-item')]
    const bulletTexts = [...document.querySelectorAll('.vi-bullets .ab-text')]
    return {
      railCount: document.querySelectorAll('.kc-section').length,
      railDirections: [...document.querySelectorAll('.kc-section')].map(el => el.classList.contains('kc-section-rev') ? 'reverse' : 'forward'),
      heroOrder: ['.vi-pill','.vi-title','.vi-subline','.vi-image','.vi-sub','.vi-cta-btn','.vi-bullets'].map(rect),
      heroButton: (() => { const el=document.querySelector('.vi-cta-btn');const s=getComputedStyle(el);const arrow=el?.querySelector('svg');return {text:el?.innerText,width:rect('.vi-cta-btn')?.width,whiteSpace:s.whiteSpace,arrowAnimation:arrow?getComputedStyle(arrow).animationName:'missing',arrowTransform:arrow?getComputedStyle(arrow).transform:'none',animation:[...el.querySelectorAll('*')].map(x=>getComputedStyle(x).animationName)}})(),
      heroBulletWhiteSpace: bulletTexts.map(el => getComputedStyle(el).whiteSpace),
      bannerAtTop: bannerStyle ? {background:bannerStyle.backgroundColor,backdrop:bannerStyle.backdropFilter,position:bannerStyle.position,transition:bannerStyle.transition} : null,
      marquee: marquee ? {backgroundImage:getComputedStyle(marquee).backgroundImage,borderTop:getComputedStyle(marquee).borderTopWidth,borderBottom:getComputedStyle(marquee).borderBottomWidth} : null,
      demoCard: rect('.kc-card'),
      proofDots: document.querySelectorAll('.sp-dot').length,
      proofCards: document.querySelectorAll('.sp-story-card').length,
      deliverableHeights: deliverableItems.map(el => Math.round(el.getBoundingClientRect().height)),
      squareArtwork: [...document.querySelectorAll('.vi-image img,.tqvr-image img,.benefits-image img,.pricing-card img')].filter(el => Math.abs(el.naturalWidth/el.naturalHeight-1)<0.03).map(el=>({parent:el.parentElement?.className,animation:getComputedStyle(el).animationName,glow:getComputedStyle(el.parentElement,'::before').backgroundImage})),
      visibleDashes: (document.body.innerText.match(/[\\u2010-\\u2015\\u2212-]/g) ?? []).length,
      visibleDashLines: document.body.innerText.split('\\n').filter(line => /[\\u2010-\\u2015\\u2212-]/u.test(line)),
    }
  })()`)

  await viewport(320, 568)
  reports.mobile320 = await evaluate(`(() => {
    const button=document.querySelector('.vi-cta-btn'), br=button.getBoundingClientRect(), bs=getComputedStyle(button)
    const bullets=[...document.querySelectorAll('.vi-bullets .ab-text')].map(el=>({text:el.innerText,scroll:el.scrollWidth,client:el.clientWidth,whiteSpace:getComputedStyle(el).whiteSpace}))
    return {width:innerWidth,buttonWidth:Math.round(br.width),max80:br.width<=innerWidth*.8+1,whiteSpace:bs.whiteSpace,bullets,overflow:document.documentElement.scrollWidth>innerWidth+1}
  })()`)

  await evaluate(`(() => { const bar=document.querySelector('[role="banner"]'); window.__barTop=getComputedStyle(bar).backgroundColor; window.scrollTo(0,500); })()`)
  await new Promise((resolve) => setTimeout(resolve, 500))
  reports.bannerScrolled = await evaluate(`(() => { const bar=document.querySelector('[role="banner"]'),s=getComputedStyle(bar); return {scrollY,background:s.backgroundColor,backdrop:s.backdropFilter,transition:s.transition} })()`)

  await evaluate(`(() => { const region=document.querySelector('.sp-carousel-inner'),track=document.querySelector('.sp-carousel-track'); region?.scrollIntoView({block:'center'}); window.__proofNodes=[...document.querySelectorAll('.sp-story-card')]; window.__proofChanges=0; window.__proofObserver=new MutationObserver(records=>window.__proofChanges+=records.reduce((n,r)=>n+r.addedNodes.length+r.removedNodes.length,0)); window.__proofObserver.observe(track,{childList:true,subtree:true}); })()`)
  await new Promise((resolve) => setTimeout(resolve, 1500))
  reports.proofMotion = await evaluate(`(() => { window.__proofObserver?.disconnect(); return {initialNodes:window.__proofNodes?.length,detached:window.__proofNodes?.filter(node=>!node.isConnected).length,childMutations:window.__proofChanges,items:document.querySelectorAll('.sp-dot').length} })()`)
  await evaluate(`document.querySelectorAll('.sp-dot')[6]?.click()`)
  await new Promise((resolve) => setTimeout(resolve, 1200))
  reports.proofSeventh = await evaluate(`(() => ({dotCount:document.querySelectorAll('.sp-dot').length,activeDot:[...document.querySelectorAll('.sp-dot')].findIndex(el=>el.classList.contains('sp-dot-active')),centerImage:document.querySelector('.sp-story-card[aria-hidden="false"] img')?.alt,centerSrc:document.querySelector('.sp-story-card[aria-hidden="false"] img')?.getAttribute('src')}))()`)

  await evaluate(`document.querySelector('.benefits-grid')?.scrollIntoView({block:'start'})`)
  const benefitTimes = []
  for (let elapsed = 0; elapsed <= 900; elapsed += 75) {
    const expanded = await evaluate(`[...document.querySelectorAll('.benefit-card')].map((el,index)=>el.classList.contains('benefit-card-expanded')?index:-1).filter(index=>index>=0)`)
    benefitTimes.push({ elapsed, expanded })
    await new Promise((resolve) => setTimeout(resolve, 75))
  }
  reports.benefitReveal = benefitTimes
  reports.benefitRevealSummary = await evaluate(`(() => {
    const rows = ${JSON.stringify(benefitTimes)}
    const firstSeen = new Map()
    for (const row of rows) for (const index of row.expanded) if (!firstSeen.has(index)) firstSeen.set(index, row.elapsed)
    const times = [...firstSeen.entries()].sort((a,b)=>a[0]-b[0])
    return { firstSeen: times, spread: times.length ? Math.max(...times.map(([,time])=>time))-Math.min(...times.map(([,time])=>time)) : null, count: times.length }
  })()`)

  const checks = [
    [reports.initial.railCount === 2, `Esperava 2 trilhos padrão; há ${reports.initial.railCount}`],
    [reports.initial.railDirections[0] === 'forward' && reports.initial.railDirections[1] === 'reverse', `Direções dos trilhos: ${reports.initial.railDirections}`],
    [reports.initial.heroOrder.every((rect,index,array)=>!rect || index===0 || !array[index-1] || rect.top>=array[index-1].top), 'Ordem da hero diverge da sequência solicitada'],
    [reports.initial.heroButton.whiteSpace === 'nowrap', `CTA permite quebra de linha (${reports.initial.heroButton.whiteSpace})`],
    [reports.mobile320.max80, `CTA tem ${reports.mobile320.buttonWidth}px em viewport 320px, máximo 80vw`],
    [reports.mobile320.bullets.every(item=>item.whiteSpace==='nowrap'&&item.scroll<=item.client+1), 'Bullets da hero quebram linha ou transbordam em 320px'],
    [reports.initial.heroButton.arrowAnimation !== 'none' && reports.initial.heroButton.arrowAnimation !== 'missing', `Seta do CTA sem animação de pulsar: ${reports.initial.heroButton.arrowAnimation}`],
    [reports.initial.bannerAtTop.background !== reports.bannerScrolled.background && reports.bannerScrolled.backdrop.includes('blur'), 'Topbar não transiciona para glass no scroll'],
    [reports.proofMotion.detached === 0, `${reports.proofMotion.detached} nós de depoimento foram remontados no autoplay`],
    [reports.proofSeventh.activeDot === 6 && /Depoimento 7/i.test(reports.proofSeventh.centerImage ?? ''), `Sétimo depoimento não centraliza: ${JSON.stringify(reports.proofSeventh)}`],
    [reports.initial.deliverableHeights.length < 2 || Math.max(...reports.initial.deliverableHeights)-Math.min(...reports.initial.deliverableHeights)<=1, `Alturas diferentes nos entregáveis: ${reports.initial.deliverableHeights}`],
    [reports.initial.squareArtwork.every(item=>item.animation!=='none'&&item.glow!=='none'), 'Imagem quadrada sem flutuação ou brilho radial'],
    [reports.initial.visibleDashes===0, `Copy pública contém ${reports.initial.visibleDashes} hífens/travessões visíveis`],
    [reports.benefitRevealSummary.count === 4 && reports.benefitRevealSummary.spread <= 225, `Cards de benefícios entram dessincronizados: ${JSON.stringify(reports.benefitRevealSummary)}`],
  ]
  for (const [passed, message] of checks) if (!passed) failures.push(message)
  console.log(JSON.stringify({ status: failures.length ? "failed" : "passed", reports, failures }, null, 2))
  assert.deepEqual(failures, [], "QA visual e animações encontrou regressões")
} finally {
  cdp?.close()
  const closed = chrome.exitCode !== null ? Promise.resolve() : new Promise((resolve) => chrome.once("exit", resolve))
  chrome.kill()
  await Promise.race([closed, new Promise((resolve) => setTimeout(resolve, 5000))])
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
}
