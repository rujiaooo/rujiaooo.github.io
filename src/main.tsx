import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App/App.tsx"
import { initGoogleAnalytics } from "./scripts/GoogleAnalytics"
import { initTranslator } from "./features/Translation"
import { reportWebVitals } from "./scripts/WebVitals.ts"
import { resources, lngs } from "./assets/locales"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

initGoogleAnalytics({
  gaId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID
})
initTranslator({
  fallbackLng: "id",
  supportedLngs: lngs,
  defaultNS: [
    "translation", "menus", "musics"
  ],
  resources
})
reportWebVitals()