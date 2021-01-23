import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LogMeal from './routes/add-to-log/LogMeal';
import Dashboard from './routes/dashboard';
import Landing from './routes/landing';
import ChooseMeal from './routes/log-meal';
import Login from './routes/login';
import Register from './routes/register';
import CreateFood from './routes/create-food';
import Header from './components/header/index';
import Footer from './components/footer/index';

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
  return (
    <>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/log-meal/:meal" component={ChooseMeal} />
      <Route path="/add-to-log/:meal/:foodId" component={LogMeal} />
      <Route path="/create-food" component={CreateFood} />
      <Footer />
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
