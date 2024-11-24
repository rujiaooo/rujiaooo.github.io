import { Status } from "./Status"

export interface MusicService {
  SearchMusic(p: SearchMusicParam): Promise<SearchMusicResult>
  GetMusic(p: GetMusicParam): Promise<GetMusicResult>
}

export type SearchMusicParam = {
  lng?: string
  page?: number
  total_items?: number
  first_char?: string
}

export type SearchMusicResult = {
  error?: Status
  success?: Status
  data?: SearchMusicData
}

type SearchMusicData = {
  summary: SearchMusicSumary
  items: SearchMusicItem[]
}

type SearchMusicSumary = {
  page: number
  total_items: number
}

type SearchMusicItem = {
  slug: string
  title: string
  content?: string
  videos: string[]
  contributions: Contribution[]
}

export type GetMusicParam = {
  slug: string
}

export type GetMusicResult = {
  error?: Status
  success?: Status
  data?: GetMusicData
}

type GetMusicData = {
  slug: string
  title: string
  content?: string
  videos: string[]
  contributions: Contribution[]
  prev?: GetMusicData
  next?: GetMusicData
}

type Contribution = {
  people: People
  role: string
}

type People = {
  slug: string
  name: string
  honors: Honor[]
}

type Honor = {
  slug: string
  name: string
  caller: string
}