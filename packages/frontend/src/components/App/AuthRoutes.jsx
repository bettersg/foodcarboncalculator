/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import MainNavBar from './NavBar/MainNavBar';
import AddLogChooseMeal from './Meals/AddLogChooseMeal';
import LogMeal from './Meals/LogMeal';
import { MealProvider } from '../../contexts/MealContext';

function AuthRoutes() {
    return (
        <MealProvider>
            <Route exact path="/app" component={Dashboard} />
            <Route path="/app/log-meal/:meal" component={AddLogChooseMeal} />
            <Route path="/app/add-to-log/:meal/:food" component={LogMeal} />
            <MainNavBar />
        </MealProvider>
    )
}

export default AuthRoutes;
