import { useState, useEffect } from 'react';
import { useMealContext } from '../../contexts/MealContext';
import { useParams } from 'react-router-dom';
import { getData } from '../../common/axiosInstances';
import styles from '../../styles/Meal.module.css';
import { SearchResults } from '../../components/search-results/SearchResults';
import { NutritionFacts } from '../../components/nutrition-facts/NutritionFacts';
import { Edit } from '../../components/edit/Edit';
import img from '../../assets/image18.png';

const NutritionalFacts = ({ meal }) => {
  return (
    <div className={`${styles.mealInfo}`}>
      <h3>Nutritional Facts</h3>
      <div className={`${styles.infoContainer}`}>
        <div>
          <img src={img} alt="" width="100%" />
        </div>
        <div>
          <NutritionFacts
            calories={meal.totalCalories.toFixed(0)}
            carbs={meal.totalCarbs.toFixed(0)}
            fat={meal.totalFat.toFixed(0)}
            protein={meal.totalProtein.toFixed(0)}
          />
        </div>
      </div>
    </div>
  );
};
const Ingredients = ({ meal }) => {
  return (
    <div className={`${styles.ingredients}`}>
      <h4>Ingredients</h4>
      <hr />
      <div>
        {meal.ingredients.map((i) => (
          <div key={i.name} className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientName}`}>{i.name}</div>
            <div className={`${styles.ingredientWeight}`}>{i.weight}g</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Meal = () => {
  let { id } = useParams();
  let { meals } = useMealContext();
  const [meal, setMeal] = useState();
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
          <div>
            <div className={`${styles.mealHeading}`}>
              <SearchResults meals={[meal]} search={false} />
            </div>
            <NutritionalFacts meal={meal} />
            <Ingredients meal={meal} />
            <Edit />
          </div>
        )}
      </div>
    </div>
  );
};
