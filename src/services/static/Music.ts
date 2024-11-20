import he from "he"
import {
  GetMusicParam, GetMusicResult,
  SearchMusicParam, SearchMusicResult
} from "../Music"
import {
  Status,
  ACTION_SUCCESS,
  UNEXPECTED_ERROR,
  RESOURCE_NOTFOUND,
} from "../Status"
import peopleSources from "../../assets/data/people.json"
import musicSources from "../../assets/data/musics.json"
import honorSources from "../../assets/data/honors.json"

type PeopleItem = {
  slug: string
  name: string
  honors: string[]
}

type MusicItem = {
  slug: string
  title: string
  content?: string
  videos: string[]
  contributions: ContributionItem[]
}

type ContributionItem = {
  people: string
  role: string
}

type Music = {
  slug: string
  title: string
  content?: string
  videos: string[]
  contributions: Contribution[]
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

export class MusicService {

  private musics: Music[] = []

  constructor() {
    const honors = new Map<string, Honor>(honorSources.map((honor) => {
      return [
        honor.slug,
        honor
      ]
    }))

    const p = peopleSources.map((person: PeopleItem) => {
      return {
        slug: person.slug,
        name: person.name,
        honors: person.honors,
      }
    })
    const people = new Map<string, People>(p.map((person) => {
      return [
        person.slug,
        {
          ...person,
          honors: person.honors
            .filter((honor) => honors.has(honor))
            .map((honor) => {
              return honors.get(honor)!
            })
        }
      ]
    }))

    this.musics = musicSources.map((music: MusicItem) => {
      return {
        slug: music.slug,
        title: music.title,
        content: music.content ? he.decode(music.content) : undefined,
        videos: music.videos.map((video) => {
          return `//www.youtube.com/embed/${video}?autohide=true&amp;autoplay=true&amp;color=%23444444&amp;hq=true&amp;jsapi=false&amp;modestbranding=true`
        }),
        contributions: music.contributions
          .filter((contribution) => people.has(contribution.people))
          .map((contribution) => {
            return {
              role: contribution.role,
              people: people.get(contribution.people)!
            }
          })
      }
    })
  }

  public async SearchMusic(p: SearchMusicParam): Promise<SearchMusicResult> {
    try {
      const {
        page = 1,
        total_items,
        first_char,
      } = p

      let musics = this.musics

      if (first_char) {
        musics = musics.filter((music) => {
          return music.title.startsWith(first_char)
        })
      }

      const totalItems = musics.length

      if (page && Number.isInteger(page) && total_items && Number.isInteger(total_items)) {
        const last = page * total_items
        const first = last - total_items

        musics = musics.slice(first, last)
      }

      return {
        success: new Status("success search music", ACTION_SUCCESS),
        data: {
          summary: {
            page,
            total_items: totalItems
          },
          items: musics
        }
      }
    } catch (err: unknown) {
      const e = err as Error
      return {
        error: new Status(e.message, UNEXPECTED_ERROR)
      }
    }
  }

  public async GetMusic(p: GetMusicParam): Promise<GetMusicResult> {
    try {
      const musicIdx = this.musics.findIndex((music) => {
        return music.slug === p.slug
      })
      if (musicIdx === -1) {
        return {
          error: new Status("music not available", RESOURCE_NOTFOUND),
        }
      }

      const music = this.musics[musicIdx]
      let prev: Music | undefined = undefined
      let next: Music | undefined = undefined
      if (musicIdx > 0) {
        prev = this.musics[musicIdx - 1]
      }

      if (musicIdx + 1 < this.musics.length) {
        next = this.musics[musicIdx + 1]
      }

      return {
        success: new Status("success get music", ACTION_SUCCESS),
        data: {
          ...music,
          prev,
          next,
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
