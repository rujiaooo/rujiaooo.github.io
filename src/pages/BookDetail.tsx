import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"
import { Info } from "../features/Page"
import { useTranslator } from "../features/Translation"
import { BookService } from "../services/static/Book"
import { Status, StatusCode } from "../services/Status"

type BookDetailProps = {
  lng?: string
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

const bookService = new BookService()

export default function BookDetail(props: BookDetailProps): React.JSX.Element {
  const {
    lng
  } = props
  const lngTo = lng === undefined ? "" : `/${lng}`

  const { slug } = useParams()
  const { translate } = useTranslator({
    lng,
    ns: ["book-detail"]
  })
  const navigate = useNavigate()

  const [book, setBook] = React.useState({
    loading: false,
    detail: undefined as undefined | Book,
    error: undefined as undefined | Status,
  })

  async function getBook({ slug, lng }: { slug: string, lng?: string }) {
    setBook((prevState) => {
      return {
        ...prevState,
        loading: true
      }
    })
    const getBook = await bookService.GetBook({ slug, lng })
    setBook((prevState) => {
      return {
        ...prevState,
        loading: false
      }
    })
    if (getBook.error) {
      setBook((prevState) => {
        return {
          ...prevState,
          error: getBook.error,
        }
      })
      return
    }

    setBook((prevState) => {
      return {
        ...prevState,
        detail: getBook.data,
      }
    })
  }

  React.useEffect(() => {
    if (!slug) {
      return
    }

    getBook({
      slug,
      lng
    })
  }, [slug, lng])

  useAutoPosition()
  useHashFragment()

  return (
    <>
      {
        book.error &&
        <>
          <Meta>
            {{
              title: (
                book.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`book-detail:metaNotFoundTitle`, { ns: ["book-detail"] }) :
                  translate(`book-detail:metaUnexpectedTitle`, { ns: ["book-detail"] })
              ),
              description: (
                book.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`book-detail:metaNotFoundDescription`, { ns: ["book-detail"] }) :
                  book.error.message
              ),
            }}
          </Meta>

          <Info
            title={
              book.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`book-detail:infoNotFoundTitle`, { ns: ["book-detail"] }) :
                `${book.error.code}`
            }
            subtitle={
              book.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`book-detail:infoNotFoundDescription`, { ns: ["book-detail"] }) :
                book.error.message
            }
            actionText={translate(`book-detail:infoNotFoundActionText`, { ns: ["book-detail"] })} />
        </>
      }

      {
        !book.error &&
        <>
          <Meta>
            {{
              title: book.detail?.name || "",
              description: book.detail?.description || "",
            }}
          </Meta>

          <div className="py-5 md:py-10">
            <Container size="2xl">
              <div className="flex flex-col gap-4">
                <div className="border rounded-md shadow p-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-3xl text-confucius-black">
                      {book.detail?.name}
                    </p>

                    {
                      book.detail?.description &&
                      <p className="text-base text-confucius-black">
                        {book.detail.description}
                      </p>
                    }
                  </div>
                </div>

                {
                  book.detail?.chapters && book.detail?.chapters.length > 0 &&
                  <div className="grid grid-cols-12 gap-4 auto-rows-fr">
                    {
                      book.detail?.chapters.map((chapter, i: number) => {
                        return (
                          <React.Fragment key={`chapter-item-${i}`}>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                              <div onClick={() => {
                                navigate(`${lngTo}/book/${book.detail?.slug}/${chapter.slug}`)
                              }}
                                className="w-full h-full cursor-pointer shadow rounded-md border-1 bg-white p-4">
                                <Link to={`${lngTo}/book/${book.detail?.slug}/${chapter.slug}`}
                                  className="font-semibold text-2xl text-confucius-black">
                                  {chapter.title}
                                </Link>

                                {
                                  chapter.description &&
                                  <p>
                                    {chapter.description}
                                  </p>
                                }
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      })
                    }
                  </div>
                }

              </div>
            </Container>
          </div>
        </>
      }
    </>
  )
}