import * as React from "react"
import {
  ContainerSize,
  ContainerSizeProps,
  ContainerStyle,
  ContainerTheme,
  ContainerThemeProps,
} from "./Resource"
import {
  ThemeContext
} from "./../Theme"

type ContainerProps = {
  children?: React.ReactNode
  theme?: ContainerThemeProps
  size?: ContainerSizeProps
  appendClassNames?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const styleBuilder = new ContainerStyle()

export function Container(props: ContainerProps): React.JSX.Element {
  const themeCtx = React.useContext(ThemeContext)
  const {
    theme = themeCtx.theme || ContainerTheme.DEFAULT,
    size = ContainerSize.MEDIUM,
    appendClassNames,
  } = props

  const handleClick = () => {
    props.onClick && props.onClick()
  }

  const styleClassNames = styleBuilder.
    setTheme(theme).
    setSize(size).
    appendClassNames(appendClassNames).
    build()

  return (
    <div onClick={handleClick}
      className={styleClassNames}
      style={props.style}>
      {props.children}
    </div>
  )
}
