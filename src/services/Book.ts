import { Status } from "./Status"

export interface BookService {
  SearchBook(p: SearchBookParam): Promise<SearchBookResult>
  GetBook(p: GetBookParam): Promise<GetBookResult>
  GetBookChapter(p: GetBookChapterParam): Promise<GetBookChapterResult>
}

export type SearchBookParam = {
  lng?: string
  page?: number
  total_items?: number
}

export type SearchBookResult = {
  error?: Status
  success?: Status
  data?: SearchBookData
}

type SearchBookData = {
  summary: SearchBookSumary
  items: SearchBookItem[]
}

type SearchBookSumary = {
  page: number
  total_items: number
}

type SearchBookItem = {
  slug: string
  name: string
  description?: string
}

export type GetBookParam = {
  lng?: string
  slug: string
}

export type GetBookResult = {
  error?: Status
  success?: Status
  data?: GetBookData
}

type GetBookData = {
  slug: string
  name: string
  description?: string
  chapters: Chapter[]
}

export type GetBookChapterParam = {
  lng?: string
  book: string
  slug: string
}

export type GetBookChapterResult = {
  error?: Status
  success?: Status
  data?: GetBookChapterData
}

type GetBookChapterData = {
  book: Book
  slug: string
  title: string
  description?: string
  content?: string
  summary?: string
  sections: Section[]
}

type Book = {
  slug: string
  name: string
  description?: string
  icon?: string
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
