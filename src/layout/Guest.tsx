import * as React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { usePage } from "../hooks"
import { useTranslator } from "../features/Translation"

export default function Guest(): React.JSX.Element {
  const { lng } = usePage()
  const { translate } = useTranslator()

  return (
    <div className="font-roboto">
      <Header
        logoUrl={`/${lng}`}
        logoImage={`/image/confucius-logo.png`}
        menuItems={[
          {
            content: translate("menuItem.music", { lng }),
            to: `/${lng}/music`
          },
          {
            content: translate("menuItem.book", { lng }),
            to: `/${lng}/book`
          },
          {
            content: translate("menuItem.contact", { lng }),
            to: `/${lng}/contact`
          }
        ]}
        linkItems={[
          {
            content: "ID",
            to: "/id"
          },
          {
            content: "EN",
            to: "/en"
          },
          {
            content: "中文",
            to: "/zh",
          },
        ]}
        sticky />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer
        quoteText={translate("footerQuoteText", { lng })} />
    </div>
  )
}