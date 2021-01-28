import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../../styles/CreateFood.module.css';
import { Divider } from '../../components/divider';
import { PlaceholderImage } from '../../components/layout';
import { NutritionFacts } from '../../components/nutrition-facts';
import { useAuth } from '../../contexts/AuthContext';
import { useMealContext } from '../../contexts/MealContext';
import { createDish, getIngredients, addToDiary } from '../../service/api.service';
import { AddIngredientModal } from './AddIngredientModal';
import { BigYellowButton } from '../../components/big-yellow-button/BigYellowButton';
import { SearchResults } from '../../components/search-results/SearchResults';
import { SuccessfulAdd } from '../../components/successful-add/SuccessfulAdd';

const FoodOverview = styled.div`
  display: flex;
`;

const OpenIngredientModal = styled.div`
  color: #979797;
  cursor: pointer;
  text-align: right;
  text-decoration: underline;
`;

const Back = styled.div`
  color: #979797;
  cursor: pointer;
  text-align: right;
`;

const ButtonDiv = styled.div`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

const NutritionalInfo = ({ data }) => {
  return (
    <div className={`${styles.mealInfo}`}>
      <h3>Nutritional Facts</h3>
      <FoodOverview>
        <PlaceholderImage />
        <NutritionFacts
          calories={data.calories}
          carbs={data.carbs}
          protein={data.protein}
          fat={data.fat}
        />
      </FoodOverview>
    </div>
  );
};

const IngredientsInfo = ({ dishForm }) => {
  return (
    <div className={`${styles.ingredients}`}>
      <h4>Ingredients</h4>
      <Divider />
      {dishForm.ingredients.map(({ name, id, weight }) => (
        <div key={id} className={`${styles.ingredient}`}>
          <div className={`${styles.ingredientName}`}>{name}</div>
          <div className={`${styles.ingredientWeight}`}>{weight}g</div>
        </div>
      ))}
    </div>
  );
};

const validFields = (form, loading) => {
  if (!form.name || !form.createdBy || !form.ingredients.length || loading) {
    return false;
  }
  return true;
};

export const CreateFood = () => {
  let { meal } = useParams();
  const ingredientFormInitialvalue = {
    category: 0,
    id: '',
    name: 0,
    weight: '',
  };
  const { categories, meals } = useMealContext();
  const { currUser } = useAuth();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientForm, setIngredientForm] = useState(ingredientFormInitialvalue);
  const [dishForm, setDishForm] = useState({
    name: '',
    createdBy: currUser.uid || '',
    ingredients: [],
  });
  const [createDishSuccess, setCreateDishSuccess] = useState(false);
  const [createDishError, setCreateDishError] = useState();
  const [createIngredientsLoading, setCreateIngredientsLoading] = useState(false);
  const [newDishId, setNewDishId] = useState();
  const [nutrition, setNutrition] = useState({
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
  });
  const [loggedMeal, setLoggedMeal] = useState(false);

  /* Update nutrition info */
  useEffect(() => {
    const countAll = (macro) => {
      return dishForm.ingredients.map((x) => x[macro]).reduce((a, b) => a + b);
    };

    const calculateValues = () => {
      let newValues = {
        calories: countAll('calories'),
        carbs: countAll('carbs'),
        fat: countAll('fat'),
        protein: countAll('protein'),
      };
      setNutrition(newValues);
    };
    if (dishForm.ingredients.length) {
      calculateValues();
    } else {
      setNutrition({
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      });
    }
  }, [dishForm.ingredients]);
  /* Get list of ingredients */
  useEffect(() => {
    getIngredients()
      .then((response) => {
        setIngredients(response);
      })
      .catch(console.error);
  }, []);
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
      // push it to dish ingredients
      setDishForm((prevState) => ({
        ...prevState,
        ingredients: [
          ...prevState.ingredients,
          { ...ingredientToAdd, weight: ingredientForm.weight },
        ],
      }));
      setIngredientForm(ingredientFormInitialvalue);
      setIsModalOpen(false);
    } catch (e) {
      setCreateIngredientsLoading(false);
      console.error(e);
    }
  };

  const onDishCreate = async () => {
    try {
      const payload = {
        ...dishForm,
        ingredients: dishForm.ingredients.map(({ id, weight }) => ({
          ingredient: id,
          weight: Number(weight),
        })),
      };
      let newDish = await createDish({ ...payload });
      setNewDishId(newDish.id);
      setCreateDishSuccess(true);
    } catch (e) {
      console.error(e);
      setCreateDishError(e);
    }
  };

  const logToDiary = async () => {
    let date = Date.now();
    let body = {
      userID: currUser.uid,
      date,
      mealType: meal,
      dishID: newDishId,
    };
    let newEntry = await addToDiary(body);
    setLoggedMeal(true);

    setTimeout(() => {
      history.push(`/meal/${newEntry.id}`);
    }, 2500);
  };
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Create a Food</h1>
      </div>
      <div className="page-content full-page">
        <Back onClick={() => history.goBack()}>&lsaquo; Back</Back>
        {!createDishSuccess ? (
          <input
            placeholder="Name of food item"
            value={dishForm.name}
            onChange={({ target: { value } }) =>
              setDishForm((prevState) => ({
                ...prevState,
                name: value,
              }))
            }
          />
        ) : (
          <div className={`${styles.mealHeading}`}>
            <SearchResults meals={[dishForm]} search={false} />
          </div>
        )}
        <NutritionalInfo data={nutrition} />
        <IngredientsInfo dishForm={dishForm} />
        <OpenIngredientModal onClick={() => setIsModalOpen(true)} role="button" tabIndex={0}>
          Add Ingredients
        </OpenIngredientModal>
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
        {createDishSuccess && <span>Food has been created successfully</span>}
        <ButtonDiv>
          <BigYellowButton
            disabled={!validFields(dishForm, createIngredientsLoading)}
            text={`${createDishSuccess ? `Add ${meals[meal]} to Diary` : 'Create'}`}
            samePage={true}
            click={createDishSuccess ? logToDiary : onDishCreate}
          />
        </ButtonDiv>
        {createDishError && <span>create dish error due to {JSON.stringify(createDishError)}</span>}
      </div>
      <SuccessfulAdd meal={meals[meal]} loggedMeal={loggedMeal} />
    </div>
  );
};
