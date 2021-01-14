import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { currUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (currUser ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

export default PrivateRoute;
