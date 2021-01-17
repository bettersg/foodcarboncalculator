import { ReactComponent as MealContainer } from '../../assets/svg/ellipse_11.svg';

const AddMealButtons = ({ meals, active, onMealSelect, styles }) => (
  <div>
    {meals.map((meal) => (
      <div
        role="button"
        tabIndex={`${active ? 0 : -1}`}
        disabled={!active}
        className={`${styles.eachAddMealButton} ${active ? styles.active : ''}`}
        key={meal}
        onClick={() => onMealSelect(meal)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onMealSelect(meal);
          }
        }}
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
