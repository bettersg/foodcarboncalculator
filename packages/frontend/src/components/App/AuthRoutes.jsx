/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import MainNavBar from './NavBar/MainNavBar';
import AddMeal from './Meals/AddMeal';

function AuthRoutes() {
    return (
        <div>
            <Route exact path="/app" component={Dashboard} />
            <Route path="/app/add-meal/:meal" component={AddMeal} />
            <MainNavBar />
        </div>
    )
}

export default AuthRoutes;
