import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Modal } from '../../components/modal';

export const AddIngredientModal = ({
  categories,
  ingredientForm,
  onClose,
  onFormUpdate,
  onSubmit,
}) => (
  <Modal onClose={onClose}>
    <form></form>
    <span>ADD INGREDIENTS</span>
    {/* eslint-disable-next-line jsx-a11y/no-onchange */}
    <select value={ingredientForm.category} onChange={(event) => onFormUpdate(event, 'category')}>
      <option disabled value={0}>
        Select category
      </option>
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
    {ingredientForm.category !== 0 && (
      <Input
        type="name"
        placeholder="Enter name"
        value={ingredientForm.name}
        onChange={(event) => onFormUpdate(event, 'name')}
      />
    )}
    <span>Weight</span>
    <Input
      type="tel"
      placeholder="Enter grams"
      value={ingredientForm.weight}
      onChange={(event) => onFormUpdate(event, 'weight')}
    />
    <Button
      disabled={!ingredientForm.category || !ingredientForm.name || !ingredientForm.weight}
      onClick={onSubmit}
    >
      Add
    </Button>
  </Modal>
);
