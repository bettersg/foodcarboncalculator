/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { ReactComponent as MealContainer } from '../../../static/Ellipse 11.svg';

const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

function AddMealButtons({ active }) {
    return (
        <div>
            {meals.map(meal => (
                <div className={`nav-add-meal-button ${active ? "active":""}`} key={meal}>
                    <div><MealContainer /></div>
                    <div>{meal}</div>
                </div>
            ))}

        </div>
    )
}

export default AddMealButtons
