import { readFileSync, writeFileSync } from 'fs'

const TOKEN_MAP = [
  [/#0b7fe8/gi, 'var(--brand)'],
  [/#082f63/gi, 'var(--brand-deep)'],
  [/#123a6d/gi, 'var(--brand-ink)'],
  [/#1d4ed8/gi, 'var(--brand-dark)'],
  [/#49a6ff/gi, 'var(--brand-light)'],
  [/#eaf5ff/gi, 'var(--brand-subtle)'],
  [/#22c978/gi, 'var(--cta)'],
  [/#00a85a/gi, 'var(--cta-deep)'],
  [/#007d43/gi, 'var(--cta-darkest)'],
  [/#ff8a5b/gi, 'var(--accent)'],
  [/#ffd166/gi, 'var(--yellow)'],
  [/#f8fbff/gi, 'var(--bg)'],
  [/#111111/gi, 'var(--text)'],
  [/#425466/gi, 'var(--text-muted)'],
  [/#5b6b7b/gi, 'var(--text-light)'],
  [/#dc2626/gi, 'var(--urgency)'],
]

let css = readFileSync('src/app/globals.css', 'utf8')

// Only replace below @layer base to protect the :root token definitions
const layerBaseIdx = css.indexOf('@layer base')
if (layerBaseIdx === -1) {
  // Fallback: replace after the :root closing brace
  console.warn('Warning: @layer base not found, replacing in full body')
  let count = 0
  for (const [re, token] of TOKEN_MAP) {
    const matches = (css.match(re) || []).length
    if (matches > 0) console.log(`  ${token}: ${matches} substituições`)
    count += matches
    css = css.replace(re, token)
  }
  writeFileSync('src/app/globals.css', css, 'utf8')
  console.log(`\n✓ Total: ${count} substituições`)
  process.exit(0)
}

const preamble = css.slice(0, layerBaseIdx)
let body = css.slice(layerBaseIdx)

let count = 0
for (const [re, token] of TOKEN_MAP) {
  const matches = (body.match(re) || []).length
  if (matches > 0) console.log(`  ${token}: ${matches} substituições`)
  count += matches
  body = body.replace(re, token)
}

writeFileSync('src/app/globals.css', preamble + body, 'utf8')
console.log(`\n✓ Total: ${count} substituições`)
