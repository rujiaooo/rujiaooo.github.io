import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { useDebounceValue } from "usehooks-ts"
import { Alert } from "../components/Alert"
import { Badge } from "../components/Badge"
import { Container } from "../components/Container"
import { InputSearch } from "../components/Input"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { Spinner } from "../components/Spinner"
import { useAutoPosition, useHashFragment } from "../hooks"
import { useTranslator } from "../features/Translation"
import { MusicService } from "../services/static/Music"
import { BookService } from "../services/static/Book"
import { SearchService } from "../services/static/Search"
import { SearchItemParam, Entity } from "../services/Search"

type SearchProps = {
  lng?: string
}

const musicService = new MusicService()
const bookService = new BookService()
const searchService = new SearchService(musicService, bookService)

type SearchItem = {
  slug: string
  url: string
  entity: string
  title: string
  description?: string
}

export default function Search(props: SearchProps): React.JSX.Element {
  const {
    lng
  } = props
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { translate } = useTranslator({
    lng,
    ns: ["search"]
  })
  const [keyword, setKeyword] = React.useState("")
  const [delayKeyword, setDelayKeyword] = useDebounceValue(keyword, 1000)
  const [search, setSearch] = React.useState({
    loading: false,
    items: [] as SearchItem[]
  })

  async function searchItems(param: SearchItemParam) {
    setSearch((prevState) => {
      return {
        ...prevState,
        loading: true
      }
    })
    const searchItem = await searchService.SearchItem(param)
    setSearch((prevState) => {
      return {
        ...prevState,
        loading: false
      }
    })
    if (searchItem.error) {
      return
    }

    setSearch((prevState) => {
      return {
        ...prevState,
        items: searchItem.data?.items || []
      }
    })
  }

  React.useEffect(() => {
    let keyword = ""

    if (searchParams.has("keyword")) {
      keyword = searchParams.get("keyword")!
    }

    setKeyword(keyword)
  }, [searchParams])

  React.useEffect(() => {
    searchItems({
      query: delayKeyword
    })
  }, [delayKeyword])

  useAutoPosition()
  useHashFragment()

  return (
    <>
      <Meta>
        {{
          title: translate(`search:metaTitle`, { ns: ["search"] }),
          description: translate(`search:metaDescription`, { ns: ["search"] })
        }}
      </Meta>

      <div className="py-5 md:py-10">
        <Container size="2xl">
          <div className="flex flex-col gap-4">
            <div className="w-full md:w-1/2 mx-auto">
              <InputSearch
                size="lg"
                name="keyword"
                placeholder={translate(`search:searchKeywordPlaceholder`, { ns: ["search"] })}
                value={keyword}
                onChange={(e) => {
                  const value = e.target.value
                  setSearchParams((prevState) => {
                    if (!value) {
                      prevState.delete("keyword")
                    } else {
                      prevState.set("keyword", value)
                    }
                    return prevState
                  })
                  setDelayKeyword(value)
                }}
                onSubmit={() => {
                  searchItems({
                    query: delayKeyword
                  })
                }}
                onBlur={() => {
                  searchItems({
                    query: delayKeyword
                  })
                }}
                showAction
                actionPosition="right" />
            </div>

            <div className="flex flex-col gap-2">
              {
                search.loading &&
                <>
                  <div className="py-10 flex justify-center items-center">
                    <Spinner size="md" label="Loading..." labeled />
                  </div>
                </>
              }

              {
                !search.loading && !delayKeyword &&
                <>
                  <Alert variant="warning" opened>
                    {{
                      header: <>
                        <p className="font-bold text-xl">
                          {translate(`search:searchKeywordEmptyTitle`, { ns: ["search"] })}
                        </p>
                      </>,
                      content: <>
                        <p className="text-lg">
                          {translate(`search:searchKeywordEmptyDescription`, { ns: ["search"] })}
                        </p>
                      </>
                    }}
                  </Alert>
                </>
              }

              {
                !search.loading && delayKeyword && search.items.length === 0 &&
                <>
                  <Alert variant="warning" opened>
                    {{
                      header: <>
                        <p className="font-bold text-xl">
                          {translate(`search:searchNotFoundTitle`, { ns: ["search"] })}
                        </p>
                      </>,
                      content: <>
                        <p className="text-lg">
                          {translate(`search:searchNotFoundDescription`, { ns: ["search"] })}
                        </p>
                      </>
                    }}
                  </Alert>
                </>
              }

              {
                !search.loading && search.items.length > 0 &&
                <>
                  {
                    search.items.map((item, i: number) => {
                      return (
                        <React.Fragment key={`search-item-${i}`}>
                          <div className="cursor-pointer p-3 hover:rounded hover:bg-gray-200"
                            onClick={() => { navigate(`${item.url}`) }}>
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row gap-2 justify-start items-center">
                                <Badge variant={item.entity === Entity.Music ? "danger" : "info"} size="sm" appendClassNames="capitalize">
                                  {translate(`search:searchItemEntity.${item.entity}`, { ns: ["search"] })}
                                </Badge>
                                <Link to={`${item.url}`} className="font-bold">
                                  {item.title}
                                </Link>
                              </div>
                              {
                                item.description &&
                                <Link to={`${item.url}`} dangerouslySetInnerHTML={{
                                  __html: item.description.split(" ").reduce((prevVal, currVal, currIdx) => {
                                    if (currIdx >= 50) {
                                      return prevVal
                                    }

                                    return prevVal + " " + currVal
                                  }, "")
                                }}>
                                </Link>
                              }
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                </>
              }
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}