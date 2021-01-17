import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AddLogChooseMeal from './components/App/Meals/AddLogChooseMeal';
import LogMeal from './components/App/Meals/LogMeal';
import MainNavBar from './components/App/NavBar/MainNavBar';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './routes/dashboard';
import Landing from './routes/landing';
import Login from './routes/login';
import Register from './routes/register';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/app" component={AuthRoutes} />
    </Switch>
  </BrowserRouter>
);

// todo: this needs rethinking
const AuthRoutes = () => {
  return (
    <>
      <Route exact path="/app" component={Dashboard} />
      <Route path="/app/log-meal/:meal" component={AddLogChooseMeal} />
      <Route path="/app/add-to-log/:meal/:food" component={LogMeal} />
      <MainNavBar />
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
