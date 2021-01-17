import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom';
import { useMealContext } from '../../contexts/MealContext';

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
      <div id="search">
        <input placeholder="Search for a food" type="text" />
      </div>
      <div id="meal-choice">
        <div id="meal-heading">
          <h3>Most Recent</h3>
          <div>View by categories</div>
        </div>
        <div>
          {exampleMeals.map((m) => (
            <div
              role="button"
              tabIndex="0"
              key={m}
              className="meal-choice-container"
              onClick={() => logThisMeal(m)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  logThisMeal(m);
                }
              }}
            >
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
  );
};
