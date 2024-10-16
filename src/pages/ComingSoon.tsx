import * as React from "react"
import { Info } from "../features/Page"
import { Meta } from "../components/Meta"
import { useAutoPosition } from "../hooks"
import { useTranslator } from "../features/Translation"

type ComingSoonProps = {
  lng?: string
}

export default function ComingSoon(props: ComingSoonProps): React.JSX.Element {
  const {
    lng
  } = props
  const { translate } = useTranslator({
    lng,
    ns: ["coming-soon"]
  })
  const lngTo = lng === undefined ? "" : `/${lng}`

  useAutoPosition()

  return (
    <>
      <Meta>
        {{
          title: translate(`coming-soon:metaTitle`, { ns: ["coming-soon"] })
        }}
      </Meta>

      <Info
        title={translate(`coming-soon:errorCode`, { ns: ["coming-soon"] })}
        subtitle={translate(`coming-soon:errorMessage`, { ns: ["coming-soon"] })}
        actionText={translate(`coming-soon:errorActionText`, { ns: ["coming-soon"] })}
        actionTo={`${lngTo}`} />
    </>
  )
}