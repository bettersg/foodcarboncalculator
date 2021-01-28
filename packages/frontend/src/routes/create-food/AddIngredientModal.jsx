import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Modal } from '../../components/modal';
import styled from 'styled-components';

const H1 = styled.h1`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  color: #005a36;
  margin: 19px 0;
`;

const H2 = styled.h2`
  font-weight: bold;
  font-size: 20px;
  line-height: 125.2%;
  color: #282c35;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  font-size: 16px;
  padding: 14px;
  margin: 10px 0;
  border: none;
  border-radius: 999px;
  font-weight: 500;
  color: #005a36;
`;

const InputContainer = styled.div`
  position: relative;

  > span {
    position: absolute;
    color: #979797;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const allFieldsFilled = (form) => {
  if (!form.category || !form.name || !form.weight) {
    return false;
  }
  return true;
};

export const AddIngredientModal = ({
  categories,
  ingredientForm,
  onClose,
  onFormUpdate,
  onSubmit,
  ingredients,
}) => (
  <Modal onClose={onClose}>
    <H1>ADD INGREDIENTS</H1>
    {/* eslint-disable-next-line jsx-a11y/no-onchange */}
    <H2>Select category</H2>
    <Select value={ingredientForm.category} onChange={(event) => onFormUpdate(event, 'category')}>
      <option disabled value={0}>
        Select category
      </option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
    {ingredientForm.category !== 0 && (
      <>
        <H2>Ingredient</H2>
        <Select value={ingredientForm.name} onChange={(event) => onFormUpdate(event, 'name')}>
          <option disabled value={0}>
            Select ingredient
          </option>
          {ingredients.map((i) => (
            <>
              {i.category === ingredientForm.category && (
                <option value={i.id} key={i.name}>
                  {i.name}
                </option>
              )}
            </>
          ))}
        </Select>
      </>
    )}
    <H2>Weight</H2>
    <InputContainer>
      <Input
        type="number"
        placeholder="Enter weight"
        value={ingredientForm.weight}
        onChange={(event) => onFormUpdate(event, 'weight')}
      />
      <span>(g)</span>
    </InputContainer>
    <Button disabled={!allFieldsFilled(ingredientForm)} onClick={onSubmit}>
      Add
    </Button>
  </Modal>
);
