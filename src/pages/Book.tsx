import * as React from "react"
import { useNavigate } from "react-router-dom"
import { GoPeople } from "react-icons/go"
import { Alert } from "../components/Alert"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"
import { useTranslator } from "../features/Translation"
import { BookService } from "../services/static/Book"
import { SearchBookParam } from "../services/Book"

type BookProps = {
  lng?: string
}

type Book = {
  slug: string
  name: string
  description?: string
}

const bookService = new BookService()

export default function Book(props: BookProps): React.JSX.Element {
  const {
    lng
  } = props
  const lngTo = lng === undefined ? "" : `/${lng}`

  const { translate } = useTranslator({
    lng,
    ns: ["book", "books"]
  })

  const navigate = useNavigate()

  const [booksFilter] = React.useState({
    page: 1,
    lng,
  })
  const [books, setBooks] = React.useState({
    loading: false,
    items: [] as Book[],
    totalItems: 0,
  })

  async function searhcBooks(param: SearchBookParam) {
    setBooks((prevState) => {
      return {
        ...prevState,
        loading: true,
      }
    })
    const searchBooks = await bookService.SearchBook(param)
    setBooks((prevState) => {
      return {
        ...prevState,
        loading: false,
      }
    })

    if (searchBooks.error) {
      return
    }

    setBooks((prevState) => {
      return {
        ...prevState,
        items: searchBooks.data?.items || [],
        totalItems: searchBooks.data?.summary.total_items || 0,
      }
    })
  }

  useAutoPosition()
  useHashFragment()

  React.useEffect(() => {
    searhcBooks(booksFilter)
  }, [booksFilter])

  return (
    <>
      <Meta>
        {{
          title: translate(`book:metaTitle`, { ns: ["book"] }),
          description: translate(`book:metaDescription`, { ns: ["book"] })
        }}
      </Meta>

      <div className="py-5 md:py-10">
        <Container size="xl">
          <div className="flex flex-col gap-4">
            {
              books.items.length === 0 &&
              <div>
                <Alert variant="warning" opened>
                  {{
                    header: <>
                      <p className="font-bold text-xl">
                        {translate(`book:bookNotFoundTitle`, { ns: ["book"] })}
                      </p>
                    </>,
                    content: <>
                      <p className="text-lg">
                        {translate(`book:bookNotFoundDescription`, { ns: ["book"] })}
                      </p>
                    </>
                  }}
                </Alert>
              </div>
            }

            {
              books.items.length > 0 &&
              <div className="grid grid-cols-12 gap-4 auto-rows-fr">
                {
                  books.items.map((book, i: number) => {
                    return (
                      <React.Fragment key={`book-item-${i}`}>
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                          <div onClick={() => { navigate(`${lngTo}/book/${book.slug}`) }}
                            className="w-full h-full cursor-pointer min-h-24 shadow rounded-md border-1 bg-white px-6 xl:px-12 py-6">
                            <div className="flex flex-col justify-center items-center gap-4">
                              <GoPeople className="w-16 h-16" aria-hidden="true" />

                              <div className="flex flex-col justify-center items-center">
                                <Link className="text-2xl font-semibold" to={`${lngTo}/book/${book.slug}`}>
                                  {book.name}
                                </Link>

                                {
                                  book.description &&
                                  <p className="text-lg text-center italic">
                                    {book.description}
                                  </p>
                                }
                              </div>
                            </div>
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
  )
}