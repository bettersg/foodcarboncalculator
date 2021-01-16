/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react'
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom';
import { useMealContext } from '../../../contexts/MealContext';

function AddLogChooseMeal() {
  const history = useHistory();
  const { meals, exampleMeals } = useMealContext();
  let { meal } = useParams();
  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal)) {
    return <Redirect to="/app" />
  }

  function logThisMeal(food) {
    history.push(`/app/add-to-log/${meal}/${food}`);
  }

  return (
    <div>
      <div className="heading"><h2>{meal}</h2></div>
      <div className="page-body">
        <div id="search" >
          <input placeholder="Search for a food" type="text" />
        </div>
        <div id="meal-choice">
          <div id="meal-heading">
            <h3>Most Recent</h3>
            <div>View by categories</div>
          </div>
          <div>
            {exampleMeals.map(m => (
              <div role="button" tabIndex='0' key={m} className="meal-choice-container" onClick={() => logThisMeal(m)} >
                <div className="meal-name">{m}</div>
                <div>{`>`}</div>
              </div>
            ))}
          </div>
          <div id="add-meal-choice">
            <NavLink to="/">Add a new meal</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLogChooseMeal
