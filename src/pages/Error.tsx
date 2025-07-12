import * as React from "react"
import { useLocation, useRouteError, isRouteErrorResponse } from "react-router-dom"
import { Meta } from "../components/Meta"
import { Container } from "../components/Container"
import { Info } from "../features/Page"
import { useTranslator } from "../features/Translation"
import { usePage } from "../hooks"
import { Status, StatusCode } from "../services/Status"

export default function ErrorPage(): React.JSX.Element {
  const { lng } = usePage()
  const { translate } = useTranslator({
    lng
  })
  const [status, setStatus] = React.useState({
    code: translate(`errorCode`),
    message: translate(`errorMessage`)
  })
  const { pathname } = useLocation()
  const error = useRouteError()

  React.useEffect(() => {
    const st = parseStatus(error)
    setStatus((prevState) => {
      return {
        ...prevState,
        code: `${st.code}`,
        message: st.message
      }
    })
  }, [error])

  return (
    <>
      <Meta>
        {{
          title: status.message
        }}
      </Meta>

      <Container size="md">
        <Info
          title={`${status.code}`}
          subtitle={status.message}
          actionText={translate(`errorActionText`)}
          actionTo={pathname} />
      </Container>
    </>
  )
}

function parseStatus(error: unknown): Status {
  if (error instanceof Status) {
    return error
  } else if (error instanceof Error) {
    return new Status(error.message, StatusCode.UNEXPECTED_ERROR)
  } else if (isRouteErrorResponse(error)) {
    return new Status(error.statusText, error.status)
  }
  return new Status("Unexpected error happened", StatusCode.UNEXPECTED_ERROR)
}