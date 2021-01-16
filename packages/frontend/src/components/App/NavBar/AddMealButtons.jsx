import { useHistory } from 'react-router-dom';
import { ReactComponent as MealContainer } from '../../../static/Ellipse 11.svg';
import { useMealContext } from '../../../contexts/MealContext';

function AddMealButtons({ active, setActive }) {
  const { meals } = useMealContext();
  const history = useHistory();

  const addMeal = (meal) => {
    history.push(`/app/log-meal/${meal}`);
    setActive(false);
  };

  return (
    <div>
      {meals.map((meal) => (
        <div
          role="button"
          tabIndex="0"
          className={`nav-add-meal-button ${active ? 'active' : ''}`}
          key={meal}
          onClick={() => addMeal(meal)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addMeal(meal);
            }
          }} // CHANGE TO BUTTON
        >
          <div>
            <MealContainer />
          </div>
          <div>{meal}</div>
        </div>
      ))}
    </div>
  );
}

export default AddMealButtons;
