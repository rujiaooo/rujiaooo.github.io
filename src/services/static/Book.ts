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

type BookItem = {
  slug: string
  name: string
  description?: string
}

type Book = {
  slug: string
  name: string
  description?: string
  chapters: Chapter[]
}

type Chapter = {
  slug: string
  title: string
  description?: string
  content?: string
  summary?: string
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
        description: chapter.description || undefined,
        content: chapter.content ? he.decode(chapter.content) : undefined,
        summary: chapter.summary ? he.decode(chapter.summary) : undefined,
      }
    }))

    this.books = bookSources.map((book: BookItem) => {
      return {
        slug: book.slug,
        name: book.name,
        description: book.description ? he.decode(book.description) : undefined,
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
              description: this.translator.translate(`books:${book.slug}.description`, { lng, ns: ["books"] }),
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

      const book = this.books.find((book) => {
        return book.slug === slug
      })
      if (!book) {
        return {
          error: new Status("book not available", RESOURCE_NOTFOUND),
        }
      }

      return {
        success: new Status("success get book", ACTION_SUCCESS),
        data: {
          ...book,
          name: this.translator.translate(`books:${book.slug}.name`, { lng, ns: ["books"] }),
          description: this.translator.translate(`books:${book.slug}.description`, { lng, ns: ["books"] }),
          chapters: book.chapters.map((chapter) => {
            return {
              ...chapter,
              title: this.translator.translate(`${book.slug}:chapters.${chapter.slug}.title`, { lng, ns: [book.slug] }),
              description: chapter.description ?
                this.translator.translate(`${book.slug}:chapters.${chapter.slug}.description`, { lng, ns: [book.slug] }) :
                undefined,
              content: chapter.content ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.content`, { lng, ns: [book.slug] })) :
                undefined,
              summary: chapter.summary ?
                he.decode(this.translator.translate(`${book.slug}:chapters.${chapter.slug}.summary`, { lng, ns: [book.slug] })) :
                undefined,
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

      const chapter = book.chapters.find((chapter) => {
        return chapter.slug === slug
      })
      if (!chapter) {
        return {
          error: new Status("chapter not available", RESOURCE_NOTFOUND),
        }
      }

      return {
        success: new Status("success get book", ACTION_SUCCESS),
        data: {
          ...chapter,
          title: this.translator.translate(`${book.slug}:chapters.${chapter.slug}.title`, { lng, ns: [book.slug] }),
          description: chapter.description ?
            this.translator.translate(`${book.slug}:chapters.${chapter.slug}.description`, { lng, ns: [book.slug] }) :
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
            description: this.translator.translate(`books:${book.slug}.description`, { lng, ns: ["books"] }),
          }
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
