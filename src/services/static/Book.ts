import he from "he"
import i18n from "i18next"
import {
  SearchBookParam, SearchBookResult,
  GetBookParam, GetBookResult,
  GetBookChapterParam, GetBookChapterResult
} from "../Book"
import { Translator } from "../Translation"
import { I18nTranslator } from "../i18next/Translation"
import {
  Status,
  ACTION_SUCCESS,
  UNEXPECTED_ERROR,
  RESOURCE_NOTFOUND,
} from "../Status"
import bookSources from "../../assets/data/books.json"
import xiaojingSources from "../../assets/data/xiaojing.json"
import daxueSources from "../../assets/data/daxue.json"
import zhongyongSources from "../../assets/data/zhongyong.json"
import lunyuSources from "../../assets/data/lunyu.json"
import mengziSources from "../../assets/data/mengzi.json"
import lijingSources from "../../assets/data/lijing.json"

type BookItem = {
  slug: string
  name: string
  description?: string
  icon?: string
}

type Book = {
  slug: string
  name: string
  description?: string
  icon?: string
  chapters: Chapter[]
}

type Chapter = {
  slug: string
  title: string
  description?: string
  content?: string
  summary?: string
  sections: Section[]
}

type Section = {
  slug: string
  title: string
  description?: string
  content?: string
  note?: string
}

export class BookService {

  private translator: Translator
  private books: Book[] = []

  constructor() {
    this.translator = new I18nTranslator(i18n)

    const chapters = new Map<string, Chapter[]>()
    chapters.set("xiaojing", xiaojingSources.chapters.map((chapter) => {
      return {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description ? he.decode(chapter.description) : undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
        sections: []
      }
    }))
    chapters.set("daxue", daxueSources.chapters.map((chapter) => {
      return {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description ? he.decode(chapter.description) : undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
        sections: chapter.sections.map((section) => {
          return {
            ...section,
            description: section.description ? he.decode(section.description) : undefined,
            content: section.content ? he.decode(section.content) : undefined,
          }
        })
      }
    }))
    chapters.set("zhongyong", zhongyongSources.chapters.map((chapter) => {
      return {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description ? he.decode(chapter.description) : undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
        sections: chapter.sections.map((section) => {
          return {
            ...section,
            description: section.description ? he.decode(section.description) : undefined,
            content: section.content ? he.decode(section.content) : undefined,
          }
        })
      }
    }))
    chapters.set("lunyu", lunyuSources.chapters.map((chapter) => {
      return {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description ? he.decode(chapter.description) : undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
        sections: chapter.sections.map((section) => {
          return {
            ...section,
            description: section.description ? he.decode(section.description) : undefined,
            content: section.content ? he.decode(section.content) : undefined,
          }
        })
      }
    }))
    chapters.set("mengzi", mengziSources.chapters.map((chapter) => {
      return {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description ? he.decode(chapter.description) : undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
        sections: chapter.sections.map((section) => {
          return {
            ...section,
            description: section.description ? he.decode(section.description) : undefined,
            content: section.content ? he.decode(section.content) : undefined,
          }
        })
      }
    }))
    chapters.set("lijing", lijingSources.chapters.map((chapter) => {
      return {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description ? he.decode(chapter.description) : undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
        sections: chapter.sections.map((section) => {
          return {
            ...section,
            description: section.description ? he.decode(section.description) : undefined,
            content: section.content ? he.decode(section.content) : undefined,
          }
        })
      }
    }))

    this.books = bookSources.map((book: BookItem) => {
      return {
        slug: book.slug,
        name: book.name,
        description: book.description ? he.decode(book.description) : undefined,
        icon: book.icon || undefined,
        chapters: chapters.has(book.slug) ? chapters.get(book.slug)! : []
      }
    })
  }

