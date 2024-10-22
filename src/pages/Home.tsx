import * as React from "react"
import { useNavigate } from "react-router-dom"
import { FaMusic, FaBook } from "react-icons/fa"
import { Container } from "../components/Container"
import { Meta } from "../components/Meta"
import { Link } from "../components/Router"
import { useAutoPosition, useHashFragment } from "../hooks"
import { useTranslator } from "../features/Translation"

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
  const [menu] = React.useState({
    items: [
      {
        slug: "book",
        icon: <FaBook className="w-16 h-16" aria-hidden="true" />
      },
      {
        slug: "music",
        icon: <FaMusic className="w-16 h-16" aria-hidden="true" />
      },
    ]
  })

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

      <div className="py-5 md:py-10">
        <Container size="lg">
          <div className="grid grid-cols-12 gap-4 auto-rows-fr">
            {
              menu.items.map((item, i: number) => {
                return (
                  <React.Fragment key={`menu-item-${i}`}>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                      <div onClick={() => { navigate(`${lngTo}/${item.slug}`) }}
                        className="w-full h-full cursor-pointer min-h-24 shadow rounded-md border-1 bg-white px-6 xl:px-12 py-6">
                        <div className="flex flex-col justify-center items-center gap-4">
                          {item.icon}

                          <div className="flex flex-col justify-center items-center">
                            <Link className="text-2xl font-semibold" to={`${lngTo}/${item.slug}`}>
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
        </Container>
      </div>
    </>
  )
}