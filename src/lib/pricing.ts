export function parsePrice(value: string): number {
  return Number.parseFloat(value.replace(/[^\d,]/g, "").replace(",", ".")) || 0
}

export function calculateDiscountPercentage(anchorPrice: string, currentPrice: string): number {
  const anchor = parsePrice(anchorPrice)
  const current = parsePrice(currentPrice)
  if (anchor <= 0 || current <= 0 || current >= anchor) return 0
  return Math.round((1 - current / anchor) * 100)
}
