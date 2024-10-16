import * as React from "react"
import { SkeletonStyle } from "./Resource"

type SkeletonProps = {
  appendClassNames?: {
    container: () => string
  }
  width?: string
  height?: string
  children?: React.ReactNode
  rounded?: boolean
}

const skeletonStyle = new SkeletonStyle()

export function Skeleton(props: SkeletonProps): React.JSX.Element {
  const {
    width,
    height,
    rounded = false,
    children,
    appendClassNames = {
      container: () => { }
    }
  } = props

  const {
    container: appendContainerFn
  } = appendClassNames

  skeletonStyle.setRounded(rounded)

  const containerClassNames = skeletonStyle.buildContainer()

  return (
    <div className={containerClassNames + " " + (appendContainerFn && appendContainerFn())}
      style={{ width, height }}>
      {children ? children : <>&nbsp;</>}
    </div>
  )
}