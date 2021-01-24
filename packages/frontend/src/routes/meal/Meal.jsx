import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../common/axiosInstances';

export const Meal = () => {
  let { id } = useParams();
  const [meal, setMeal] = useState({});

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
        <h2>Welcome to your dashboard</h2>
        <div>Date: {meal && meal.date}</div>
      </div>
      <div className="page-content full-page">Tests</div>
    </div>
  );
};
