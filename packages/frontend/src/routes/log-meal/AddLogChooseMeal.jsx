import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom';
import { useMealContext } from '../../contexts/MealContext';
import styles from '../../styles/ChooseMeal.module.css';

export const AddLogChooseMeal = () => {
  const history = useHistory();
  const { meals, exampleMeals } = useMealContext();
  let { meal } = useParams();
  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal)) {
    return <Redirect to="/app" />;
  }

  const logThisMeal = (food) => {
    history.push(`/add-to-log/${meal}/${food}`);
  };

  return (
    <div className="page-container">
      <div className="heading">
        <h1>{meal}</h1>
      </div>
      <div id="search" className={`${styles.search}`}>
        <input placeholder="Search for a food" type="text" />
      </div>
      <div id="meal-choices-container">
        <div className={`${styles.mealChoiceHeading}`}>
          <h2>Most Recent</h2>
          <div>View by categories</div>
        </div>
        <div id="meal-choices">
          {exampleMeals.map((m) => (
            <div
              role="button"
              tabIndex="0"
              key={m.id}
              className={`${styles.eachMealChoice}`}
              onClick={() => logThisMeal(m.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  logThisMeal(m.id);
                }
              }}
            >
              <div>{m.mealName}</div>
              <div>{`>`}</div>
            </div>
          ))}
        </div>
        <div className={`${styles.addNewMealOption}`}>
          <NavLink to="/create-food">Add a new meal</NavLink>
        </div>
      </div>
    </div>
  );
};