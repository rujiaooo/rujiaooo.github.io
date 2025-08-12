import * as React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { usePage } from "../hooks"
import { useTranslator } from "../features/Translation"
import { createContainer } from "../features/Toast"

export default function Guest(): React.JSX.Element {
  const { lng } = usePage()
  const lngTo = lng === undefined ? "" : `/${lng}`
  const { translate } = useTranslator()

  return (
    <>
      {
        createContainer({
          position: "top-center"
        })
      }

      <div className="font-roboto">
        <Header
          logoUrl={`${lngTo}`}
          logoImage={`/image/confucius-logo.png`}
          menuItems={[
            {
              content: translate("menuItem.music", { lng }),
              to: `${lngTo}/music`
            },
            {
              content: translate("menuItem.book", { lng }),
              to: `${lngTo}/book`
            },
            {
              content: translate("menuItem.contact", { lng }),
              to: `${lngTo}/contact`
            },
            {
              content: translate("menuItem.search", { lng }),
              to: `${lngTo}/search`
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
          menuItems={[
            {
              to: "/p/privacy-policy",
              content: "Privacy Policy"
            },
            {
              to: "/p/terms-of-service",
              content: "Terms of Service"
            },
          ]}
          quoteText={translate("footerQuoteText", { lng })} />
      </div>
    </>
  )
}