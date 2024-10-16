
export interface Translator {
  translate(key: string, opt?: TranslateOption): string
}

export type TranslateOption = {
  lng?: string
  ns?: string[]
  fallbackLng?: string
}