  public async SearchBook(p: SearchBookParam): Promise<SearchBookResult> {
    try {
      const {
        lng,
        page = 1,
        total_items,
      } = p

      let books = this.books

      const totalItems = books.length

      if (page && Number.isInteger(page) && total_items && Number.isInteger(total_items)) {
        const last = page * total_items
        const first = last - total_items

        books = books.slice(first, last)
      }

      return {
        success: new Status("success search book", ACTION_SUCCESS),
        data: {
          summary: {
            page,
            total_items: totalItems
          },
          items: books.map((book) => {
            return {
              ...book,
              name: this.translator.translate(`books:${book.slug}.name`, { lng, ns: ["books"] }),
              description: he.decode(this.translator.translate(`books:${book.slug}.description`, { lng, ns: ["books"] })),
              chapters: book.chapters.map((chapter) => {
                return {
                  ...chapter,
                  title: this.translator.translate(`${book.slug}:chapters.${chapter.slug}.title`, { lng, ns: [book.slug] }),
                  description: chapter.description ?
                    he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.description`, { lng, ns: [book.slug] })) :
                    undefined,
                  content: chapter.content ?
                    he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.content`, { lng, ns: [book.slug] })) :
                    undefined,
                  summary: chapter.summary ?
                    he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.summary`, { lng, ns: [book.slug] })) :
                    undefined,
                  sections: chapter.sections.map((section) => {
                    return {
                      ...section,
                      description: section.description ?
                        he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.sections.${section.slug}.description`, { lng, ns: [book.slug] })) :
                        undefined,
                      content: section.content ?
                        he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.sections.${section.slug}.content`, { lng, ns: [book.slug] })) :
                        undefined,
                    }
                  })
                }
              }),
            }
          })
        }
      }
    } catch (err: unknown) {
      const e = err as Error
      return {
        error: new Status(e.message, UNEXPECTED_ERROR)
      }
    }
  }

  public async GetBook(p: GetBookParam): Promise<GetBookResult> {
    try {
      const {
        lng,
        slug
      } = p

      const bookIdx = this.books.findIndex((book) => {
        return book.slug === slug
      })
      if (bookIdx === -1) {
        return {
          error: new Status("book not available", RESOURCE_NOTFOUND),
        }
      }

      const book = this.books[bookIdx]
      let prev: Book | undefined = undefined
      let next: Book | undefined = undefined
      if (bookIdx > 0) {
        prev = this.books[bookIdx - 1]
      }

      if (bookIdx + 1 < this.books.length) {
        next = this.books[bookIdx + 1]
      }

      return {
        success: new Status("success get book", ACTION_SUCCESS),
        data: {
          ...book,
          name: this.translator.translate(`books:${book.slug}.name`, { lng, ns: ["books"] }),
          description: he.decode(this.translator.translate(`books:${book.slug}.description`, { lng, ns: ["books"] })),
          chapters: book.chapters.map((chapter) => {
            return {
              ...chapter,
              title: this.translator.translate(`${book.slug}:chapters.${chapter.slug}.title`, { lng, ns: [book.slug] }),
              description: chapter.description ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.description`, { lng, ns: [book.slug] })) :
                undefined,
              content: chapter.content ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.content`, { lng, ns: [book.slug] })) :
                undefined,
              summary: chapter.summary ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.summary`, { lng, ns: [book.slug] })) :
                undefined,
              sections: chapter.sections.map((section) => {
                return {
                  ...section,
                  description: section.description ?
                    he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.sections.${section.slug}.description`, { lng, ns: [book.slug] })) :
                    undefined,
                  content: section.content ?
                    he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.sections.${section.slug}.content`, { lng, ns: [book.slug] })) :
                    undefined,
                }
              })
            }
          }),
          prev,
          next
        }
      }
    } catch (err: unknown) {
      const e = err as Error
      return {
        error: new Status(e.message, UNEXPECTED_ERROR)
      }
    }
  }

  public async GetBookChapter(p: GetBookChapterParam): Promise<GetBookChapterResult> {
    try {
      const {
        lng,
        book: bookSlug,
        slug
      } = p

      const book = this.books.find((book) => {
        return book.slug === bookSlug
      })
      if (!book) {
        return {
          error: new Status("book not available", RESOURCE_NOTFOUND),
        }
      }

      const chapterIdx = book.chapters.findIndex((chapter) => {
        return chapter.slug === slug
      })
      if (chapterIdx === -1) {
        return {
          error: new Status("chapter not available", RESOURCE_NOTFOUND),
        }
      }

      const chapter = book.chapters[chapterIdx]
      let prev: Chapter | undefined = undefined
      let next: Chapter | undefined = undefined
      if (chapterIdx > 0) {
        prev = book.chapters[chapterIdx - 1]
      }

      if (chapterIdx + 1 < book.chapters.length) {
        next = book.chapters[chapterIdx + 1]
      }

      return {
        success: new Status("success get book", ACTION_SUCCESS),
        data: {
          ...chapter,
          title: this.translator.translate(`${book.slug}:chapters.${chapter.slug}.title`, { lng, ns: [book.slug] }),
          description: chapter.description ?
            he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.description`, { lng, ns: [book.slug] })) :
            undefined,
          content: chapter.content ?
            he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.content`, { lng, ns: [book.slug] })) :
            undefined,
          summary: chapter.summary ?
            he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.summary`, { lng, ns: [book.slug] })) :
            undefined,
          book: {
            ...book,
            name: this.translator.translate(`books:${book.slug}.name`, { lng, ns: ["books"] }),
            description: he.decode(this.translator.translate(`books:${book.slug}.description`, { lng, ns: ["books"] })),
          },
          sections: chapter.sections.map((section) => {
            return {
              ...section,
              description: section.description ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.sections.${section.slug}.description`, { lng, ns: [book.slug] })) :
                undefined,
              content: section.content ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.sections.${section.slug}.content`, { lng, ns: [book.slug] })) :
                undefined,
            }
          }),
          prev,
          next
        }
      }
    } catch (err: unknown) {
      const e = err as Error
      return {
        error: new Status(e.message, UNEXPECTED_ERROR)
      }
    }
  }

}
