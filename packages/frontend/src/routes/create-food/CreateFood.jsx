import { Body, PlaceholderImage } from '../../components/layout';
import { NutritionFacts } from '../../components/nutrition-facts';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FoodOverview = styled.div`
  display: flex;
`;

export const CreateFood = () => {
  return (
    <Wrapper>
      <div className="heading">
        <h1>Create a Food</h1>
      </div>
      <Body>
        <span>Back to Search</span>
        <input />
        <span>Nutritional Facts</span>
        <FoodOverview>
          <PlaceholderImage />
          <NutritionFacts calories={475} carbs={61} protein={25} fat={15} />
        </FoodOverview>
      </Body>
    </Wrapper>
  );
};
