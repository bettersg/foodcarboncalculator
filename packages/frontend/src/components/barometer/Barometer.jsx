import { useState } from 'react';
import { ReactComponent as Repeat } from '../../assets/svg/repeat.svg';
import styles from '../../styles/DashboardBarometer.module.css';

const ShowNutritionData = ({ nutrition }) => {
  return (
    <div className={`${styles.nutritionFacts}`}>
      <div>
        <div className={`${styles.value}`}>{nutrition.totalProtein.toFixed(1)}g</div>
        <div className={`${styles.type}`}>Protein</div>
      </div>
      <div>
        <div className={`${styles.value}`}>{nutrition.totalCarbs.toFixed(1)}g</div>
        <div className={`${styles.type}`}>Carbs</div>
      </div>
      <div>
        <div className={`${styles.value}`}>{nutrition.totalFat.toFixed(1)}g</div>
        <div className={`${styles.type}`}>Fat</div>
      </div>
    </div>
  );
};

export const Barometer = ({ calories, nutrition, footprint, showWeek }) => {
  /* toggle - True: Diet, False: Climate */
  const [toggleView, setToggleView] = useState(true);

  return (
    <div className={`${styles.barometerContainer} page-content`}>
      <div className={`${styles.header}`}>
        <h3>{toggleView ? 'Diet Status' : 'Climate Diet Status'}</h3>
        <div>This week {showWeek}</div>
      </div>
      <div
        className={`${styles.repeat}`}
        onClick={() => setToggleView(!toggleView)}
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
      >
        <Repeat />
      </div>
      <div className={`${styles.barometerSection}`}>
        <div className={`${styles.header}`}>
          <h3>Overview</h3>
          <div>
            Consumed <span>/ Limit</span>
          </div>
        </div>
        <div className={`${styles.barometer}`}>
          <div>
            <div></div>
            <div>
              <div>
                <div>
                  {toggleView ? calories.toFixed(1) : footprint.toFixed(1)}
                  <span className={`${styles.limit}`}> /</span>
                </div>
                <div className={`${styles.limit}`}>LIMIT*</div>
              </div>
              <div className={`${styles.small}`}>
                {toggleView ? (
                  'Calories'
                ) : (
                  <>
                    kg CO<sub>2</sub>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {toggleView ? (
          <ShowNutritionData nutrition={nutrition} />
        ) : (
          <div className={`${styles.climateNote}`}>
            It takes a mature tree one year to absorb 22kg of CO<sub>2</sub> emissions.
          </div>
        )}
        <div className={`${styles.footer}`}>
          {toggleView
            ? '*Based on an average calorie intake for Women'
            : '*Based on A*STAR report and Vegan Society Data'}
        </div>
      </div>
    </div>
  );
};
