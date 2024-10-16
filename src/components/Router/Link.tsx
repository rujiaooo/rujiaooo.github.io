import * as React from "react"
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom"

type LinkProps = RouterLinkProps & {
  hideCrawl?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function (props, ref): React.JSX.Element {
  const {
    hideCrawl = false,
  } = props

  const isReactSnap = navigator && navigator.userAgent === "ReactSnap"

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ['hideCrawl']: _, ...linkProps } = props
  const linkComponent = <RouterLink {...linkProps} ref={ref}>{props.children}</RouterLink>

  if (!hideCrawl) {
    return linkComponent
  }

  return <>{!isReactSnap && linkComponent}</>
})

export {
  Link
}
