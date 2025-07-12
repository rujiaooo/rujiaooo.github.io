import { convert } from "html-to-text"

export function toPlain(content?: string): string {
  if (!content) {
    return ""
  }

  return convert(content)
}
