import { useLocation, useParams } from "react-router-dom"

type PageProps = {
  defaultLng?: string
  lngs?: string[]
}

export function usePage(props?: PageProps) {
  const {
    lngs = ["id", "en", "zh"]
  } = props || {}

  const homePaths = new Set(["/", ...lngs.map((lng) => `/${lng}`)])
  const { pathname } = useLocation()
  const { lng: paramLng } = useParams()

  function isHome(): boolean {
    return homePaths.has(pathname === "/" ? pathname : pathname.replace(/\/$/, ""))
  }

  function parseLng(): string | undefined {
    if (paramLng) {
      return paramLng
    }

    const pathLng = getLng(lngs)
    if (pathLng) {
      return pathLng
    }

    return undefined
  }

  function getLng(lngs: string[]): string | undefined {
    let res = undefined
    for (const lng of lngs) {
      if (pathMatch(lng)) {
        res = lng
        break
      }
    }
    return res
  }

  function pathMatch(lng: string): boolean {
    const text = pathname.split("/")
    if (text.length < 2) {
      return false
    }

    return text[1] === lng
  }

  return {
    isHome,
    lng: parseLng()
  }
}