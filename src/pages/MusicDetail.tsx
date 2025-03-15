import * as React from "react"
import { FaMusic, FaRegStickyNote } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { ButtonLink } from "../components/Button"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { useAutoPosition, useHashFragment } from "../hooks"
import { Info } from "../features/Page"
import { useTranslator } from "../features/Translation"
import { PrevNext } from "../features/Navigation"
import { MusicService } from "../services/static/Music"
import { Status, StatusCode } from "../services/Status"
import { toPlain } from "../valueconv"

type MusicDetailProps = {
  lng?: string
}

type Music = {
  slug: string
  title: string
  content?: string
  videos: string[]
  contributions: Contribution[]
  prev?: Music
  next?: Music
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

const musicService = new MusicService()

export default function MusicDetail(props: MusicDetailProps): React.JSX.Element {
  const {
    lng
  } = props
  const lngTo = lng === undefined ? "" : `/${lng}`

  const { slug } = useParams()
  const { translate } = useTranslator({
    lng,
    ns: ["music-detail", "musics"]
  })

  const [music, setMusic] = React.useState({
    loading: false,
    detail: undefined as undefined | Music,
    error: undefined as undefined | Status,
  })

  async function getMusic({ slug }: { slug: string, lng?: string }) {
    setMusic((prevState) => {
      return {
        ...prevState,
        loading: true
      }
    })
    const getMusic = await musicService.GetMusic({ slug })
    setMusic((prevState) => {
      return {
        ...prevState,
        loading: false
      }
    })
    if (getMusic.error) {
      setMusic((prevState) => {
        return {
          ...prevState,
          error: getMusic.error,
        }
      })
      return
    }

    setMusic((prevState) => {
      return {
        ...prevState,
        detail: getMusic.data,
      }
    })
  }

  React.useEffect(() => {
    if (!slug) {
      return
    }

    getMusic({
      slug,
      lng
    })
  }, [slug, lng])

  useAutoPosition()
  useHashFragment()

  return (
    <>
      {
        music.error &&
        <>
          <Meta>
            {{
              title: (
                music.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`music-detail:metaNotFoundTitle`, { ns: ["music-detail"] }) :
                  translate(`music-detail:metaUnexpectedTitle`, { ns: ["music-detail"] })
              ),
              description: (
                music.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                  translate(`music-detail:metaNotFoundDescription`, { ns: ["music-detail"] }) :
                  music.error.message
              ),
            }}
          </Meta>

          <Info
            title={
              music.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`music-detail:infoNotFoundTitle`, { ns: ["music-detail"] }) :
                `${music.error.code}`
            }
            subtitle={
              music.error.Is(StatusCode.RESOURCE_NOTFOUND) ?
                translate(`music-detail:infoNotFoundDescription`, { ns: ["music-detail"] }) :
                music.error.message
            }
            actionText={translate(`music-detail:infoNotFoundActionText`, { ns: ["music-detail"] })} />
        </>
      }

      {
        !music.error &&
        <>
          <Meta>
            {{
              title: music.detail?.title || "",
              description: toPlain(music.detail?.content),
            }}
          </Meta>

          <div className="py-5 md:py-10">
            <Container size="2xl">
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <ButtonLink to={`${lngTo}/music`} variant="secondary" appendClassNames="flex flex-row justify-center items-center gap-2">
                    Back
                  </ButtonLink>
                </div>

                <PrevNext
                  prev={{
                    to: `/music/${music.detail?.prev?.slug}`,
                    label: `Previous`,
                    disabled: !music.detail?.prev,
                  }}
                  next={{
                    to: `/music/${music.detail?.next?.slug}`,
                    label: `Next`,
                    disabled: !music.detail?.next,
                  }}
                />

                <div className="border rounded-md shadow p-4">
                  <div className="flex flex-col gap-4">
                    <p className="font-semibold text-3xl text-confucius-black">
                      {music.detail?.title}
                    </p>

                    {
                      music.detail?.contributions && music.detail?.contributions.length > 0 &&
                      <ul className="flex flex-col gap-1">
                        {
                          music.detail.contributions.map((contribution, i: number) => {
                            return (
                              <React.Fragment key={`contribution-item-${i}`}>
                                <li className="flex flex-row gap-2 justify-start items-center">
                                  {
                                    contribution.role === "lyric" ?
                                      <FaMusic className="w-5 h-5" aria-hidden="true" />
                                      :
                                      <FaRegStickyNote className="w-5 h-5" aria-hidden="true" />
                                  }

                                  <p className="text-base">
                                    {contribution.people.name}
                                  </p>
                                </li>
                              </React.Fragment>
                            )
                          })
                        }
                      </ul>
                    }

                    <hr className="my-1 border-[rgba(34,36,38,.15)]" />

                    <p className="font-semibold text-xl text-confucius-black">
                      {translate(`music-detail:musicLyricTitle`, { ns: ["music-detail"] })}
                    </p>
                    <div className="text-lg"
                      dangerouslySetInnerHTML={{
                        __html: music.detail?.content || ""
                      }}>

                    </div>

                    {
                      music.detail?.videos && music.detail?.videos.length > 0 &&
                      <>
                        <hr className="my-1 border-[rgba(34,36,38,.15)]" />
                        <p className="font-semibold text-xl text-confucius-black">
                          {translate(`music-detail:musicVideoTitle`, { ns: ["music-detail"] })}
                        </p>
                        <div className="flex flex-col gap-2">
                          {
                            music.detail?.videos.map((video, i: number) => {
                              return (
                                <React.Fragment key={`video-item-${i}`}>
                                  <iframe src={video} width="100%" height="500px" allowFullScreen>
                                  </iframe>
                                </React.Fragment>
                              )
                            })
                          }
                        </div>
                      </>
                    }
                  </div>
                </div>

                <PrevNext
                  prev={{
                    to: `/music/${music.detail?.prev?.slug}`,
                    label: `Previous`,
                    disabled: !music.detail?.prev,
                  }}
                  next={{
                    to: `/music/${music.detail?.next?.slug}`,
                    label: `Next`,
                    disabled: !music.detail?.next,
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