import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/modal';
import styles from '../../styles/Diary.module.css';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import { Divider } from '../../components/divider';
import { NavLink } from 'react-router-dom';
import { useMealContext } from '../../contexts/MealContext';
import { getDiaryDayData } from '../../service/api.service';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../../components/loading-spinner';

const Container = styled.div`
  position: relative;
  margin: 0 9px;
`;

const NutritionalFacts = ({ nutrition: { totalCalories, byNutrition } }) => {
  return (
    <div className={`${styles.dayInfo}`}>
      <h3>Nutritional Facts</h3>
      <div>
        <div className={`${styles.calories} ${styles.textCenter}`}>
          <h1>{totalCalories}</h1>
          <div>calories</div>
        </div>
        <Nutrition nutrition={byNutrition} />
      </div>
    </div>
  );
};

const Nutrition = ({ nutrition: { totalCarbs, totalProtein, totalFat } }) => {
  return (
    <div className={`${styles.nutrition} ${styles.textCenter}`}>
      <div>
        <div>{totalCarbs}</div>
        <div>Carbs</div>
      </div>
      <div>
        <div>{totalProtein}</div>
        <div>Protein</div>
      </div>
      <div>
        <div>{totalFat}</div>
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
          food.map((eachMeal) => <MealInstance key={eachMeal.id} mealData={eachMeal} />)
        ) : (
          <NavLink to={`/log-meal/${meal}${day ? `/${day}` : ''}`} className={`${styles.addFood}`}>
            Add Food
          </NavLink>
        )}
      </div>
    </div>
  );
};

const MealInstance = ({ mealData }) => {
  return (
    <div className={`${styles.eachMeal}`}>
      <NavLink to={`/meal/${mealData.id}`}>{mealData.name}</NavLink>
    </div>
  );
};

export const Diary = () => {
  const { currUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showChooseDate, setShowChooseDate] = useState(false);
  const [rootDay, setRootDay] = useState(Date.now());
  const { meals } = useMealContext();
  const [diaryData, setDiaryData] = useState();

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
  useEffect(() => {
    const getDiaryData = async () => {
      setIsLoading(true);
      try {
        let diary = await getDiaryDayData(currUser.uid, rootDay);

        setDiaryData(diary);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDiaryData();
  }, [currUser.uid, rootDay]);

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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <NutritionalFacts nutrition={diaryData} />
              <Divider />
              {meals.map((meal, index) => (
                <MealsContainer
                  key={meal}
                  food={diaryData.meals[index]}
                  meal={meal}
                  day={!isToday(rootDay) ? moment(rootDay).format('D-M-YYYY') : undefined}
                />
              ))}
            </>
          )}
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
