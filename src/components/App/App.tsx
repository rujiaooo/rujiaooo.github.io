import * as React from "react"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "../Theme"
import { MetaProvider } from "../Meta"
import { Spinner } from "../Spinner"
import { router } from "./routes"
import "./App.css"

const meta = {
  titleTemplate: "ConfuciusID - %s",
  titleFallback: "ConfuciusID",
  descriptionFallback: "Ada pendidikan tiada perbedaan",
  keywordsFallback: "confucius, kongzi, khonghucu, indonesia, chinese, religion, philosophy",
  typeFallback: "website",
  urlFallback: window.location.href,
  imageFallback: `${import.meta.env.VITE_PUBLIC_URL}/image/confucius-meta.png`,
  markupSchemaFallback: {
    "@context": "https://schema.org",
    "@type": "Website",
    "name": "ConfuciusID",
    "image": "https://confucius.github.io/image/confucius-logo.png",
    "@id": "https://confucius.github.io/",
    "url": "https://confucius.github.io/",
    "sameAs": [
      "https://www.youtube.com/@confucius-id"
    ]
  },
  twitterSchemaFallback: {
    "card": "summary_large_image",
  }
}
function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <MetaProvider meta={meta}>
        <RouterProvider router={router} />
      </MetaProvider>
    </ThemeProvider>
  )
}

export default function WrappedApp(): React.JSX.Element {
  return (
    <Suspense fallback={
      <div className="h-screen flex justify-center items-center">
        <Spinner label="Loading..." labeled />
      </div>
    }>
      <App />
    </Suspense>
  )
}