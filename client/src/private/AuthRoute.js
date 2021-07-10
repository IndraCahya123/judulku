import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'

import { UserContext } from '../context/userContext'

const AuthRoute = ({ component: Component, ...rest }) => {
  const [user] = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        user.loginStatus ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default AuthRoute
