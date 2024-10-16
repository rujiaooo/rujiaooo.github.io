import * as React from "react"
import { toast, ToastOptions } from "react-toastify"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type ToastProps = {
  appearDelay?: number
  closeDelay?: number
}

export function useToast(props?: ToastProps) {
  function mapOption(opt?: ToastProps): ToastOptions {
    return {
      ...props || {},
      autoClose: opt?.appearDelay,
      delay: opt?.closeDelay,
    }
  }

  const wrapper = {
    info: (msg: React.ReactNode, opt?: ToastProps) => {
      toast.info(msg, mapOption(opt))
    },
    warn: (msg: React.ReactNode, opt?: ToastProps) => {
      toast.warn(msg, mapOption(opt))
    },
    error: (msg: React.ReactNode, opt?: ToastProps) => {
      toast.error(msg, mapOption(opt))
    },
    success: (msg: React.ReactNode, opt?: ToastProps) => {
      toast.success(msg, mapOption(opt))
    },
  }

  return { toast: wrapper }
}

type ContainerProps = {
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left"
}

export function createContainer(props?: ContainerProps): React.JSX.Element {
  const {
    position,
  } = props || {}

  return (
    <ToastContainer position={position} />
  )
}