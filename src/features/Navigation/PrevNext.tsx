import * as React from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Button, ButtonLink } from "../../components/Button"

type PrevNextProps = {
  prev: Navigation
  next: Navigation
}

type Navigation = {
  to: string
  label: string
  disabled?: boolean
}

export function PrevNext(props: PrevNextProps): React.ReactNode {
  const {
    prev,
    next
  } = props

  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      {
        !prev.disabled ?
          <ButtonLink to={`${prev.to}`} variant="primary" appendClassNames="flex flex-row justify-center items-center gap-2">
            <FaArrowLeft className="w-4 h-4" aria-hidden="true" /> {prev.label}
          </ButtonLink>
          :
          <Button variant="primary" appendClassNames="flex flex-row justify-center items-center gap-2" disabled>
            <FaArrowLeft className="w-4 h-4" aria-hidden="true" /> Previous
          </Button>
      }

      {
        !next.disabled ?
          <ButtonLink to={`${next.to}`} variant="primary" appendClassNames="flex flex-row justify-center items-center gap-2">
            {next.label} <FaArrowRight className="w-4 h-4" aria-hidden="true" />
          </ButtonLink>
          :
          <Button variant="primary" appendClassNames="flex flex-row justify-center items-center gap-2" disabled>
            Next <FaArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
      }
    </div>
  )
}