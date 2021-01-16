import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { currUser, refreshed } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => (currUser ? <Component {...props} /> : !refreshed && <Redirect to="/" />)}
    />
  );
}

export default PrivateRoute;
