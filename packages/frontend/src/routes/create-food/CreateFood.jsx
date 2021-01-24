import { Body, PlaceholderImage } from '../../components/layout';
import { NutritionFacts } from '../../components/nutrition-facts';
import styled from 'styled-components';
import { useEffect } from 'react';
import { getIngredients } from '../../service/api.service';
import { Divider } from '../../components/Divider';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FoodOverview = styled.div`
  display: flex;
`;

export const CreateFood = () => {
  useEffect(() => {
    getIngredients();
  }, []);

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
      </Body>
    </Wrapper>
  );
};
