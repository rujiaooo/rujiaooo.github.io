import * as React from "react"
import { useParams, useLocation } from "react-router-dom"
import { FaInfoCircle } from "react-icons/fa"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { useAutoPosition, useHashFragment } from "../hooks"
import { Info } from "../features/Page"
import { useTranslator } from "../features/Translation"
import { BookService } from "../services/static/Book"
import { Status, StatusCode } from "../services/Status"
import { PrevNext } from "../features/Navigation"
import { ButtonLink } from "../components/Button"

type BookChapterDetailProps = {
  lng?: string
}

type Book = {
  slug: string
  name: string
  description?: string
}

type Chapter = {
  slug: string
  title: string
  description?: string
  content?: string
  summary?: string
  sections: Section[]
  book?: Book
  prev?: Chapter
  next?: Chapter
}

type Section = {
  slug: string
  title: string
  description?: string
  content?: string
  note?: string
}

const bookService = new BookService()

export default function BookChapterDetail(props: BookChapterDetailProps): React.JSX.Element {
  const {
    lng
  } = props
  const lngTo = lng === undefined ? "" : `/${lng}`

  const { hash } = useLocation()
  const { book, slug } = useParams()
  const { translate } = useTranslator({
    lng,
    ns: ["book-chapter-detail"]
  })

  const [highlight, setHighlight] = React.useState(new Set<string>([]))
  const [chapter, setChapter] = React.useState({
    loading: false,
    detail: undefined as undefined | Chapter,
    error: undefined as undefined | Status,
  })

  async function getChapter({ book, slug, lng }: { book: string, slug: string, lng?: string }) {
    setChapter((prevState) => {
      return {
        ...prevState,
        loading: true
      }
    })
    const getChapter = await bookService.GetBookChapter({ book, slug, lng })
    setChapter((prevState) => {
      return {
        ...prevState,
        loading: false
      }
    })
    if (getChapter.error) {
      setChapter((prevState) => {
        return {
          ...prevState,
          error: getChapter.error,
        }
      })
      return
    }

    setHighlight(new Set([]))
    setChapter((prevState) => {
      return {
        ...prevState,
        detail: getChapter.data,
      }
    })
  }

  function toggleHighlight(sectionId: string) {
    setHighlight((prevState) => {
      const newHighlight = new Set(prevState.values())

      if (newHighlight.has(sectionId)) {
        newHighlight.delete(sectionId)
      } else {
        newHighlight.add(sectionId)
      }
      return newHighlight
    })
  }

  React.useEffect(() => {
    const sectionIds = hash.replace("#", "").split(",")
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
      setHighlight(new Set([]))
      return
    }

    setHighlight((prevState) => {
      const newHighlight = new Set(prevState.values())

      sectionIds.forEach((sectionId) => {
        newHighlight.add(`book/${chapter.detail?.book?.slug}/${chapter.detail?.slug}/${sectionId}`)
      })

      return newHighlight
    })
  }, [hash, chapter])

  React.useEffect(() => {
    if (!book) {
      return
    }

    if (!slug) {
      return
    }

    getChapter({
      book,
      slug,
      lng
    })
  }, [book, slug, lng])

  useAutoPosition()
  useHashFragment({
    parseCsv: true
  })

  return (
    <>
      {
        chapter.error &&
        <>
          <Meta>
            {{
              title: (
                chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`book-chapter-detail:metaNotFoundTitle`, { ns: ["book-chapter-detail"] }) :
                  translate(`book-chapter-detail:metaUnexpectedTitle`, { ns: ["book-chapter-detail"] })
              ),
              description: (
                chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`book-chapter-detail:metaNotFoundDescription`, { ns: ["book-chapter-detail"] }) :
                  chapter.error.message
              ),
            }}
          </Meta>

          <Info
            title={
              chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`book-chapter-detail:infoNotFoundTitle`, { ns: ["book-chapter-detail"] }) :
                `${chapter.error.code}`
            }
            subtitle={
              chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`book-chapter-detail:infoNotFoundDescription`, { ns: ["book-chapter-detail"] }) :
                chapter.error.message
            }
            actionText={translate(`book-chapter-detail:infoNotFoundActionText`, { ns: ["book-chapter-detail"] })} />
        </>
      }

      {
        !chapter.error &&
        <>
          <Meta>
            {{
              title: `${chapter.detail?.title}` || "",
              description: chapter.detail?.description || "",
            }}
          </Meta>

          <div className="py-5 md:py-10">
            <Container size="2xl">
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <ButtonLink to={`${lngTo}/book/${chapter.detail?.book?.slug}`} variant="secondary" appendClassNames="flex flex-row justify-center items-center gap-2">
                    Back
                  </ButtonLink>
                </div>

                <PrevNext
                  prev={{
                    to: `/book/${chapter.detail?.book?.slug}/${chapter.detail?.prev?.slug}`,
                    label: `${chapter.detail?.prev?.title}`,
                    disabled: !chapter.detail?.prev,
                  }}
                  next={{
                    to: `/book/${chapter.detail?.book?.slug}/${chapter.detail?.next?.slug}`,
                    label: `${chapter.detail?.next?.title}`,
                    disabled: !chapter.detail?.next,
                  }}
                />

                <div className="border rounded-md shadow p-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-3xl text-confucius-black">
                      {chapter.detail?.title}
                    </p>

                    {
                      chapter.detail?.description &&
                      <p className="text-base text-confucius-black">
                        {chapter.detail.description}
                      </p>
                    }
                  </div>
                </div>

                {
                  chapter.detail?.content &&
                  <div className="border rounded-md shadow p-4"
                    dangerouslySetInnerHTML={{
                      __html: chapter.detail?.content || ""
                    }}>

                  </div>
                }

                {
                  chapter.detail?.sections && chapter.detail?.sections.length > 0 &&
                  <div className="border rounded-md shadow p-4">
                    <ol className="flex flex-col gap-2 list-decimal list-outside pl-10">
                      {
                        chapter.detail.sections.map((section, i: number) => {
                          return (
                            <React.Fragment key={`section-${i}`}>
                              <li id={section.slug} className={`scroll-my-20 cursor-pointer`}
                                onClick={() => { toggleHighlight(`book/${chapter.detail?.book?.slug}/${chapter.detail?.slug}/${section.slug}`) }}>
                                <div dangerouslySetInnerHTML={{
                                  __html: section.content || ""
                                }} className={(highlight.has(`book/${chapter.detail?.book?.slug}/${chapter.detail?.slug}/${section.slug}`) ? "bg-book-highlight text-white p-2 rounded" : "")}>

                                </div>
                              </li>
                              {
                                section.note &&
                                <div className="flex flex-col">
                                  <div className="flex flex-row flex-wrap gap-1 justify-start items-center">
                                    <FaInfoCircle className="w-4 h-4 text-gray-400" aria-hidden="true" />
                                    <p className="font-medium text-base">{translate(`book-chapter-detail:contentNoteLabel`, { ns: ["book-chapter-detail"] })}: </p>
                                  </div>
                                  <div dangerouslySetInnerHTML={{
                                    __html: section.note
                                  }} className="italic">

                                  </div>
                                </div>
                              }
                            </React.Fragment>
                          )
                        })
                      }
                    </ol>
                  </div>
                }

                <PrevNext
                  prev={{
                    to: `/book/${chapter.detail?.book?.slug}/${chapter.detail?.prev?.slug}`,
                    label: `${chapter.detail?.prev?.title}`,
                    disabled: !chapter.detail?.prev,
                  }}
                  next={{
                    to: `/book/${chapter.detail?.book?.slug}/${chapter.detail?.next?.slug}`,
                    label: `${chapter.detail?.next?.title}`,
                    disabled: !chapter.detail?.next,
                  }}
                />
              </div>
            </Container>
          </div>
        </>
      }
    </>
  )
}