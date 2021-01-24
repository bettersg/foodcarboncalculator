import { useState, useEffect } from 'react';
import { Barometer } from '../../components/barometer';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/footer';
import { getDiaryWeekStatus } from '../../service/api.service';

export const Dashboard = () => {
  const { currUser } = useAuth();
  const [statusData, setStatusData] = useState();

  useEffect(() => {
    const getWeekStatus = async () => {
      try {
        const weekStatus = await getDiaryWeekStatus(currUser.uid);
        setStatusData(weekStatus);
      } catch (error) {
        console.error(error);
      }
    };
    getWeekStatus();
  }, [currUser.uid]);
  return (
    <div className="page-container">
      <div className="heading">
        <h1>Home</h1>
      </div>
      <div className="secondary-heading">
        <h2>Welcome to your dashboard</h2>
      </div>
      {statusData && (
        <Barometer
          calories={statusData.totalCalories}
          nutrition={statusData.byNutrition}
          footprint={statusData.totalFootprint}
        />
      )}
      <Footer />
    </div>
  );
};
