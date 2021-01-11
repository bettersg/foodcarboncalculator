import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

import Home from './components/Home'
import AddMeal from './components/meals/AddMeal'
import Login from './components/user/Login'
import Register from './components/user/Register'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <AuthProvider>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/addmeal" component={AddMeal} />
                </AuthProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default App
