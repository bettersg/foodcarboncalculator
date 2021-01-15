/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Landing from './components/Landing';
import AddMeal from './components/Meals/AddMeal';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/App/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/addmeal" component={AddMeal} />

          <PrivateRoute path="/home" component={Home} />
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
