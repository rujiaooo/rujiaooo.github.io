import * as React from "react"
import {
  ButtonTypeProps,
  ButtonType,
  ButtonVariantProps,
  ButtonVariant,
  ButtonSizeProps,
  ButtonSize,
  ButtonThemeProps,
  ButtonTheme,
  ButtonStyle
} from "./Resource"
import {
  ThemeContext
} from "./../Theme"

type ButtonProps = {
  children?: React.ReactNode
  theme?: ButtonThemeProps
  type?: ButtonTypeProps
  variant?: ButtonVariantProps
  size?: ButtonSizeProps
  disabled?: boolean
  appendClassNames?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const styleBuilder = new ButtonStyle()

export function Button(props: ButtonProps): React.JSX.Element {
  const themeCtx = React.useContext(ThemeContext)
  const {
    theme = themeCtx.theme || ButtonTheme.DEFAULT,
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.MEDIUM,
    type = ButtonType.BUTTON,
  } = props

  const handleClick = () => {
    props.onClick && props.onClick()
  }

  const styleClassNames = styleBuilder.
    setTheme(theme).
    setVariant(variant).
    setSize(size).
    setDisabled(props.disabled).
    appendClassNames(props.appendClassNames).
    build()

  return (
    <button type={type} onClick={handleClick}
      className={styleClassNames}
      disabled={props.disabled}
      style={props.style}>
      {props.children}
    </button>
  )
}
