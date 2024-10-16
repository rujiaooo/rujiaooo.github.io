import plugin from "tailwindcss/plugin"

import { PluginAPI } from "tailwindcss/types/config"
import { textRange } from "./text"

export default plugin.withOptions(() => {
  return (({ matchUtilities, theme }: PluginAPI) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    matchUtilities(textRange(theme("fontSize")))
  })
})
