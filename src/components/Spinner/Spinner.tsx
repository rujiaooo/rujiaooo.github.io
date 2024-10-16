import * as React from "react"
import {
  SpinnerSize,
  SpinnerSizeProps,
  SpinnerVariant,
  SpinnerVariantProps,
  SpinnerStyle
} from "./Resource"

type SpinnerProps = {
  labeled?: boolean
  label?: string
  appendClassNames?: string
  size?: SpinnerSizeProps
  variant?: SpinnerVariantProps
}

const styleBuilder = new SpinnerStyle()

export function Spinner(props: SpinnerProps): React.JSX.Element {
  const {
    labeled = false,
    label = "Loading...",
    appendClassNames = "",
    size = SpinnerSize.MEDIUM,
    variant = SpinnerVariant.PRIMARY
  } = props

  const containerClass = styleBuilder
    .setSize(size)
    .setVariant(variant)
    .appendClassNames(appendClassNames)
    .buildContainer()

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <div aria-label="loading" className={containerClass}>
          <span className="sr-only">...</span>
        </div>
        {
          labeled &&
          <p className="animate-pulse my-2">
            {label}
          </p>
        }
      </div>
    </>
  )
}
