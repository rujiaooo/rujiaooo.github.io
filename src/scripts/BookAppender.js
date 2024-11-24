// eslint-disable-next-line @typescript-eslint/no-unused-vars
import book from "../assets/data/xiaojing.json" assert { type: "json" }
import fs from "fs"

function main() {
  const result = {
    chapters: []
  }

  for (const chapter of book.chapters) {
    const sections = []
    for (const section of chapter.sections) {
      sections.push({
        ...section,
        title: `Xiao Jing ${chapter.title.replace("Bab ", "")}:${section.slug}`
      })
    }

    result.chapters.push({
      ...chapter,
      title: `Xiao Jing ${chapter.title.replace("Bab ", "")}`,
      sections
    })
  }

  const resultText = JSON.stringify(result)
  fs.writeFileSync(`./result.json`, resultText)
}

main()
