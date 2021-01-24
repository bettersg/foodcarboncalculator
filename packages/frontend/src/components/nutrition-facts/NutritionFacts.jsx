import styled from 'styled-components';
import { Divider } from '../divider';

const Wrapper = styled.div`
  font-size: 16px;
  line-height: 18px;
  padding: 0 12px;
  width: 100%;
`;

const Macro = styled.div`
  display: flex;
  padding-bottom: 8px;
`;

const MacroAmount = styled.span`
  flex-grow: 1;
  padding-left: 12px;
`;

const MacroType = styled.span`
  color: #747474;
  flex-grow: 2;
`;

export const NutritionFacts = ({ calories, carbs, fat, protein }) => {
  return (
    <Wrapper>
      <Macro>
        <MacroAmount>{calories}</MacroAmount>
        <MacroType> Cal</MacroType>
      </Macro>
      <Divider variant="lightGrey" />
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
