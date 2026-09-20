#!/usr/bin/env node
import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import net from "node:net"
import os from "node:os"
import path from "node:path"

const BASE_URL = new URL(process.env.QA_BASE_URL ?? "http://127.0.0.1:3102")
const email = process.env.QA_ADMIN_EMAIL ?? "qa@universoeduk.test"
const password = process.env.QA_ADMIN_PASSWORD ?? "local-qa-only-password-924"
const report = { viewportWidths: [320, 390, 768, 1366], checks: [], screenshots: path.join(os.tmpdir(), `ofertas-panel-qa-${Date.now()}`) }

async function pickPort() {
  const server = net.createServer()
  await new Promise((resolve, reject) => server.once("error", reject).listen(0, "127.0.0.1", resolve))
  const { port } = server.address()
  await new Promise((resolve) => server.close(resolve))
  return port
}

async function findChrome() {
  const candidates = [process.env.CHROME_PATH, "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium"].filter(Boolean)
  for (const candidate of candidates) { try { await access(candidate); return candidate } catch { /* segue para o próximo caminho */ } }
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
    close() { socket.close() },
  }
}

const debugPort = await pickPort()
const profile = await mkdtemp(path.join(os.tmpdir(), "lp-panel-qa-"))
await mkdir(report.screenshots, { recursive: true })
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
    cdp.call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844 }),
  ])

  async function evaluate(expression) {
    const result = await cdp.call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    return result.result.value
  }
  async function waitForSelector(selector) {
    const found = await evaluate(`new Promise((resolve, reject) => {let tries=0;const timer=setInterval(()=>{if(document.querySelector(${JSON.stringify(selector)})){clearInterval(timer);resolve(true)}else if(++tries>100){clearInterval(timer);reject(new Error('selector timeout: '+${JSON.stringify(selector)}))}},50)})`)
    assert.equal(found, true, `seletor não apareceu: ${selector}`)
  }

  await cdp.call("Page.navigate", { url: new URL("/painel/login?next=/painel", BASE_URL).href })
  await waitForSelector('input[type="email"]')
  const anonymousSettings = await evaluate(`fetch('/api/painel/settings').then(response => response.status)`)
  assert.equal(anonymousSettings, 401, "API global deve exigir sessão administrativa")
  const login = await evaluate(`fetch('/api/painel/login', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({email:${JSON.stringify(email)},password:${JSON.stringify(password)},next:'/painel'}) }).then(async response => ({status:response.status,body:await response.json()}))`)
  assert.equal(login.status, 200, "login local falhou")
  report.checks.push("login administrativo")
  const settingsApi = await evaluate(`(async () => {
    const current = await fetch('/api/painel/settings');
    const invalid = await fetch('/api/painel/settings', { method: 'PATCH', headers: {'content-type':'application/json'}, body: JSON.stringify({typographySize:'XL',imageSize:'M'}) });
    return { get: current.status, settings: await current.json(), invalidPatch: invalid.status };
  })()`)
  assert.equal(settingsApi.get, 200, "API de configurações globais não responde autenticada")
  assert.deepEqual(settingsApi.settings, { typographySize: "M", imageSize: "M" }, "defaults globais inesperados no ambiente de QA")
  assert.equal(settingsApi.invalidPatch, 400, "API deve rejeitar escalas fora de P/M/G")
  report.checks.push("API global exige sessão e rejeita escalas inválidas")

  await cdp.call("Page.navigate", { url: new URL("/painel", BASE_URL).href })
  await waitForSelector('[aria-label="Resumo das ofertas"]')
  const settingOptions = await evaluate(`(() => {
    const section = document.querySelector('[aria-labelledby="global-visual-settings-title"]');
    const fields = [...(section?.querySelectorAll('fieldset') ?? [])];
    const font = fields.find(field => field.querySelector('legend')?.innerText.includes('fonte'));
    const image = fields.find(field => field.querySelector('legend')?.innerText.includes('imagens'));
    const button = (field, size) => [...(field?.querySelectorAll('button') ?? [])].find(item => item.innerText.trim().startsWith(size));
    button(font, 'G')?.click();
    button(image, 'G')?.click();
    return { fontChoices: font?.querySelectorAll('button').length ?? 0, imageChoices: image?.querySelectorAll('button').length ?? 0 };
  })()`)
  assert.equal(settingOptions.fontChoices, 3, "seletor de fonte deve oferecer P, M e G")
  assert.equal(settingOptions.imageChoices, 3, "seletor de imagens deve oferecer P, M e G")
  await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
  const visualSettings = await evaluate(`(() => {
    const section = document.querySelector('[aria-labelledby="global-visual-settings-title"]');
    const fields = [...section.querySelectorAll('fieldset')];
    const font = fields.find(field => field.querySelector('legend')?.innerText.includes('fonte'));
    const image = fields.find(field => field.querySelector('legend')?.innerText.includes('imagens'));
    const button = (field, size) => [...field.querySelectorAll('button')].find(item => item.innerText.trim().startsWith(size));
    const previewText = section.querySelector('strong');
    const previewImage = section.querySelector('img');
    return {
      fontGPressed: button(font, 'G')?.getAttribute('aria-pressed'),
      imageGPressed: button(image, 'G')?.getAttribute('aria-pressed'),
      previewFont: previewText ? getComputedStyle(previewText).fontSize : null,
      previewImageWidth: previewImage ? Math.round(previewImage.getBoundingClientRect().width) : null,
    };
  })()`)
  assert.equal(visualSettings.fontGPressed, "true", "selecionar fonte G não atualizou o estado")
  assert.equal(visualSettings.imageGPressed, "true", "selecionar imagem G não atualizou o estado")
  assert.ok(Number.parseFloat(visualSettings.previewFont) > 16, "prévia não aumentou o texto ao selecionar G")
  assert.ok(visualSettings.previewImageWidth > 140, "prévia não aumentou a imagem ao selecionar G")
  report.checks.push("controles globais P/M/G atualizam a prévia de texto e imagem")
  await evaluate(`(() => {const section=document.querySelector('[aria-labelledby="global-visual-settings-title"]');const fields=[...section.querySelectorAll('fieldset')];for(const field of fields){[...field.querySelectorAll('button')].find(button=>button.innerText.trim().startsWith('M'))?.click()}})()`)
  for (const width of report.viewportWidths) {
    await cdp.call("Emulation.setDeviceMetricsOverride", { width, height: 844, deviceScaleFactor: 1, mobile: width <= 768, screenWidth: width, screenHeight: 844 })
    await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    const metrics = await evaluate(`(() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,metrics:[...document.querySelectorAll('[aria-label="Resumo das ofertas"] article strong')].map(el=>el.innerText),offers:document.querySelectorAll('[aria-label="Ofertas"] a').length,heading:document.querySelector('h1')?.innerText}))()`)
    assert.ok(Math.max(metrics.scrollWidth, metrics.bodyWidth) <= width + 1, `painel inicial com overflow em ${width}px: ${JSON.stringify(metrics)}`)
    assert.equal(metrics.offers, 15, "dashboard não lista as 15 ofertas")
    assert.equal(metrics.metrics[0], "15", "dashboard não mostra o total de ofertas")
    if (width === 320 || width === 390) report.checks.push(`dashboard sem overflow em ${width}px`)
    if (width === 390) {
      const screenshot = await cdp.call("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })
      await writeFile(path.join(report.screenshots, "dashboard-390.png"), Buffer.from(screenshot.data, "base64"))
    }
  }
  report.checks.push("dashboard com métricas e 15 ofertas")

  await cdp.call("Page.navigate", { url: new URL("/painel/psicopedagogia", BASE_URL).href })
  await waitForSelector('[class*="paletteGrid"]')
  await evaluate("new Promise(resolve => setTimeout(resolve, 350))")
  await cdp.call("Emulation.setDeviceMetricsOverride", { width: 320, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 320, screenHeight: 844 })
  await evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
  const editor = await evaluate(`(() => ({overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)>innerWidth+1,heading:document.querySelector('h1')?.innerText,tabPanel:document.querySelector('[role="tabpanel"]')?.getBoundingClientRect().toJSON(),candidateCount:document.querySelectorAll('[class*="paletteGrid"] button').length,tabs:[...document.querySelectorAll('[role="tablist"][aria-label="Editar oferta"] button')].map(el=>({text:el.innerText,scroll:el.scrollWidth,client:el.clientWidth})),frameReady:Boolean(document.querySelector('iframe')?.contentDocument?.querySelector('#offer-root'))}))()`)
  assert.equal(editor.overflow, false, "editor causa overflow em 320px")
  assert.equal(editor.candidateCount, 10, "editor deve mostrar exatamente dez paletas")
  assert.equal(editor.tabs.length, 5, "editor deve mostrar as cinco abas principais")
  assert.ok(editor.tabs.every((tab) => tab.scroll <= tab.client + 1), `abas do painel cortam texto: ${JSON.stringify(editor.tabs)}`)
  assert.equal(editor.frameReady, true, "preview do editor não carregou")
  report.checks.push("editor e preview mobile em 320px")
  const editorScreenshot = await cdp.call("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false })
  await writeFile(path.join(report.screenshots, "editor-320.png"), Buffer.from(editorScreenshot.data, "base64"))

  const panelScroll = await evaluate(`(() => {const panel=document.querySelector('[role="tabpanel"]');const before=panel.scrollTop;panel.scrollTop=panel.scrollHeight;return {before,after:panel.scrollTop,client:panel.clientHeight,scroll:panel.scrollHeight,enabled:panel.hasAttribute('data-lenis-prevent')}})()`)
  assert.equal(panelScroll.enabled, true, "área interna não está liberada para scroll")
  assert.ok(panelScroll.after > panelScroll.before, `scroll interno não funciona: ${JSON.stringify(panelScroll)}`)
  report.checks.push("scroll interno do editor")

  await evaluate(`Object.defineProperty(navigator, 'clipboard', {configurable:true,value:{writeText:async value=>{window.__qaCopied=value}}})`)
  const beforePalette = await evaluate(`document.querySelector('iframe')?.contentDocument?.querySelector('#offer-root')?.style.getPropertyValue('--brand')`)
  await evaluate(`document.querySelector('[class*="paletteGrid"] button[aria-pressed="false"]')?.click()`)
  await evaluate("new Promise(resolve => setTimeout(resolve, 500))")
  const previewAfterPalette = await evaluate(`document.querySelector('iframe')?.contentDocument?.querySelector('#offer-root')?.style.getPropertyValue('--brand')`)
  assert.notEqual(previewAfterPalette, beforePalette, "selecionar uma paleta não atualizou o preview")
  report.checks.push("seleção de paleta atualiza preview ao vivo")

  const clickButton = (label) => evaluate(`(() => {const button=[...document.querySelectorAll('button')].find(el=>el.innerText.trim()===${JSON.stringify(label)});button?.click();return Boolean(button)})()`)
  await clickButton("Gerar novas paletas")
  await evaluate("new Promise(resolve => setTimeout(resolve, 400))")
  const generated = await evaluate(`document.querySelectorAll('[class*="paletteGrid"] button').length`)
  assert.equal(generated, 10, "gerador não atualizou as dez opções")
  report.checks.push("geração de dez paletas")

  await clickButton("Oferta")
  const anchorFieldFound = await evaluate(`(() => {
    const label = [...document.querySelectorAll('[role="tabpanel"] label')].find(element => element.innerText.includes('Preço de ancoragem'));
    const input = label?.querySelector('input');
    if (!input) return false;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(input, 'de R$ 99,90');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`)
  assert.equal(anchorFieldFound, true, "painel de preços não apresenta o preço de ancoragem editável")
  await evaluate("new Promise(resolve => setTimeout(resolve, 500))")
  const previewDiscount = await evaluate(`document.querySelector('iframe')?.contentDocument?.querySelector('.offer-discount-badge')?.innerText`)
  assert.equal(previewDiscount, "82% OFF", `editar o preço de ancoragem não recalculou o desconto no preview: ${previewDiscount}`)
  report.checks.push("preço de ancoragem editável recalcula o desconto arredondado na prévia")
  await clickButton("Cashflow")
  const cashflowFields = await evaluate(`(() => ({text:document.querySelector('[role="tabpanel"]')?.innerText,fields:document.querySelectorAll('[role="tabpanel"] textarea').length}))()`)
  assert.equal(cashflowFields.fields, 1, "Cashflow deve ter apenas um campo de script")
  assert.ok(!/Workspace ID|Offer ID/i.test(cashflowFields.text), "Cashflow ainda pede IDs em campos separados")
  report.checks.push("Cashflow usa um único campo de script")

  const validScript = '<script src="https://cashflow.mentoriaprocesso.com/t/p.js?w=workspace-test&o=offer-test" data-offer="offer-test" async></script>'
  await evaluate(`(() => {const field=document.querySelector('[role="tabpanel"] textarea');const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;setter.call(field,${JSON.stringify(validScript)});field.dispatchEvent(new Event('input',{bubbles:true}))})()`)
  await evaluate("new Promise(resolve => setTimeout(resolve, 150))")
  assert.ok(await evaluate(`document.querySelector('[role="tabpanel"]')?.innerText.includes('Script reconhecido')`), "tag válida da Cashflow não foi reconhecida")
  const malicious = '<script src="https://example.org/a.js" data-offer="offer-test"></script>'
  await evaluate(`(() => {const field=document.querySelector('[role="tabpanel"] textarea');const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;setter.call(field,${JSON.stringify(malicious)});field.dispatchEvent(new Event('input',{bubbles:true}))})()`)
  await evaluate("new Promise(resolve => setTimeout(resolve, 100))")
  assert.ok(await evaluate(`document.querySelector('[role="tabpanel"] [role="alert"]')?.innerText`), "script externo deveria ser rejeitado")
  report.checks.push("Cashflow reconhece o script oficial e rejeita origem externa")

  await clickButton("Copy")
  const ctaLabels = await evaluate(`([...document.querySelectorAll('[role="tabpanel"] label')].map(el=>el.innerText).join(' | '))`)
  assert.ok(ctaLabels.includes("Botão dos benefícios") && ctaLabels.includes("Botão de urgência") && ctaLabels.includes("Botão do acesso"), "campos de CTA das seções secundárias não estão acessíveis na aba Copy")
  await evaluate(`(() => {const field=document.getElementById('psicopedagogia-hero-headline');const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;setter.call(field,'Prévia atualizada\\nsem salvar');field.dispatchEvent(new Event('input',{bubbles:true}))})()`)
  await evaluate("new Promise(resolve => setTimeout(resolve, 500))")
  assert.ok(await evaluate(`document.querySelector('iframe')?.contentDocument?.querySelector('.vi-title')?.innerText.includes('Prévia atualizada')`), "alterar a copy não atualizou o preview")
  report.checks.push("CTAs das seções editáveis e copy acompanha preview")

  for (const label of ["Cores", "Imagens", "Oferta", "Copy", "Seções"]) {
    assert.equal(await clickButton(label), true, `aba ${label} não abre`)
    const scroll = await evaluate(`(() => {const panel=document.querySelector('[role="tabpanel"]');panel.scrollTop=0;const needed=panel.scrollHeight>panel.clientHeight+1;panel.scrollTop=panel.scrollHeight;return {needed,worked:panel.scrollTop>0,prevent:panel.hasAttribute('data-lenis-prevent')}})()`)
    assert.equal(scroll.prevent, true, `aba ${label} não permite scroll compatível com Lenis`)
    if (scroll.needed) assert.equal(scroll.worked, true, `scroll interno falhou na aba ${label}`)
  }
  report.checks.push("scroll testado em todas as cinco abas principais")

  await clickButton("Copy")
  await clickButton("Prompt")
  assert.ok(await evaluate(`document.querySelector('[role="tabpanel"]')?.innerText.includes('Copiar estrutura vazia')`), "aba Prompt sem estrutura vazia copiável")
  await clickButton("Copiar estrutura vazia")
  const copiedTemplate = await evaluate("window.__qaCopied ?? ''")
  assert.ok(copiedTemplate.includes("PILL:"), "estrutura vazia não foi copiada")
  await clickButton("Gerar e copiar prompt")
  await evaluate("new Promise(resolve => setTimeout(resolve, 150))")
  assert.ok(await evaluate("(window.__qaCopied ?? '').length > 100"), "prompt completo não foi copiado")
  await clickButton("Colar copy")
  assert.ok(await evaluate(`document.querySelector('[role="tabpanel"]')?.innerText.includes('Aplicar copy')`), "aba Colar copy sem ação para aplicar o texto")
  report.checks.push("abas de copy e cópia de template/prompt")

  const reportPath = path.join(report.screenshots, "report.json")
  await writeFile(reportPath, JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ status: "passed", ...report, reportPath }, null, 2))
} catch (error) {
  report.error = error instanceof Error ? error.message : String(error)
  console.log(JSON.stringify({ status: "failed", ...report }, null, 2))
  throw error
} finally {
  cdp?.close()
  const closed = chrome.exitCode !== null ? Promise.resolve() : new Promise((resolve) => chrome.once("exit", resolve))
  chrome.kill()
  await Promise.race([closed, new Promise((resolve) => setTimeout(resolve, 5000))])
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
}
