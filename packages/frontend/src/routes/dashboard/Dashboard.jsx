import { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getData } from '../../common/axiosInstances';
import { DashboardBarometer } from '../../components/dashboard-barometer/DashboardBarometer';

export const Dashboard = () => {
  const { currUser } = useAuth();
  const [statusData, setStatusData] = useState();

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

  return (
    <div className="page-container">
      <div className="heading">
        <h1>Home</h1>
      </div>
      <div className="secondary-heading">
        <h2>Welcome to your dashboard</h2>
      </div>
      {statusData && (
        <DashboardBarometer
          calories={statusData.totalCalories}
          nutrition={statusData.byNutrition}
          footprint={statusData.totalFootprint}
        />
      )}
      {/* {!statusData ? 'Loading' : fullDetails ? fullDashboard() : summaryDashboard()} */}
    </div>
  );
};
