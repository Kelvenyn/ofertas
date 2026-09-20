export interface VersionedValue<T> {
  value: T
  etag?: string
}

export interface VersionedUpdate<TNext, R> {
  value: TNext
  result: R
}

interface UpdateVersionedValueOptions<TCurrent, TNext, R> {
  read: () => Promise<VersionedValue<TCurrent>>
  update: (current: TCurrent) => VersionedUpdate<TNext, R>
  write: (value: TNext, etag?: string) => Promise<unknown>
  isConflict: (error: unknown) => boolean
  maxAttempts?: number
}

const CONFLICT_RETRY_DELAY_MS = 20

export async function updateVersionedValue<TCurrent, TNext, R>({
  read,
  update,
  write,
  isConflict,
  maxAttempts = 3,
}: UpdateVersionedValueOptions<TCurrent, TNext, R>): Promise<R> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const current = await read()
    const next = update(current.value)

    try {
      await write(next.value, current.etag)
      return next.result
    } catch (error) {
      if (!isConflict(error) || attempt === maxAttempts - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, CONFLICT_RETRY_DELAY_MS * (attempt + 1)))
    }
  }

  throw new Error("A gravação não foi concluída.")
}
