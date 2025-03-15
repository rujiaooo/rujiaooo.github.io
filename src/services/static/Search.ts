import FlexSearch from "flexsearch"
import {
  SearchItemParam, SearchItemResult
} from "../Search"
import { BookService } from "../Book"
import { MusicService } from "../Music"
import {
  Status,
  ACTION_SUCCESS,
  ACTION_FAILED,
  UNEXPECTED_ERROR,
} from "../Status"
import { toPlain } from "../../valueconv"
import { lngs } from "../../assets/locales"

type Item = {
  slug: string
  path: string
  entity: string
  title: string
  description?: string
}

export class SearchService {

  private documents: FlexSearch.Document<unknown, string[]>
  private musicService: MusicService
  private bookService: BookService

  constructor(musicService: MusicService, bookService: BookService) {
    this.musicService = musicService
    this.bookService = bookService
    this.documents = new FlexSearch.Document({
      tokenize: "full",
      document: {
        id: "id",
        index: [
          {
            field: "title",
            optimize: true,
            resolution: 9
          },
          {
            field: "description",
            optimize: true,
            resolution: 5
          }
        ],
        store: [
          "slug",
          "path",
          "entity",
          "title",
          "description"
        ]
      }
    })
    this.indexDocuments(this.documents)
  }

  public async SearchItem(p: SearchItemParam): Promise<SearchItemResult> {
    try {
      const {
        query = "",
        page = 1,
        total_items,
      } = p

      const result = await this.documents.searchAsync(query, {
        enrich: true,
        limit: total_items,
      })
      if (!result) {
        return {
          error: new Status("failed search item", ACTION_FAILED)
        }
      }

      const dictionary = new Set()
      const items = []
      for (const entry of result) {
        for (const item of entry.result) {
          if (dictionary.has(item.id)) {
            continue
          }

          const document = item.doc as Item

          dictionary.add(item.id)
          items.push({
            slug: document.slug,
            url: `${document.path}`,
            entity: document.entity,
            title: document.title,
            description: document.description,
          })
        }
      }

      return {
        success: new Status("success search item", ACTION_SUCCESS),
        data: {
          summary: {
            page,
            total_items: items.length
          },
          items
        }
      }
    } catch (err: unknown) {
      const e = err as Error
      return {
        error: new Status(e.message, UNEXPECTED_ERROR)
      }
    }
  }

  private async indexDocuments(doc: FlexSearch.Document<unknown, string[]>) {
    for (const lng of lngs) {
      const searchMusic = await this.musicService.SearchMusic({
        lng
      })
      const searchBook = await this.bookService.SearchBook({
        lng
      })

      const musics = !searchMusic.error ? searchMusic.data?.items || [] : []
      const books = !searchBook.error ? searchBook.data?.items || [] : []

      if (lng === "id") {
        for (const music of musics) {
          doc.add({
            id: `music:${lng}:${music.slug}`,
            path: `/${lng}/music/${music.slug}`,
            entity: `music`,
            slug: `${music.slug}`,
            title: `${music.title}`,
            description: `${toPlain(music.content)}`,
          })
        }
      }

      for (const book of books) {
        doc.add({
          id: `book:${lng}:${book.slug}`,
          path: `/${lng}/book/${book.slug}`,
          entity: `book`,
          slug: `${book.slug}`,
          title: `${book.name}`,
          description: `${toPlain(book.description)}`,
        })

        for (const chapter of book.chapters) {
          doc.add({
            id: `book-chapter:${lng}:${book.slug}-${chapter.slug}`,
            path: `/${lng}/book/${book.slug}/${chapter.slug}`,
            entity: `book`,
            slug: `${book.slug}/${chapter.slug}`,
            title: `${chapter.title}`,
            description: `${toPlain(chapter.content)}`,
          })

          for (const section of chapter.sections) {
            doc.add({
              id: `book-section:${lng}:${book.slug}-${chapter.slug}-${section.slug}`,
              path: `/${lng}/book/${book.slug}/${chapter.slug}#${section.slug}`,
              entity: `book`,
              slug: `${book.slug}/${chapter.slug}#${section.slug}`,
              title: `${section.title}`,
              description: `${toPlain(section.content)}`,
            })
          }
        }
      }
    }
  }

}
