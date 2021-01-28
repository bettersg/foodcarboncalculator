import { useState, useEffect } from 'react';
import { useMealContext } from '../../contexts/MealContext';
import { useParams } from 'react-router-dom';
import { getMealRecord, updateMealRecord, getIngredients } from '../../service/api.service';
import styles from '../../styles/Meal.module.css';
import styled from 'styled-components';
import { SearchResults } from '../../components/search-results/SearchResults';
import { NutritionFacts } from '../../components/nutrition-facts/NutritionFacts';
import { Edit } from '../../components/edit/Edit';
import { InputBar } from '../../components/input-bar/InputBar';
import img from '../../assets/image18.png';
import { BigYellowButton } from '../../components/big-yellow-button/BigYellowButton';
import { AddIngredientModal } from '../create-food/AddIngredientModal';

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
const Ingredients = ({ editing, eIngredients, setEIngredients, setEditing }) => {
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
        {eIngredients &&
          eIngredients.map((i, index) => (
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
      {/* {!editing && ( */}
      <div role="button" tabIndex="0" onClick={() => setEditing(!editing)} onKeyPress={() => {}}>
        <Edit />
      </div>
      {/* )} */}
    </div>
  );
};

const Container = styled.div`
  position: relative;
`;

const OpenIngredientModal = styled.div`
  color: #979797;
  cursor: pointer;
  text-align: right;
  text-decoration: underline;
`;

export const Meal = () => {
  let { id } = useParams();
  const { categories, meals } = useMealContext();
  const [meal, setMeal] = useState();
  const [eIngredients, setEIngredients] = useState();
  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const ingredientFormInitialvalue = {
    category: 0,
    id: '',
    name: 0,
    weight: '',
  };
  const [ingredientForm, setIngredientForm] = useState(ingredientFormInitialvalue);

  const onFormUpdate = ({ target: { value } }, field) => {
    if (field === 'category') {
      setIngredientForm((prevState) => ({
        ...prevState,
        category: value,
        name: 0,
      }));
    } else if (field === 'weight') {
      setIngredientForm((prevState) => ({
        ...prevState,
        [field]: Number(value),
      }));
    } else {
      setIngredientForm((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };
  const onIngredientSubmit = async () => {
    try {
      // point to ingredient
      const ingredientToAdd = ingredients.find(({ id }) => id === ingredientForm.name);
      ingredientToAdd.weight = ingredientForm.weight;
      // push it to dish ingredients
      setEIngredients((prevState) => [...prevState, ingredientToAdd]);
      setIngredientForm(ingredientFormInitialvalue);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };
  /* Get details of this meal */
  useEffect(() => {
    const getMeal = async () => {
      try {
        let query = await getMealRecord(id);
        setMeal(query.meal);
        setEIngredients(query.meal.ingredients);
      } catch (e) {
        console.log(e);
      }
    };
    getMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* Check if any edits to the ingredients' weight and push to database */
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
      // console.log(body);
      // console.log(updateMealRecord);
      let updated = await updateMealRecord(id, { ingredients: body });
      setMeal(updated.meal);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);
  /* Get list of ingredients */
  useEffect(() => {
    getIngredients()
      .then((response) => {
        setIngredients(response);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Meal Details</h1>
      </div>
      <div className="secondary-heading">
        <h2>{meal && meals[meal.mealType]}</h2>
        <div>Date: {meal && meal.date}</div>
      </div>
      <div className="page-content full-page search">
        {meal && (
          <Container>
            <div className={`${styles.mealHeading}`}>
              <SearchResults meals={[meal]} search={false} />
            </div>
            <NutritionalFacts meal={meal} />
            <Ingredients
              editing={editing}
              eIngredients={eIngredients}
              setEIngredients={setEIngredients}
              setEditing={setEditing}
            />
            {editing && (
              <OpenIngredientModal onClick={() => setIsModalOpen(true)} role="button" tabIndex={0}>
                Add Ingredients
              </OpenIngredientModal>
            )}
            {isModalOpen && (
              <AddIngredientModal
                categories={categories}
                ingredientForm={ingredientForm}
                onClose={() => setIsModalOpen(false)}
                onFormUpdate={(event, field) => onFormUpdate(event, field)}
                onSubmit={onIngredientSubmit}
                ingredients={ingredients}
              />
            )}
            <div className={`${styles.button}`}>
              <BigYellowButton text="Go to Diary" link="dashboard" />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};
