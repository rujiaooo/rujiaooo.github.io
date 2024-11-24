import { Status } from "./Status"

export interface Search {
  SearchItem(p: SearchItemParam): Promise<SearchItemResult>
}

export type SearchItemParam = {
  lng?: string
  page?: number
  total_items?: number
  query?: string
}

export type SearchItemResult = {
  error?: Status
  success?: Status
  data?: SearchItemData
}

type SearchItemData = {
  summary: SearchItemSumary
  items: SearchItem[]
}

type SearchItemSumary = {
  page: number
  total_items: number
}

type SearchItem = {
  slug: string
  url: string
  entity: string
  title: string
  description?: string
}

export enum Entity {
  Music = "music",
  Book = "book"
}
