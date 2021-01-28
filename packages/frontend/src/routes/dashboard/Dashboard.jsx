import { useState, useEffect } from 'react';
import { Barometer } from '../../components/barometer';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/footer';
import { getDiaryWeekStatus } from '../../service/api.service';
import moment from 'moment';

const getWeek = (day) => {
  let startOfWeek = moment(day)
    .add(1 - moment(day).day(), 'd')
    .format('D MMM');
  let endOfWeek = moment(day)
    .add(7 - moment(day).day(), 'd')
    .format('D MMM');
  return `${startOfWeek} - ${endOfWeek}`;
};

export const Dashboard = () => {
  const { currUser } = useAuth();
  const [statusData, setStatusData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [rootDay, setRootDay] = useState(Date.now());
  // eslint-disable-next-line no-unused-vars
  const [showWeek, setShowWeek] = useState(getWeek(rootDay));

  /* Get dashboard data for given week */
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
          showWeek={showWeek}
        />
      )}
      <Footer />
    </div>
  );
};
