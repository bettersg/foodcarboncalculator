import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Landing from './components/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/App/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/App/AuthRoutes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />

          <PrivateRoute path="/app" component={Home} />
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
