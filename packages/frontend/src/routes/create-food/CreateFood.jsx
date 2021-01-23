import { NutritionFacts } from '../../components/nutrition-facts';

export const CreateFood = () => {
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Create a Food</h1>
      </div>
      <div>
        <NutritionFacts calories={475} carbs={61} protein={25} fat={15} />
      </div>
    </div>
  );
};
