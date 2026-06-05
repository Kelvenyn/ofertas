import { readFileSync, writeFileSync } from 'fs'

const DEAD_CLASS_ANCHORS = [
  '.pk-top-timer',
  '.hero-bonos',
  '.bonus-badge {',
  '.org-anos-wrap',
  '.titulo-entregaveis {',
  '.neuro-processo {',
  '.bonos-wrap {',
  '.acesso-material-wrap',
  '.creator-section',
  '.pei-promo-banner',
  '.garantia-pei-wrap',
  '.qs-social-wrap',
]

const css = readFileSync('src/app/globals.css', 'utf8')
const blockHeaderRe = /\/\* ={5,} .+ ={5,} \*\//g

const parts = []
let last = 0
let m
while ((m = blockHeaderRe.exec(css)) !== null) {
  parts.push({ type: 'content', text: css.slice(last, m.index) })
  parts.push({ type: 'header', text: m[0], start: m.index })
  last = m.index + m[0].length
}
parts.push({ type: 'content', text: css.slice(last) })

const blocks = []
for (let i = 0; i < parts.length; i++) {
  if (parts[i].type === 'header') {
    const content = parts[i + 1]?.type === 'content' ? parts[i + 1].text : ''
    blocks.push({ header: parts[i].text, content })
    i++
  } else if (i === 0 && parts[i].type === 'content') {
    blocks.push({ header: null, content: parts[i].text })
  }
}

const kept = blocks.filter(block => {
  if (!block.header) return true
  const combined = block.header + block.content
  return !DEAD_CLASS_ANCHORS.some(anchor => combined.includes(anchor))
})

const result = kept.map(b => b.header ? b.header + b.content : b.content).join('')
writeFileSync('src/app/globals.css', result, 'utf8')

const removed = blocks.length - kept.length
console.log(`✓ Removed ${removed} dead CSS blocks. Original: ${blocks.length}, kept: ${kept.length}`)
