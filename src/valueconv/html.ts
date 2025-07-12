import { convert } from "html-to-text"

export function toPlain(content?: string): string {
  if (!content) {
    return ""
  }

  // @note: cannot do the prerender if we're using the `convert` function
  // that's why we're just `returning` the content as it's
  const isReactSnap = typeof window !== "undefined" && window.navigator && window.navigator.userAgent === "ReactSnap"
  if (isReactSnap) {
    return content
  }

  return convert(content)
}
