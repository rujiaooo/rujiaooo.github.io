import * as React from "react"
import { HiXMark } from "react-icons/hi2"
import {
  AlertVariant,
  AlertVariantProps,
  AlertStyle
} from "./Resource"

type AlertProps = {
  children?: {
    header?: React.ReactNode
    content?: React.ReactNode
  }
  variant?: AlertVariantProps
  opened?: boolean
  closeable?: boolean
  onClose?: () => void
}

const styleBuilder = new AlertStyle()

export function Alert(props: AlertProps): React.JSX.Element {
  const {
    opened = false,
    closeable = false,
    variant = AlertVariant.INFO
  } = props

  const handleClose = () => {
    if (!closeable) {
      return
    }
    props.onClose && props.onClose()
  }

  const styler = styleBuilder.setVariant(variant)
  const containerClass = styler.buildContainer()
  const itemClass = styler.buildTitle()

  return (
    <>
      {
        opened &&
        <div className={containerClass}>
          <div className="flex justify-start items-center w-full">
            <div>
              {
                props.children && props.children.header &&
                <div className={itemClass}>
                  {props.children.header}
                </div>
              }
              {
                props.children && props.children.content &&
                <div className="text-sm text-slate-800">
                  {props.children.content}
                </div>
              }
            </div>
          </div>

          {
            closeable &&
            <div className="flex justify-end items-center">
              <HiXMark onClick={handleClose} className="cursor-pointer rounded-full w-5 h-5 ml-2" aria-hidden="true" />
            </div>
          }
        </div>
      }
    </>
  )
}
