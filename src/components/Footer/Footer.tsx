import * as React from "react"
import { To } from "react-router-dom"
import { Container } from "../Container"
import { Link } from "../Router"

type FooterProps = {
  quoteText?: string
  menuItems?: MenuItem[]
}

type MenuItem = {
  to: To
  target?: string
  content: React.ReactNode
  hideCrawl?: boolean
  items?: MenuItem[]
}

export function Footer(props: FooterProps): React.JSX.Element {
  const {
    quoteText,
    menuItems = []
  } = props

  return (
    <footer className="w-full h-full bg-confucius-black">
      <Container size="lg">
        <div className="w-full h-full py-8 flex flex-col gap-x-2 gap-y-6">
          <div className="w-full h-full min-h-12 flex justify-start items-center">
            {
              quoteText &&
              <p className="text-white italic"
                dangerouslySetInnerHTML={{
                  __html: quoteText
                }}>
              </p>
            }
          </div>
          {
            menuItems.length > 0 &&
            <div className="flex flex-row flex-wrap gap-4 justify-start items-center">
              {
                menuItems.map((item, i) => {
                  return (
                    <React.Fragment key={`menu-item-${i}`}>
                      <Link className="text-white hover:text-confucius-primary" to={item.to} target={item.target} hideCrawl={item.hideCrawl}>
                        {item.content}
                      </Link>
                    </React.Fragment>
                  )
                })
              }
            </div>
          }
        </div>
      </Container>
    </footer>
  )
}