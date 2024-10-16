import { useLocation, useParams } from "react-router-dom"

type PageProps = {
  defaultLng?: string
  lngs?: string[]
}

export function usePage(props?: PageProps) {
  const {
    defaultLng = "id",
    lngs = ["id", "en", "zh"]
  } = props || {}

  const homePaths = new Set(["/", ...lngs.map((lng) => `/${lng}`)])
  const { pathname } = useLocation()
  const { lng: paramLng } = useParams()

  function isHome(): boolean {
    return homePaths.has(pathname === "/" ? pathname : pathname.replace(/\/$/, ""))
  }

  function parseLng(): string {
    if (paramLng) {
      return paramLng
    }

    const pathLng = getLng(lngs)
    if (pathLng) {
      return pathLng
    }

    return defaultLng
  }

  function getLng(lngs: string[]): string | undefined {
    let res = undefined
    for (const lng of lngs) {
      if (pathname.indexOf(`/${lng}`) !== -1) {
        res = lng
        break
      }
    }
    return res
  }

  return {
    isHome,
    lng: parseLng()
  }
}