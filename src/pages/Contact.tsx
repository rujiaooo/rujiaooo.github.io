import * as React from "react"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"
import { useTranslator } from "../features/Translation"

type ContactProps = {
  lng?: string
}

export default function Contact(props: ContactProps): React.JSX.Element {
  const {
    lng
  } = props

  const { translate } = useTranslator({
    lng,
    ns: ["contact"]
  })

  useAutoPosition()
  useHashFragment()

  return (
    <>
      <Meta>
        {{
          title: translate(`contact:metaTitle`, { ns: ["contact"] }),
          description: translate(`contact:metaDescription`, { ns: ["contact"] })
        }}
      </Meta>

      <div className="py-5 md:py-10">
        <Container size="lg">
          <p className="font-semibold text-xl text-confucius-black">
            {translate(`contact:sectionTitle`, { ns: ["contact"] })}
          </p>

          <ul className="flex flex-col gap-2">
            <li className="">
              Email: {" "}
              <Link to={`mailto:admin@rujiao.web.id`}
                className="text-confucius-black hover:text-confucius-primary">
                admin@rujiao.web.id
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </>
  )
}