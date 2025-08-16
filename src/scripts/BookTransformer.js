// eslint-disable-next-line @typescript-eslint/no-unused-vars
import book from "../assets/data/shujing.json" assert { type: "json" }
import fs from "fs"

function main() {
  const result = {
    chapters: {}
  }
  for (const chapter of book.chapters) {
    const sections = {}
    for (const section of chapter.sections) {
      sections[section.slug] = {
        title: section.title,
        description: section.description,
        content: section.content,
        note: section.note,
      }
    }

    result.chapters[chapter.slug] = {
      title: chapter.title,
      description: chapter.description,
      content: chapter.content,
      summary: chapter.summary,
      note: chapter.note,
      sections
    }
  }

  const resultText = JSON.stringify(result)
  fs.writeFileSync(`./result.json`, resultText)
}

main()
