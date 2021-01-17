import { ReactComponent as MealContainer } from '../../assets/svg/ellipse_11.svg';

const AddMealButtons = ({ meals, active, onMealSelect }) => (
  <div>
    {meals.map((meal) => (
      <div
        role="button"
        tabIndex="0"
        className={`nav-add-meal-button ${active ? 'active' : ''}`}
        key={meal}
        onClick={() => onMealSelect(meal)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onMealSelect(meal);
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

export default AddMealButtons;
