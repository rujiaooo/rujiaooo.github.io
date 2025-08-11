import * as React from "react"
import { Container } from "../Container"
import { Link } from "../Router"

type FooterProps = {
  quoteText?: string
}

export function Footer(props: FooterProps): React.JSX.Element {
  const {
    quoteText
  } = props

  return (
    <footer className="w-full h-full bg-confucius-black">
      <Container size="lg">
        <div className="w-full h-full min-h-12 py-8 flex justify-start items-center">
          {
            quoteText &&
            <p className="text-white italic"
              dangerouslySetInnerHTML={{
                __html: quoteText
              }}>
            </p>
          }
        </div>
      </Container>
      <div className="hidden">
        <Link to="/p/privacy-policy">
          Privacy Policy
        </Link>
        <Link to="/p/terms-of-service">
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}