export const NutritionFacts = ({ calories, carbs, fat, protein }) => {
  return (
    <div>
      <div>
        <span>{calories}</span>
        <span> Cal</span>
      </div>
      <hr />
      <div>
        <span>{carbs}g</span>
        <span>Carbs</span>
      </div>
      <div>
        <span>{fat}g</span>
        <span>Fat</span>
      </div>
      <div>
        <span>{protein}g</span>
        <span>Protein</span>
      </div>
    </div>
  );
};
