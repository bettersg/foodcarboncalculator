export const EnvironmentalImpact = ({ carbonUnits }) => {
  return (
    <div>
      <div>
        <span className="food-nutrition-value">{carbonUnits}</span>
        <span className="food-nutrition-type"> Carbon Units</span>
      </div>
      <div>
        <span className="food-nutrition-value">CO2</span>
        <span className="food-nutrition-type">ooo scary</span>
      </div>
    </div>
  );
};
