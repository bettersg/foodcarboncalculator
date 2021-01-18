import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from './contexts/AuthContext';
import LogMeal from './routes/add-to-log/LogMeal';
import Dashboard from './routes/dashboard';
import Landing from './routes/landing';
import AddLogChooseMeal from './routes/log-meal';
import Login from './routes/login';
import Register from './routes/register';

export const Router = () => (
  <BrowserRouter>
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
      <Header />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/log-meal/:meal" component={AddLogChooseMeal} />
      <Route path="/add-to-log/:meal/:foodId" component={LogMeal} />
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
