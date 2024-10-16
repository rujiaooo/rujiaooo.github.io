import * as React from "react"

export function useRefs() {
  const refsByKey = React.useRef<Record<string, HTMLElement | null>>({})

  const setRefs = (element: HTMLElement | null, key: string) => {
    refsByKey.current[key] = element
  }

  return { refs: refsByKey.current, setRefs }
}