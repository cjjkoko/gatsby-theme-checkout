import React from "react"
const PrivateRoute = ({ component: Component,  ...rest }) => {
  console.log(rest)
  return <Component {...rest} />
}
export default PrivateRoute
