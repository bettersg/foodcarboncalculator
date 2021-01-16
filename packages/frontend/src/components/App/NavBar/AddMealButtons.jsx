/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react'
import { useHistory } from 'react-router-dom';
import { ReactComponent as MealContainer } from '../../../static/Ellipse 11.svg';
import { useMealContext } from '../../../contexts/MealContext';

function AddMealButtons({ active, setActive }) {
    const { meals } = useMealContext();
    const history = useHistory();

    const addMeal = (meal) => {
        history.push(`/app/log-meal/${meal}`);
        setActive(false)
    }

    return (
        <div>
            {meals.map(meal => (
                <div role="button" tabIndex='0' className={`nav-add-meal-button ${active ? "active" : ""}`} key={meal}
                    onClick={() => addMeal(meal)} >
                    <div><MealContainer /></div>
                    <div>{meal}</div>
                </div>
            ))}
        </div>
    )
}

export default AddMealButtons
