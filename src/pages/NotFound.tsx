import * as React from "react"
import { Info } from "../features/Page"
import { Meta } from "../components/Meta"
import { useAutoPosition } from "../hooks"
import { useTranslator } from "../features/Translation"

type NotFoundProps = {
  lng?: string
}

export default function NotFound(props: NotFoundProps): React.JSX.Element {
  const {
    lng
  } = props
  const { translate } = useTranslator({
    lng,
    ns: ["not-found"]
  })
  const lngTo = lng === undefined ? "" : `/${lng}`

  useAutoPosition()

  return (
    <>
      <Meta>
        {{
          title: translate(`not-found:metaTitle`, { ns: ["not-found"] })
        }}
      </Meta>

      <Info
        title={translate(`not-found:errorCode`, { ns: ["not-found"] })}
        subtitle={translate(`not-found:errorMessage`, { ns: ["not-found"] })}
        actionText={translate(`not-found:errorActionText`, { ns: ["not-found"] })}
        actionTo={`${lngTo}`} />
    </>
  )
}