import { useState /* useEffect */ } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/modal';
import styles from '../../styles/Diary.module.css';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import { Divider } from '../../components/divider';
import { NavLink } from 'react-router-dom';
import { useMealContext } from '../../contexts/MealContext';

const Container = styled.div`
  position: relative;
  margin: 0 9px;
`;

const NutritionalFacts = () => {
  return (
    <div className={`${styles.dayInfo}`}>
      <h3>Nutritional Facts</h3>
      <div>
        <div className={`${styles.calories} ${styles.textCenter}`}>
          <h1>475 -----</h1>
          <div>calories</div>
        </div>
        <Nutrition
        // carbs={meal.totalCarbs.toFixed(0)}
        // fat={meal.totalFat.toFixed(0)}
        // protein={meal.totalProtein.toFixed(0)}
        />
      </div>
    </div>
  );
};

const Nutrition = (/* { carbs, fat, protein } */) => {
  // console.log(carbs, protein, fat);
  return (
    <div className={`${styles.nutrition} ${styles.textCenter}`}>
      <div>
        <div>9999g</div>
        <div>Carbs</div>
      </div>
      <div>
        <div>9999g</div>
        <div>Protein</div>
      </div>
      <div>
        <div>9999g</div>
        <div>Fat</div>
      </div>
    </div>
  );
};

const MealsContainer = ({ food, meal, day }) => {
  return (
    <div className={`${styles.meal}`}>
      <div>{meal}</div>
      <div>
        {food.length ? (
          'stuff'
        ) : (
          <NavLink to={`/log-meal/${meal}${day ? `/${day}` : ''}`} className={`${styles.addFood}`}>
            Add Food
          </NavLink>
        )}
      </div>
    </div>
  );
};

export const Diary = () => {
  const [showChooseDate, setShowChooseDate] = useState(false);
  const [rootDay, setRootDay] = useState(Date.now());
  const { meals } = useMealContext();

  const handleOnDayClick = (day) => {
    setRootDay(new Date(day).getTime());
    setShowChooseDate(false);
  };

  const isToday = (chosenDay) => {
    let today = moment(Date.now());
    chosenDay = moment(chosenDay);
    return (
      today.year() === chosenDay.year() &&
      today.month() === chosenDay.month() &&
      today.date() === chosenDay.date()
    );
  };
  console.log(moment(1615625286500));
  console.log(moment(1615625258151));
  console.log(moment(1615625244073));
  // useEffect(() => {
  // }, [])
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Diary</h1>
      </div>
      <div className="secondary-heading">
        <h2>Food Status</h2>
        <div
          className={`${styles.date}`}
          onClick={() => setShowChooseDate((showChooseDate) => !showChooseDate)}
          role="button"
          tabIndex="0"
          onKeyPress={() => {}}
        >
          {isToday(rootDay) ? 'Today' : moment(rootDay).format('dddd, Do MMM YYYY')}
        </div>
      </div>
      <div className="page-content full-page search">
        <Container>
          <div className={`${styles.heading} ${styles.bold}`}>Overview</div>
          <NutritionalFacts />
          <Divider />
          {meals.map((meal) => (
            <MealsContainer
              key={meal}
              food={[]}
              meal={meal}
              day={!isToday(rootDay) ? moment(rootDay).format('D-M-YYYY') : undefined}
            />
          ))}
        </Container>
      </div>
      {showChooseDate && (
        <Modal>
          <DayPicker onDayClick={handleOnDayClick} />
        </Modal>
      )}
    </div>
  );
};
