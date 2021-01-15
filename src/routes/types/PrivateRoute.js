import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom'

// User can only access those routes if they are logged in.
function PrivateRoute({ component: Component, ...rest }) {

  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser && !currentUser.isAnonymous ? <Component {...props} /> : <Redirect to="/account/entry" />
      }}
    >
    </Route>
  )
}

export default PrivateRoute
