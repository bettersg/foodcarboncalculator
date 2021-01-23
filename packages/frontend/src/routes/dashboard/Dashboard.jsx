import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getData } from '../../common/axiosInstances';

export const Dashboard = () => {
  const { currUser } = useAuth();
  const [statusData, setStatusData] = useState();
  const [fullDetails, setFullDetails] = useState(false);
  /* false: Nutrition tab, true: Climate Tab */
  const [nutritionOrClimateTab, setNutritionOrClimateTab] = useState(false);
  const categoryList = [
    'Whole grain',
    'Tubers or starchy vegetables',
    'Vegetables',
    'Fruits',
    'Dairy food',
    'Protein',
    'Added fat',
    'Added sugar',
  ];

  useEffect(() => {
    const getWeekStatus = async () => {
      try {
        let weekStatus = await getData.get(`/diary/week?user=${currUser.uid}`);
        setStatusData(weekStatus.data);
      } catch (error) {
        console.error(error);
      }
    };
    getWeekStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summaryDashboard = () => {
    return (
      <div id="summary-dashboard">
        <h3>Diet Status</h3>
        <div>This week -------------</div>
        <div>
          <h3>Overview</h3>
          <div>Consumed/Limit</div>
          <hr />
        </div>
        <div id="graph_thing">
          <div>{statusData.totalCalories} / xxx</div>
          <div>Calories</div>
        </div>
        <div id="nutrition_data">
          <div id="protein">
            <div>{statusData.byNutrition.totalProtein}g</div>
            <div>Protein</div>
          </div>
          <div id="carbs">
            <div>{statusData.byNutrition.totaCarbs}g</div>
            <div>Carbs</div>
          </div>
          <div id="fat">
            <div>{statusData.byNutrition.totalFat}g</div>
            <div>Fat</div>
          </div>
          <button onClick={() => setFullDetails(!fullDetails)}>See full details</button>
        </div>
      </div>
    );
  };
  const fullDashboard = () => {
    return (
      <div id="full-dashboard">
        <h3>Diet Status</h3>
        <div>This week -------------</div>
        <div>
          <h3>Overview</h3>
          <div id="tabs">
            <button onClick={() => setNutritionOrClimateTab(false)}>Nutritional Facts</button>
            <button onClick={() => setNutritionOrClimateTab(true)}>Climate Impact</button>
          </div>
        </div>
        <div id="nutrition-tab">
          <div id="tab-heading">
            {nutritionOrClimateTab ? (
              <>
                <div>{statusData.totalFootprint}</div>
                <div>
                  kg CO<sub>2</sub>
                </div>
              </>
            ) : (
              <>
                <div>{statusData.totalCalories}</div>
                <div>Calories</div>
              </>
            )}
          </div>
          <div id="by-nutrition">
            <div>
              <div>{statusData.byNutrition.totalCarbs}</div>
              <div>Carbs</div>
            </div>
            <div>
              <div>{statusData.byNutrition.totalProtein}</div>
              <div>Protein</div>
            </div>
            <div>
              <div>{statusData.byNutrition.totalFat}</div>
              <div>Fat</div>
            </div>
          </div>
          <hr />
          <div id="by-category">
            <div>{nutritionOrClimateTab && 'Consumed/Limit'}</div>
            {categoryList.map((category) => (
              <div key={category}>
                <div>{category}</div>
                <div>
                  {statusData.byCategory[category]}
                  {nutritionOrClimateTab && ` / Limit `}g
                </div>
                {/* {(nutritionOrClimateTab && statusData.byCategory[category] ISCLOSETOLIMIT) &&
                <div>
                  You might want to reduce your {category.toLowerCase()} intake
                </div>} */}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setFullDetails(!fullDetails)}>See full details</button>
      </div>
    );
  };
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Home</h1>
      </div>
      <h2>Welcome to your dashboard.</h2>
      {!statusData ? 'Loading' : fullDetails ? fullDashboard() : summaryDashboard()}
      <div>
        <NavLink to="/log-meal">
          <h6>Add a meal</h6>
        </NavLink>
      </div>
    </div>
  );
};
