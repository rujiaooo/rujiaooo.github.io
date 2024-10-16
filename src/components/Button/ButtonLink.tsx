import * as React from "react"
import { To } from "react-router-dom"
import { Link } from "./../Router"
import {
  ButtonSizeProps,
  ButtonSize,
  ButtonVariantProps,
  ButtonVariant,
  ButtonTheme,
  ButtonThemeProps,
  ButtonStyle,
} from "./Resource"
import {
  ThemeContext
} from "./../Theme"

type ButtonLinkProps = {
  children?: React.ReactNode
  to: To
  target?: string
  hideCrawl?: boolean
  theme?: ButtonThemeProps,
  variant?: ButtonVariantProps
  size?: ButtonSizeProps
  appendClassNames?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const styleBuilder = new ButtonStyle()

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(function (props, ref): React.JSX.Element {
  const themeCtx = React.useContext(ThemeContext)
  const {
    theme = themeCtx.theme || ButtonTheme.DEFAULT,
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.MEDIUM,
  } = props

  const handleClick = () => {
    props.onClick && props.onClick()
  }

  const styleClassNames = styleBuilder.
    setTheme(theme).
    setVariant(variant).
    setSize(size).
    appendClassNames(props.appendClassNames).
    build()

  return (
    <Link ref={ref}
      to={props.to} target={props.target}
      hideCrawl={props.hideCrawl}
      className={styleClassNames}
      style={{ textDecoration: "none", ...props.style }}
      onClick={handleClick}>
      {props.children}
    </Link>
  )
})

export {
  ButtonLink
}