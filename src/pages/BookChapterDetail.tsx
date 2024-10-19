import * as React from "react"
import { useParams } from "react-router-dom"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { useAutoPosition, useHashFragment } from "../hooks"
import { Info } from "../features/Page"
import { useTranslator } from "../features/Translation"
import { BookService } from "../services/static/Book"
import { Status, StatusCode } from "../services/Status"

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
  book: Book
}

const bookService = new BookService()

export default function BookChapterDetail(props: BookChapterDetailProps): React.JSX.Element {
  const {
    lng
  } = props

  const { book, slug } = useParams()
  const { translate } = useTranslator({
    lng,
    ns: ["book-chapter-detail"]
  })

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

    setChapter((prevState) => {
      return {
        ...prevState,
        detail: getChapter.data,
      }
    })
  }

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
  useHashFragment()

  return (
    <>
      {
        chapter.error &&
        <>
          <Meta>
            {{
              title: (
                chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`book-detail:metaNotFoundTitle`, { ns: ["book-detail"] }) :
                  translate(`book-detail:metaUnexpectedTitle`, { ns: ["book-detail"] })
              ),
              description: (
                chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`book-detail:metaNotFoundDescription`, { ns: ["book-detail"] }) :
                  chapter.error.message
              ),
            }}
          </Meta>

          <Info
            title={
              chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`book-detail:infoNotFoundTitle`, { ns: ["book-detail"] }) :
                `${chapter.error.code}`
            }
            subtitle={
              chapter.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`book-detail:infoNotFoundDescription`, { ns: ["book-detail"] }) :
                chapter.error.message
            }
            actionText={translate(`book-detail:infoNotFoundActionText`, { ns: ["book-detail"] })} />
        </>
      }

      {
        !chapter.error &&
        <>
          <Meta>
            {{
              title: `${chapter.detail?.book.name} ${chapter.detail?.title}` || "",
              description: chapter.detail?.description || "",
            }}
          </Meta>

          <div className="py-5 md:py-10">
            <Container size="2xl">
              <div className="flex flex-col gap-4">
                <div className="border rounded-md shadow p-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-3xl text-confucius-black">
                      {chapter.detail?.book.name}: {chapter.detail?.title}
                    </p>

                    {
                      chapter.detail?.description &&
                      <p className="text-base text-confucius-black">
                        {chapter.detail.description}
                      </p>
                    }
                  </div>
                </div>

                <div className="border rounded-md shadow p-4"
                  dangerouslySetInnerHTML={{
                    __html: chapter.detail?.content || ""
                  }}>

                </div>
              </div>
            </Container>
          </div>
        </>
      }
    </>
  )
}