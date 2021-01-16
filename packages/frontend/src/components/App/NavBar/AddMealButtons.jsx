/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useHistory } from 'react-router-dom';
import { ReactComponent as MealContainer } from '../../../static/Ellipse 11.svg';

const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

function AddMealButtons({ active, setActive }) {
    const history = useHistory();

    function addMeal(meal) {
        history.push(`/app/add-meal/${meal}`);
        setActive(false)
    }

    return (
        <div>
            {meals.map(meal => (
                <div role="button" tabIndex='0' className={`nav-add-meal-button ${active ? "active" : ""}`} key={meal}
                    onClick={()=>addMeal(meal)} onKeyDown={()=>addMeal(meal)}>
                    <div><MealContainer /></div>
                    <div>{meal}</div>
                </div>
            ))}
        </div>
    )
}

export default AddMealButtons
