import {Route, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const Token = Cookies.get('jwt_token')

  return (
    <>
      {Token !== undefined ? (
        <Route {...props} />
      ) : (
        <Redirect to="/ebank/login" />
      )}
    </>
  )
}

export default ProtectedRoute
