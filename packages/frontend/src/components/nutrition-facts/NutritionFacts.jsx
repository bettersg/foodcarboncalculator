import styled from 'styled-components';
import { Divider } from '../divider';

const Wrapper = styled.div`
  line-height: 18px;
  width: 100%;
`;

const Macro = styled.div`
  display: flex;
  padding: 4px 0;
`;

const MacroAmount = styled.span`
  flex-grow: 1;
  flex-basis: 0;
  text-align: right;
  font-size: 15px;
`;

const MacroType = styled.span`
  flex-grow: 1.5;
  flex-basis: 0;
  padding-left: 12px;
  color: #747474;
  font-size: 15px;
`;

const CalorieAmount = styled.span`
  flex-grow: 1;
  flex-basis: 0;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
`;

const CalorieUnit = styled.span`
  flex-grow: 1.5;
  flex-basis: 0;
  padding-left: 12px;
  color: #747474;
  font-size: 18px;
`;

const Divider = styled.hr`
  width: 20%;
  border: 1px solid #16b187;
  margin-right: 43px;
`;

export const NutritionFacts = ({ calories, carbs, fat, protein }) => {
  return (
    <Wrapper>
      <Macro>
        <CalorieAmount>{calories}</CalorieAmount>
        <CalorieUnit>Calories</CalorieUnit>
      </Macro>
      <Divider />
      <Macro>
        <MacroAmount>{carbs}g</MacroAmount>
        <MacroType>Carbs</MacroType>
      </Macro>
      <Macro>
        <MacroAmount>{fat}g</MacroAmount>
        <MacroType>Fat</MacroType>
      </Macro>
      <Macro>
        <MacroAmount>{protein}g</MacroAmount>
        <MacroType>Protein</MacroType>
      </Macro>
    </Wrapper>
  );
};
