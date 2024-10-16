import { I18nextProvider } from "react-i18next"
import i18n from "i18next"

type TranslationProviderProps = {
  children?: React.ReactNode
  ns?: string[]
}

export function TranslationProvider(props: TranslationProviderProps) {
  const {
    children,
    ns = [],
  } = props

  return (
    <I18nextProvider i18n={i18n} defaultNS={ns}>
      {children}
    </I18nextProvider>
  )
}