import { useState, useEffect } from 'react';
import { useMealContext } from '../../contexts/MealContext';
import { useParams } from 'react-router-dom';
import { getData } from '../../common/axiosInstances';
import styles from '../../styles/Meal.module.css';

export const Meal = () => {
  let { id } = useParams();
  let { favourites, meals } = useMealContext();
  const [meal, setMeal] = useState({});
  console.log(favourites);
  useEffect(() => {
    const getMeal = async () => {
      try {
        let query = await getData.get(`/diary/meal?id=${id}`);
        setMeal(query.data.meal);
      } catch (e) {
        console.log(e);
      }
    };
    getMeal();
  }, []);
  console.log(meal);
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Meal Details</h1>
      </div>
      <div className="secondary-heading">
        <h2>{meal && meals[meal.mealType]}</h2>
        <div>Date: {meal && meal.date}</div>
      </div>
      <div className="page-content full-page">
        {meal && (
          <div className={`${styles.heading}`}>
            <h1>{meal.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
