import {
  Route, RouteProps,
  createBrowserRouter, createRoutesFromElements
} from "react-router-dom"
import Guest from "../../layout/Guest"
import Home from "../../pages/Home"
import Contact from "../../pages/Contact"
import Music from "../../pages/Music"
import MusicDetail from "../../pages/MusicDetail"
import Book from "../../pages/Book"
import BookDetail from "../../pages/BookDetail"
import ChapterDetail from "../../pages/ChapterDetail"
import NotFound from "../../pages/NotFound"
import Error from "../../pages/Error"
import { lngs } from "../../assets/locales"

const guests: RouteProps[] = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/music", element: <Music /> },
  { path: "/music/:slug", element: <MusicDetail /> },
  { path: "/book", element: <Book /> },
  { path: "/book/:slug", element: <BookDetail /> },
  { path: "/book/:book/:slug", element: <ChapterDetail /> },
  { path: "*", element: <NotFound /> }
]

lngs.map((lng) => {
  guests.push({ path: `/${lng}`, element: <Home lng={lng} /> })
  guests.push({ path: `/${lng}/contact`, element: <Contact lng={lng} /> })
  guests.push({ path: `/${lng}/music`, element: <Music lng={lng} /> })
  guests.push({ path: `/${lng}/music/:slug`, element: <MusicDetail lng={lng} /> })
  guests.push({ path: `/${lng}/book`, element: <Book lng={lng} /> })
  guests.push({ path: `/${lng}/book/:slug`, element: <BookDetail lng={lng} /> })
  guests.push({ path: `/${lng}/book/:book/:slug`, element: <ChapterDetail lng={lng} /> })
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
  }
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