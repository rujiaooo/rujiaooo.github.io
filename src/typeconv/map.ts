
export function toMap<T>(items?: T[]): Map<T, T> {
  const map = new Map<T, T>()
  if (!items) {
    return map
  }

  items.forEach(item => {
    map.set(item, item)
  })
  return map
}

export function toRecord<V>(map?: Map<string, V>): Record<string, V> {
  const record = {} as Record<string, V>
  if (!map) {
    return record
  }

  map.forEach((val, key) => {
    record[key] = val
  })
  return record
}
