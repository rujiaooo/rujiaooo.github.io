import {
  Navigate, NavigateProps,
  generatePath, useParams
} from "react-router-dom"

export const NavigateParams = ({ to, ...props }: NavigateProps) => {
  const params = useParams()
  return <Navigate {...props} to={generatePath(to.toString(), params)} />
}