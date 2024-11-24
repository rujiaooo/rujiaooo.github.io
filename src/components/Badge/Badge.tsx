import * as React from "react"
import {
  BadgeVariant,
  BadgeVariantProps,
  BadgeSize,
  BadgeSizeProps,
  BadgeStyle,
} from "./Resource"

type BadgeProps = {
  children?: React.ReactNode
  variant?: BadgeVariantProps
  size?: BadgeSizeProps
  appendClassNames?: string
}

const styleBuilder = new BadgeStyle()

export function Badge(props: BadgeProps): React.JSX.Element {
  const {
    variant = BadgeVariant.PRIMARY,
    size = BadgeSize.MEDIUM,
    appendClassNames = "",
  } = props

  const elementClassNames = styleBuilder
    .setVariant(variant)
    .setSize(size)
    .setAppendClassNames(appendClassNames)
    .buildElement()

  return (
    <span className={elementClassNames}>
      {props.children}
    </span>
  )
}