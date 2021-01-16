/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React from 'react'
import { useParams } from 'react-router-dom';

const exampleMeals = ['Chicken Rice', 'Nasi Lemak', 'Bak Chor Mee', 'Spaghetti Bolognese', 'Ban Mian', 'Prata']

function AddMeal() {
  let meal = useParams().meal;
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
              <div key={m} className="meal-choice-container">
                <div className="meal-name">{m}</div>
                <div>{`>`}</div>
              </div>
            ))}
          </div>
          <div id="add-meal-choice">
            Add a new meal
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMeal
