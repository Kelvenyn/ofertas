export {}

declare global {
  interface Window {
    trackhub?: {
      id: string
      track: (eventName: string, params?: Record<string, unknown>) => Promise<unknown>
      identify: () => Promise<unknown>
    }
  }
}
