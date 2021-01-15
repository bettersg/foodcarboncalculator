/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Landing from './components/Landing';
import AddMeal from './components/meals/AddMeal';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

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

          {/* <PrivateRoute path="xxxxxxx" component={xxxxxxx}/> */}
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
