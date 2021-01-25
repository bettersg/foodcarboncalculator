/* eslint-disable no-unused-vars */
import { Body, PlaceholderImage } from '../../components/layout';
import { NutritionFacts } from '../../components/nutrition-facts';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { createIngredient, getIngredients } from '../../service/api.service';
import { Divider } from '../../components/divider';
import { Modal } from '../../components/modal';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FoodOverview = styled.div`
  display: flex;
`;

export const CreateFood = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ingredients, setIngredients] = useState([]);
  const [ingredientForm, setIngredientForm] = useState({
    category: 0,
    name: '',
  });
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  const onSubmit = async () => {
    try {
      // checks if ingredient has already been created
      const existingIngredient = ingredients.find(
        ({ name }) => name.toLowerCase() === ingredientForm.name.toLowerCase(),
      );
      // if it does not exist, create ingredient
      if (!existingIngredient) {
        const id = await createIngredient({ ...ingredientForm });
        setSelectedIngredients((prevState) => [...prevState, { ...ingredientForm, id }]);
        return;
      }
      setSelectedIngredients((prevState) => [...prevState, { ...existingIngredient }]);
      // const id = await createIngredient({ ...ingredientForm });
      // console.log(id);
    } catch (e) {
      console.error(e);
    }
  };
  console.log(selectedIngredients);
  return (
    <Wrapper>
      <div className="heading">
        <h1>Create a Food</h1>
      </div>
      <Body>
        <span>Back to Search</span>
        <input placeholder="Name of food item" />
        <span>Nutritional Facts</span>
        <FoodOverview>
          <PlaceholderImage />
          <NutritionFacts calories={475} carbs={61} protein={25} fat={15} />
        </FoodOverview>
        <span>Ingredients</span>
        <Divider />
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <form></form>
            <span>ADD INGREDIENTS</span>
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              value={ingredientForm.category}
              onChange={(event) => onFormUpdate(event, 'category')}
            >
              <option disabled value={0}>
                Select category
              </option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            <span>Weight</span>
            <Input
              type="tel"
              placeholder="Enter grams"
              value={ingredientForm.name}
              onChange={(event) => onFormUpdate(event, 'name')}
            />
            <Button disabled={!ingredientForm.category || !ingredientForm.name} onClick={onSubmit}>
              Add
            </Button>
          </Modal>
        )}
      </Body>
    </Wrapper>
  );
};
