import * as React from "react"

type Theme = {
  theme?: string
}

export const ThemeContext = React.createContext<Theme>({})
const { Consumer, Provider } = ThemeContext

type ThemeProviderProps = {
  children?: React.ReactNode
  theme?: string
}

export function ThemeProvider(props: ThemeProviderProps): React.JSX.Element {
  return (
    <Provider value={{ theme: props.theme }}>
      {props.children}
    </Provider>
  )
}

export {
  Consumer as ThemeConsumer
}
