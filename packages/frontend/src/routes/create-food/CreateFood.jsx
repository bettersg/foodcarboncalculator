import { Body } from '../../components/layout';
import { NutritionFacts } from '../../components/nutrition-facts';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const CreateFood = () => {
  return (
    <Wrapper>
      <div className="heading">
        <h1>Create a Food</h1>
      </div>
      <Body>
        <NutritionFacts calories={475} carbs={61} protein={25} fat={15} />
      </Body>
    </Wrapper>
  );
};
