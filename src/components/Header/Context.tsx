import * as React from "react"

type Header = {
  intersector?: React.RefObject<HTMLElement>
  factor: number
}

type Context = {
  header: Header
  setHeader: React.Dispatch<React.SetStateAction<Header>>
}

export const HeaderContext = React.createContext<Context>({} as Context)
const { Consumer, Provider } = HeaderContext

type HeaderProviderProps = {
  children?: React.ReactNode
  intersector?: React.RefObject<HTMLElement>
  factor?: number
}

export function HeaderProvider(props: HeaderProviderProps): React.JSX.Element {
  const {
    intersector,
    factor = 1,
  } = props

  const [header, setHeader] = React.useState<Header>({
    intersector,
    factor,
  })

  return (
    <Provider value={{
      header,
      setHeader
    }}>
      {props.children}
    </Provider>
  )
}

export {
  Consumer as HeaderConsumer
}