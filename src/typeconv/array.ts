
export function chunks<T>(items: Array<T>, size: number): Array<Array<T>> {
  return items.reduce((acc: Array<Array<T>>, _, i) => {
    if (i % size === 0) {
      acc.push(items.slice(i, i + size))
    }
    return acc
  }, [])
}
