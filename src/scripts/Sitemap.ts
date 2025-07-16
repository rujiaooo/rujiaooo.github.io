import "dotenv/config"
import { writeFileSync } from "fs"
import builder from "xmlbuilder"
import { Service } from "../services/Service"

const { bookService, musicService } = Service.createService()

async function createSitemap({ baseUrl }: { baseUrl: string }) {
  const musics = []
  const searchMusic = await musicService.SearchMusic({})
  if (!searchMusic.error) {
    musics.push(...searchMusic.data?.items || [])
  }

  const books = []
  const searchBook = await bookService.SearchBook({})
  if (!searchBook.error) {
    books.push(...searchBook.data?.items || [])
  }

  const lngs = [
    "id",
    "zh",
    "en",
  ]
  const bases = [
    "/",
    "/music",
    "/book",
    "/contact",
    "/search"
  ]
  const pages = [
    ...bases,
  ]

  for (const music of musics) {
    pages.push(`/music/${music.slug}`)
  }
  for (const book of books) {
    pages.push(`/book/${book.slug}`)

    for (const chapter of book.chapters) {
      pages.push(`/book/${book.slug}/${chapter.slug}`)
    }
  }

  for (const lng of lngs) {
    for (const page of bases) {
      pages.push(`/${lng}${page}`)
    }

    for (const book of books) {
      pages.push(`/${lng}/book/${book.slug}`)

      for (const chapter of book.chapters) {
        pages.push(`/${lng}/book/${book.slug}/${chapter.slug}`)
      }
    }

    if (lng == "id") {
      for (const music of musics) {
        pages.push(`/${lng}/music/${music.slug}`)
      }
    }
  }

  const currentTs = new Date()
  const urlset = builder.create("urlset", {
    encoding: "UTF-8",
    version: "1.0"
  })
  urlset.att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

  for (const page of pages) {
    const url = urlset.ele("url")
    url.ele("loc", `${baseUrl}${page}`)
    url.ele("lastmod", currentTs.toISOString())
    url.ele("priority", `1.0`)
  }

  const sitemap = urlset.end({
    pretty: true
  })

  return sitemap
}

async function generateSitemap({ baseUrl, location }: { baseUrl: string, location: string }) {
  const sitemap = await createSitemap({
    baseUrl
  })
  writeFileSync(location, sitemap)
  console.log("sitemap successfully generated")
  return
}

export {
  generateSitemap
}