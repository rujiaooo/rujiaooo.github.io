import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Alert } from "../components/Alert"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"
import { useTranslator } from "../features/Translation"
import { SearchMusicParam } from "../services/Music"
import { Service } from "../services/Service"

type MusicProps = {
  lng?: string
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

const { musicService } = Service.createService()

export default function Music(props: MusicProps): React.JSX.Element {
  const {
    lng
  } = props
  const lngTo = lng === undefined ? "" : `/${lng}`

  const { translate } = useTranslator({
    lng,
    ns: ["music", "musics"]
  })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [musicIndices] = React.useState({
    items: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
  })
  const [musicsFilter, setMusicFilter] = React.useState({
    page: 1,
    first_char: undefined as undefined | string
  })
  const [musics, setMusics] = React.useState({
    loading: false,
    items: [] as Music[],
    totalItems: 0,
  })

  async function searhcMusics(param: SearchMusicParam) {
    setMusics((prevState) => {
      return {
        ...prevState,
        loading: true,
      }
    })
    const searchMusics = await musicService.SearchMusic(param)
    setMusics((prevState) => {
      return {
        ...prevState,
        loading: false,
      }
    })

    if (searchMusics.error) {
      return
    }

    setMusics((prevState) => {
      return {
        ...prevState,
        items: searchMusics.data?.items || [],
        totalItems: searchMusics.data?.summary.total_items || 0,
      }
    })
  }

  React.useEffect(() => {
    if (searchParams.has("firstChar")) {
      const firstChar = searchParams.get("firstChar") || ""
      setMusicFilter((prevState) => {
        return {
          ...prevState,
          first_char: firstChar,
        }
      })
    } else {
      setMusicFilter((prevState) => {
        return {
          ...prevState,
          first_char: undefined
        }
      })
    }
  }, [searchParams])

  useAutoPosition()
  useHashFragment()

  React.useEffect(() => {
    searhcMusics(musicsFilter)
  }, [musicsFilter])

  return (
    <>
      <Meta>
        {{
          title: translate(`music:metaTitle`, { ns: ["music"] }),
          description: translate(`music:metaDescription`, { ns: ["music"] })
        }}
      </Meta>

      <div className="py-5 md:py-10">
        <Container size="xl">
          <div className="flex flex-col gap-4">
            <div className="shadow rounded-md border-1 bg-white">
              <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
                {
                  musicIndices.items.map((index, i: number) => {
                    return (
                      <React.Fragment key={`music-index-item-${i}`}>
                        <Link className="hover:bg-slate-100 text-lg px-2 py-2" to={`?firstChar=${index}`}>
                          {index}
                        </Link>
                      </React.Fragment>
                    )
                  })
                }
              </div>
            </div>

            {
              musics.items.length === 0 &&
              <div>
                <Alert variant="warning" opened>
                  {{
                    header: <>
                      <p className="font-bold text-xl">
                        {translate(`music:musicNotFoundTitle`, { ns: ["music"] })}
                      </p>
                    </>,
                    content: <>
                      <p className="text-lg">
                        {translate(`music:musicNotFoundDescription`, { ns: ["music"] })}
                      </p>
                    </>
                  }}
                </Alert>
              </div>
            }

            {
              musics.items.length > 0 &&
              <div className="grid grid-cols-12 gap-4 auto-rows-fr">
                {
                  musics.items.map((music, i: number) => {
                    return (
                      <React.Fragment key={`music-item-${i}`}>
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                          <div onClick={() => {
                            navigate(`${lngTo}/music/${music.slug}`)
                          }}
                            className="w-full h-full cursor-pointer shadow rounded-md border-1 bg-white p-4">
                            <Link to={`${lngTo}/music/${music.slug}`}
                              className="font-semibold text-2xl text-confucius-black">
                              {music.title}
                            </Link>
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