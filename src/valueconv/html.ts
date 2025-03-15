const div = document.createElement("div")

export function toPlain(content?: string): string {
  if (!content) {
    return ""
  }

  div.innerHTML = content
    .replaceAll("<br />", " ")
    .replaceAll("&nbsp;", " ")
  
  return div.textContent || div.innerText || ""
}
