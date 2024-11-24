import * as React from "react"
import { useLocation } from "react-router-dom"

type HashFragmentProps = {
  parseCsv?: boolean
}

export function useHashFragment(props?: HashFragmentProps) {
  const {
    parseCsv = false,
  } = props || {}

  const location = useLocation()
  const lastHash = React.useRef("")

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  React.useEffect(() => {
    setTimeout(() => {
      if (!location.hash) {
        return
      }

      let hash = location.hash.slice(1) // safe hash for further use after navigation
      if (parseCsv) {
        hash = hash.split(",")[0]
      }

      lastHash.current = hash
      const element = document.getElementById(lastHash.current)
      if (!element) {
        return
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
      lastHash.current = ""
    }, 1000)
  }, [location, parseCsv])
}

type AutoPositionProps = {
  watchPath?: boolean
  watchQuery?: boolean
}

export function useAutoPosition(props?: AutoPositionProps) {
  const {
    watchPath = true,
    watchQuery = false,
  } = props || {}

  const { pathname, search } = useLocation()
  const dependencies = []

  if (watchPath) {
    dependencies.push(pathname)
  }

  if (watchQuery) {
    dependencies.push(search)
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export function useScrollPosition() {
  const [scrollX, setScrollX] = React.useState(0)
  const [scrollY, setScrollY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    x: scrollX,
    y: scrollY
  }
}

type ScrollSpeedProps = {
  speedY?: number
}

export function useScrollSpeed(props?: ScrollSpeedProps) {
  const { speedY = 1 } = props || {
    speedY: 1
  }
  const factorY = speedY * 10

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const top = window.scrollY + (e.deltaY * factorY)

      window.scrollTo({
        top,
        behavior: "smooth"
      })
    }
    document.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      document.removeEventListener("wheel", handleWheel)
    }
  }, [factorY])
}