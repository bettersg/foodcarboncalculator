import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './routes/dashboard';
import Landing from './routes/landing';
import ChooseMeal from './routes/log-meal';
import Login from './routes/login';
import Register from './routes/register';
import CreateFood from './routes/create-food';
import Header from './components/header';
import { Meal } from './routes/meal/Meal';

export const Router = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute component={AuthRoutes} />
    </Switch>
  </BrowserRouter>
);

// todo: this needs rethinking
const AuthRoutes = () => {
  let location = useLocation();
  return (
    <>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/log-meal/:meal" component={ChooseMeal} key={location.pathname} />
      <Route path="/create-food" component={CreateFood} />
      <Route path="/meal/:id" component={Meal} />
    </>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currUser, refreshed } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (currUser ? <Component {...props} /> : !refreshed && <Redirect to="/" />)}
    />
  );
};
