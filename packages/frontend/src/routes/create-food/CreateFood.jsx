import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Divider } from '../../components/divider';
import { Body, PlaceholderImage } from '../../components/layout';
import { NutritionFacts } from '../../components/nutrition-facts';
import { useAuth } from '../../contexts/AuthContext';
import { createDish, createIngredient, getIngredients } from '../../service/api.service';
import { AddIngredientModal } from './AddIngredientModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FoodOverview = styled.div`
  display: flex;
`;

const AddedIngredient = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OpenIngredientModal = styled.span`
  cursor: pointer;
  text-align: right;
  text-decoration: underline;
`;

const Back = styled.span`
  color: #979797;
  cursor: pointer;
  text-align: left;
`;

const SubmitCreateDish = styled.span`
  color: #16b187;
  cursor: pointer;
  padding: 16px 0;
  text-align: center;
`;

export const CreateFood = () => {
  const ingredientFormInitialvalue = {
    category: 0,
    name: '',
    weight: 0,
  };
  const { currUser } = useAuth();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getIngredients()
      .then((response) => {
        setIngredients(response);
        const availableCategories = response.map(({ category }) => category).filter(Boolean);
        const uniqueCategories = [...new Set(availableCategories)];
        setCategories(uniqueCategories);
      })
      .catch(console.error);
  }, []);

  const onFormUpdate = ({ target: { value } }, field) => {
    setIngredientForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onIngredientSubmit = async () => {
    try {
      // checks if ingredient has already been created
      const existingIngredient = ingredients.find(
        ({ name }) => name.toLowerCase() === ingredientForm.name.toLowerCase(),
      );
      // if it does not exist, create ingredient
      if (!existingIngredient) {
        setCreateIngredientsLoading(true);
        const { id } = await createIngredient({ ...ingredientForm });
        setDishForm((prevState) => ({
          ...prevState,
          ingredients: [
            ...prevState.ingredients,
            { name: ingredientForm.name, id, footprint: -1, weight: ingredientForm.weight },
          ],
        }));
        setIngredients((prevState) => [
          ...prevState,
          { name: ingredientForm.name, id, footprint: -1 },
        ]);
        setCreateIngredientsLoading(false);
        setIngredientForm(ingredientFormInitialvalue);
        setIsModalOpen(false);
        return;
      }
      // if it exists, push it to dish ingredients
      setDishForm((prevState) => ({
        ...prevState,
        ingredients: [
          ...prevState.ingredients,
          { ...existingIngredient, weight: ingredientForm.weight },
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
      await createDish({ ...payload });
      setCreateDishSuccess(true);
    } catch (e) {
      console.error(e);
      setCreateDishError(e);
    }
  };

  const addToDiary = () => {};

  return (
    <Wrapper>
      <div className="heading">
        <h1>Create a Food</h1>
      </div>
      <Body>
        <Back onClick={() => history.push('/dashboard')}>Back to Search</Back>
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
          ingredientForm.name
        )}
        <span>Nutritional Facts</span>
        <FoodOverview>
          <PlaceholderImage />
          <NutritionFacts calories={475} carbs={61} protein={25} fat={15} />
        </FoodOverview>
        <span>Ingredients</span>
        <Divider />
        {dishForm.ingredients.map(({ name, id, weight }) => (
          <AddedIngredient key={id}>
            <span>{name}</span>
            <span>{weight}g</span>
          </AddedIngredient>
        ))}
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
          />
        )}
        {createDishSuccess && <span>Food has been created successfully</span>}
        <SubmitCreateDish
          disabled={
            !dishForm.name ||
            !dishForm.createdBy ||
            !dishForm.ingredients.length ||
            !createIngredientsLoading
          }
          onClick={() => (createDishSuccess ? addToDiary() : onDishCreate())}
        >
          {createDishSuccess ? 'Add to Diary' : 'Create'}
        </SubmitCreateDish>
        {createDishError && <span>create dish error due to {JSON.stringify(createDishError)}</span>}
      </Body>
    </Wrapper>
  );
};
