import * as React from "react"
import { useNavigate } from "react-router-dom"
import { FaMusic, FaBook, FaRegComments } from "react-icons/fa"
import { HiMagnifyingGlass, HiMiniSquares2X2 } from "react-icons/hi2"
import { Button } from "../components/Button"
import { Container } from "../components/Container"
import { InputSearch } from "../components/Input"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"
import { useTranslator } from "../features/Translation"
import { useToast } from "../features/Toast"

type HomeProps = {
  lng?: string
}

export default function Home(props: HomeProps): React.JSX.Element {
  const {
    lng
  } = props
  const lngTo = lng === undefined ? "" : `/${lng}`
  const navigate = useNavigate()

  const { translate } = useTranslator({
    lng,
    ns: ["home", "menus"]
  })
  const { toast } = useToast()
  const [mode, setMode] = React.useState("search")
  const [keyword, setKeyword] = React.useState("")
  const [menu] = React.useState({
    items: [
      {
        slug: "book",
        to: `${lngTo}/book`,
        icon: <FaBook className="w-16 h-16" aria-hidden="true" />
      },
      {
        slug: "music",
        to: `${lngTo}/music`,
        icon: <FaMusic className="w-16 h-16" aria-hidden="true" />
      },
      {
        slug: "forum",
        to: `https://forum.rujiao.web.id?utm_source=rujiao.web.id`,
        isExternal: true,
        icon: <FaRegComments className="w-16 h-16" aria-hidden="true" />
      },
    ]
  })

  const handleSubmitSearch = (e: React.FormEvent) => {
    if (!keyword) {
      toast.warn(`${translate(`home:searchKeywordEmptyWarn`, { ns: ["home"] })}`)
      e.preventDefault()
      return
    }
  }

  useAutoPosition()
  useHashFragment()

  return (
    <>
      <Meta>
        {{
          title: translate(`home:metaTitle`, { ns: ["home"] }),
          description: translate(`home:metaDescription`, { ns: ["home"] })
        }}
      </Meta>

      {
        mode === "search" &&
        <div className="flex justify-center items-center w-full h-[80vh]">
          <Container size="lg">
            <form method="GET" action={`${lngTo}/search`} onSubmit={handleSubmitSearch}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-center items-center gap-2 divide-x-2 divide-black">
                  <img alt="logo" src={`/image/confucius-logo.png`} className="max-h-14" />
                </div>

                <div className="w-full max-w-[650px] mx-auto">
                  <InputSearch
                    size="lg"
                    name="keyword"
                    placeholder={translate(`home:searchKeywordPlaceholder`, { ns: ["home"] })}
                    value={keyword}
                    onChange={(e) => {
                      const value = e.target.value
                      setKeyword(value)
                    }} />
                </div>

                <div className="flex flex-row gap-2 justify-center items-center">
                  <Button type="submit" variant="primary" appendClassNames="flex flex-row gap-2 justify-start items-center">
                    <HiMagnifyingGlass className="w-5 h-5" aria-hidden="true" />
                    <span>Search</span>
                  </Button>
                  <Button type="button" variant="secondary" appendClassNames="flex flex-row gap-2 justify-start items-center"
                    onClick={() => {
                      setMode("menu")
                    }}>
                    <HiMiniSquares2X2 className="w-5 h-5" aria-hidden="true" />
                    <span>Menu</span>
                  </Button>
                </div>
              </div>
            </form>
          </Container>
        </div>
      }

      {
        mode === "menu" &&
        <div className="py-5 md:py-10">
          <Container size="lg">
            <div className="flex flex-col gap-2">
              <div>
                <Button type="button" variant="primary" appendClassNames="flex flex-row gap-2 justify-start items-center"
                  onClick={() => {
                    setMode("search")
                  }}>
                  <HiMagnifyingGlass className="w-5 h-5" aria-hidden="true" />
                  <span>Search</span>
                </Button>
              </div>
              <div className="grid grid-cols-12 gap-4 auto-rows-fr">
                {
                  menu.items.map((item, i: number) => {
                    return (
                      <React.Fragment key={`menu-item-${i}`}>
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                          <div onClick={() => { 
                            if (item.isExternal && item.to) {
                              window.location.href = item.to
                              return
                            }

                            navigate(`${lngTo}/${item.slug}`) 
                          }}
                            className="w-full h-full cursor-pointer min-h-24 shadow rounded-md border-1 bg-white px-6 xl:px-12 py-6">
                            <div className="flex flex-col justify-center items-center gap-4">
                              {item.icon}

                              <div className="flex flex-col justify-center items-center">
                                <Link className="text-2xl font-semibold" to={`${item.to}`}>
                                  {translate(`menus:${item.slug}.name`, { ns: ["menus"] })}
                                </Link>
                                <p className="text-lg text-center italic">
                                  {translate(`menus:${item.slug}.description`, { ns: ["menus"] })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })
                }
              </div>
            </div>
          </Container>
        </div>
      }
    </>
  )
}