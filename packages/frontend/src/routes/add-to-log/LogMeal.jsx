import { useState } from 'react';
import { useMealContext } from '../../contexts/MealContext';
import { useParams, Redirect } from 'react-router-dom';
import { ReactComponent as Edit } from '../../assets/svg/edit.svg';
import styles from '../../styles/AddToLog.module.css';

const FactOrImpactTab = ({ factOrImpact, setFactOrImpact }) => {
  const tabs = ['Nutrition Facts', 'Environmental Impact'];
  const currTab = factOrImpact ? tabs[0] : tabs[1];
  return (
    <>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="button"
          tabIndex="0"
          className={`${styles.tab} ${currTab === tab ? styles.tabActive : ''}`}
          onClick={() => setFactOrImpact(index ? false : true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setFactOrImpact(index ? false : true);
            }
          }}
        >
          {tab}
        </div>
      ))}
    </>
  );
};

export const LogMeal = () => {
  /* Toggles between Nutrition Facts and Environmental Impact */
  /* true: Fact, false: Impact */
  const [factOrImpact, setFactOrImpact] = useState(true);

  //   const history = useHistory(); //import useHistory from react router if needed
  let { meal, foodId } = useParams();

  const { meals, exampleMeals } = useMealContext();
  const food = exampleMeals.find((m) => m.id == foodId);

  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal) || !food) {
    return <Redirect to="/app" />;
  }
  const showNutritionFacts = () => {
    /* TODO : CALCULATE BASED ON INGREDIENTS */
    return (
      <>
        <div>
          <span>475</span>
          <span> Cal</span>
        </div>
        <hr />
        <div>
          <span>61g</span>
          <span>Carbs</span>
        </div>
        <div>
          <span>15g</span>
          <span>Fat</span>
        </div>
        <div>
          <span>25g</span>
          <span>Protein</span>
        </div>
      </>
    );
  };

  const showEnvironImpact = () => {
    /* TODO : CALCULATE BASED ON INGREDIENTS */
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
        <h2>{food.mealName}</h2>
        <div className={`${styles.tabsContainer}`}>
          <FactOrImpactTab factOrImpact={factOrImpact} setFactOrImpact={setFactOrImpact} />
        </div>
        <div className={`${styles.tabsInfo}`}>
          <div>
            <img src="http://placehold.it/198x145" alt="" />
          </div>
          {/* To substitute with the actual values */}
          <div className={`${styles.tabFoodOverallData}`}>
            {factOrImpact ? showNutritionFacts() : showEnvironImpact()}
          </div>
        </div>
        <div id="serving" className={`${styles.serving}`}>
          <div>
            <div className={`${styles.h2}`}>{food.mealName}</div>
            <div>1 Serving</div>
          </div>
          <hr />
          {food.ingredients.map((ingredient) => (
            <div key={ingredient.ingredientName}>
              <div>{ingredient.ingredientName}</div>
              <div>{ingredient.ingredientAmt}</div>
            </div>
          ))}
        </div>
        <div className={`${styles.editButton}`}>
          {' '}
          {/* Add on click */}
          <Edit />
          <span>Edit</span>
        </div>
        <div role="button" tabIndex="0" className={`${styles.addButton}`}>
          Add to log
        </div>{' '}
        {/* Add on click */}
      </div>
    </div>
  );
};
``;

export default LogMeal;
