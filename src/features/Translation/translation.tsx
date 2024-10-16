import i18n, { Resource } from "i18next"
import Backend from "i18next-http-backend"
import { initReactI18next, useTranslation } from "react-i18next"

interface Translator {
  translate(key: string, opt?: TranslateOption): string
  changeLanguage(lng: string): Promise<unknown>
}

type TranslateOption = {
  lng?: string
  ns?: string[]
  fallbackLng?: string
}

type TranslatorProps = {
  ns?: string[]
  lng?: string
}

export function useTranslator(props?: TranslatorProps): Translator {
  const {
    ns,
    lng,
  } = props || {}

  const { i18n, t } = useTranslation(ns, {
    lng,
  })

  function changeLanguage(lng: string) {
    return i18n.changeLanguage(lng)
  }

  return {
    translate: t,
    changeLanguage
  }
}

type InitTranslationProps = {
  lng?: string
  fallbackLng?: string
  supportedLngs?: string[]
  debug?: boolean
  defaultNS?: string[]
  resources?: Resource
  useHttpFetch?: boolean
}

export function initTranslator(props: InitTranslationProps) {
  const {
    debug = false,
    useHttpFetch = false,
    lng,
    fallbackLng,
    supportedLngs,
    defaultNS,
    resources
  } = props

  const client = i18n.use(initReactI18next)

  if (useHttpFetch) {
    client.use(new Backend())
  }
  
  client.init({
    returnEmptyString: true,
    debug,
    supportedLngs,
    lng,
    fallbackLng,
    defaultNS,
    resources
  })
}