import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { ReactComponent as Edit } from '../../assets/svg/edit.svg';

const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export const LogMeal = () => {
  //   const history = useHistory(); //import useHistory from react router if needed
  let { meal, food } = useParams();

  /* Toggles between Nutrition Facts and Environmental Impact */
  /* true: Fact, false: Impact */
  const [factOrImpact, setFactOrImpact] = useState(true);

  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal) || food === '') {
    return <Redirect to="/app" />;
  }
  const showNutritionFacts = () => {
    return (
      <>
        <div>
          <span className="food-nutrition-value">475</span>
          <span className="food-nutrition-type"> Cal</span>
        </div>
        <div>
          <span className="food-nutrition-value">61g</span>
          <span className="food-nutrition-type">Carbs</span>
        </div>
        <div>
          <span className="food-nutrition-value">15g</span>
          <span className="food-nutrition-type">Fat</span>
        </div>
        <div>
          <span className="food-nutrition-value">25g</span>
          <span className="food-nutrition-type">Protein</span>
        </div>
      </>
    );
  };

  const showEnvironImpact = () => {
    return (
      <>
        <div>
          <span className="food-nutrition-value">56</span>
          <span className="food-nutrition-type"> Carbon Units</span>
        </div>
        <div>
          <span className="food-nutrition-value">CO2</span>
          <span className="food-nutrition-type">ooo scary</span>
        </div>
      </>
    );
  };

  return (
    <div className="page-container">
      <div className="heading">
        <h1>Add Food</h1>
      </div>
      <div>
        <h3>{food}</h3>
        <div id="food-info-tab-container">
          <div
            role="button"
            tabIndex="0"
            className={`food-info-tab ${factOrImpact ? 'food-info-tab-active' : ''}`}
            onClick={() => setFactOrImpact(true)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setFactOrImpact(true);
              }
            }}
          >
            Nutrition Facts
          </div>
          <div
            role="button"
            tabIndex="0"
            className={`food-info-tab ${!factOrImpact ? 'food-info-tab-active' : ''}`}
            onClick={() => setFactOrImpact(false)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setFactOrImpact(false);
              }
            }}
          >
            {' '}
            Environmental Impact
          </div>
        </div>
        <div id="food-nutrition-info">
          <div>
            <img src="http://placehold.it/198x145" alt="" />
          </div>
          {/* To substitute with the actual values */}
          <div id="food-nutrition-info-container">
            {factOrImpact ? showNutritionFacts() : showEnvironImpact()}
          </div>
        </div>
        <div id="serving">
          <div className="serving-size">
            <div className="h3">{food}</div>
            <div className="ingredient-amount">1 Serving</div>
          </div>
          <div className="ingredient">
            <div className="ingredient-name">Chicken</div>
            <div className="ingredient-amount">70g</div>
          </div>
          <div className="ingredient">
            <div className="ingredient-name">Rice (raw)</div>
            <div className="ingredient-amount">60g</div>
          </div>
          <div className="ingredient">
            <div className="ingredient-name">Vegetables</div>
            <div className="ingredient-amount">6g</div>
          </div>
        </div>
        <div className="edit-ingredients">
          {' '}
          {/* Add on click */}
          <Edit />
          <span>Edit</span>
        </div>
        <div role="button" tabIndex="0" className="add">
          Add to log
        </div>{' '}
        {/* Add on click */}
      </div>
    </div>
  );
};

export default LogMeal;
