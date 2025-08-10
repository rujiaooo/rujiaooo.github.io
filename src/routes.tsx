import {
  Route, RouteProps,
  createBrowserRouter, createRoutesFromElements
} from "react-router-dom"
import loadable from "@loadable/component"
import Guest from "./layout/Guest"
import { Spinner } from "./components/Spinner"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Error from "./pages/Error"
import { lngs } from "./assets/locales"

// eslint-disable-next-line react-refresh/only-export-components
const Page = loadable((props: { name: string, lng?: string }) => import(`./pages/${props.name}.tsx`), {
  cacheKey: (props: { name: string, lng?: string }) => props.name,
  fallback: <Spinner size="md" appendClassNames="m-4" labeled />
})

const guests: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "/music", element: <Page name="Music" /> },
  { path: "/music/:slug", element: <Page name="MusicDetail" /> },
  { path: "/book", element: <Page name="Book" /> },
  { path: "/book/:slug", element: <Page name="BookDetail" /> },
  { path: "/book/:book/:slug", element: <Page name="BookChapterDetail" /> },
  { path: "/contact", element: <Page name="Contact" /> },
  { path: "/search", element: <Page name="Search" /> },
  { path: "/p/privacy-policy", element: <Page name="Privacy" /> },
  { path: "/p/terms-of-service", element: <Page name="Term" /> },
  { path: "*", element: <NotFound /> }
]

lngs.map((lng) => {
  guests.push({ path: `/${lng}`, element: <Home lng={lng} /> })
  guests.push({ path: `/${lng}/music`, element: <Page name="Music" lng={lng} /> })
  guests.push({ path: `/${lng}/music/:slug`, element: <Page name="MusicDetail" lng={lng} /> })
  guests.push({ path: `/${lng}/book`, element: <Page name="Book" lng={lng} /> })
  guests.push({ path: `/${lng}/book/:slug`, element: <Page name="BookDetail" lng={lng} /> })
  guests.push({ path: `/${lng}/book/:book/:slug`, element: <Page name="BookChapterDetail" lng={lng} /> })
  guests.push({ path: `/${lng}/contact`, element: <Page name="Contact" lng={lng} /> })
  guests.push({ path: `/${lng}/search`, element: <Page name="Search" lng={lng} /> })
  guests.push({ path: `/${lng}/*`, element: <NotFound lng={lng} /> })
})

const routes: RouteProps[] = [
  {
    path: "/",
    element: <Guest />,
    errorElement: <Error />,
    children: guests.map((route, i: number) => {
      return <Route {...route} key={`guest-item-${i}`} />
    })
  },
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {
        routes.map((route, i) => {
          return <Route {...route} key={`route-item-${i}`} />
        })
      }
    </Route>
  )
)