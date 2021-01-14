import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom'

// User can only access this route if they are logged out.
function PublicRoute({ component: Component, ...rest }) {

  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser && !currentUser.isAnonymous ? <Redirect to="/" /> : <Component {...props} />
      }}
    >
    </Route>
  )
}

export default PublicRoute
