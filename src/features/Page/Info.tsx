import * as React from "react"
import { To } from "react-router-dom"
import { ButtonLink } from "../../components/Button"

type InfoProps = {
  title?: string
  subtitle?: string
  actionText?: string
  actionTo?: To
}

export function Info(props: InfoProps): React.JSX.Element {
  const {
    title = "404",
    subtitle = "Oops! Page not found",
    actionText = "Back to Homepage",
    actionTo = "/"
  } = props

  return (
    <div aria-label="info"> {/*  @note: do not remove to avoid below element attributes disappear */}
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="my-4 flex flex-col gap-2 md:gap-4 justify-center items-center text-center">
          <h1 className="text-6xl md:text-8xl">
            {title}
          </h1>
          <h2 className="text-xl md:text-3xl">
            {subtitle}
          </h2>
        </div>
        <div className="my-6 flex flex-col justify-center items-center">
          <ButtonLink to={actionTo} size="lg">
            {actionText}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}