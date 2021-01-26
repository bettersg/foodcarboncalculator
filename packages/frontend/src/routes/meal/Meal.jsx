import { useState, useEffect } from 'react';
import { useMealContext } from '../../contexts/MealContext';
import { useParams } from 'react-router-dom';
import { getData } from '../../common/axiosInstances';
import styles from '../../styles/Meal.module.css';
import styled from 'styled-components';
import { SearchResults } from '../../components/search-results/SearchResults';
import { NutritionFacts } from '../../components/nutrition-facts/NutritionFacts';
import { Edit } from '../../components/edit/Edit';
import { InputBar } from '../../components/input-bar/InputBar';
import img from '../../assets/image18.png';
import { BigYellowButton } from '../../components/big-yellow-button/BigYellowButton';

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
const Ingredients = ({ meal, editing, eIngredients, setEIngredients }) => {
  const handleEdit = (e) => {
    let temp = [...eIngredients];
    temp[e.target.name].weight = Number(e.target.value);
    setEIngredients(temp);
  };
  return (
    <div className={`${styles.ingredients} ${editing ? styles.edit : ''}`}>
      <h4>Ingredients</h4>
      <hr />
      <div>
        {meal.ingredients.map((i, index) => (
          <div key={i.name} className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientName}`}>{i.name}</div>
            <div className={`${styles.ingredientWeight}`}>
              {editing ? (
                <InputBar
                  placeholder={i.weight}
                  type="number"
                  forEdit={true}
                  name={index}
                  changeHandler={handleEdit}
                />
              ) : (
                <>{i.weight}</>
              )}
              g
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Container = styled.div`
  position: relative;
`;

export const Meal = () => {
  let { id } = useParams();
  let { meals } = useMealContext();
  const [meal, setMeal] = useState();
  const [eIngredients, setEIngredients] = useState();
  const [editing, setEditing] = useState(false);
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
  useEffect(() => {
    const hasEdits = () => {
      if (meal.ingredients.length !== eIngredients.length) {
        return true;
      }
      for (let i = 0; i < eIngredients.length; i++) {
        if (meal.ingredients[i].weight !== eIngredients[i].weight) {
          return true;
        }
      }
      return false;
    };
    const updateMeal = async () => {
      let body = eIngredients.map((x) => {
        return {
          id: x.id,
          weight: x.weight,
        };
      });
      let updated = await getData.put(`/diary/meal?id=${id}`, { ingredients: body });
      setMeal(updated.data.meal);
    };
    if (eIngredients && !editing) {
      if (hasEdits()) {
        updateMeal();
      }
    } else if (editing) {
      const sourceArray = meal.ingredients;
      const clonedArray = sourceArray.map((item) => ({ ...item }));
      setEIngredients(clonedArray);
    }
  }, [editing]);
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
          <Container>
            <div className={`${styles.mealHeading}`}>
              <SearchResults meals={[meal]} search={false} />
            </div>
            <NutritionalFacts meal={meal} />
            <Ingredients
              meal={meal}
              editing={editing}
              eIngredients={eIngredients}
              setEIngredients={setEIngredients}
            />
            {/* {!editing && ( */}
            <div
              role="button"
              tabIndex="0"
              onClick={() => setEditing(!editing)}
              onKeyPress={() => {}}
            >
              <Edit />
            </div>
            {/* )} */}
            <div className={`${styles.button}`}>
              <BigYellowButton text="Go to Diary" link="dashboard" />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};
