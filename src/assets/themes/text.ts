import { ThemeConfig } from "tailwindcss/types/config"

type Sizes = Partial<ThemeConfig & {
  extend: Partial<ThemeConfig>;
}>

export function textRange(sizes?: Sizes | undefined): Record<string, unknown> {
  return {
    'text-range'(value: string) {
      if (!sizes) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const split = value.split("-").map(v => sizes[v] ? sizes[v]['0'] : v)
      if (split.length < 2) {
        throw new Error('Min and Max value should be specified')
      }

      const base = split[0]
      const min = split[0].replace(/[^0-9]/g, "")
      const max = split[1].replace(/[^0-9]/g, "")

      return {
        fontSize: `calc(${base} + ((${max} - ${min})*(100vw - 640px))/(1920 - 640))`
      }
    }
  }
}