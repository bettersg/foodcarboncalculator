import { useState, useEffect } from 'react';
import { Barometer } from '../../components/barometer';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/footer';
import { getDiaryWeekStatus } from '../../service/api.service';
import DayPicker from 'react-day-picker';
import { Modal } from '../../components/modal';

export const Dashboard = () => {
  const { currUser } = useAuth();
  const [statusData, setStatusData] = useState({
    byNutrition: undefined,
    totalCalories: undefined,
    totalFootprint: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [rootDay, setRootDay] = useState(Date.now());
  const [showChooseDate, setShowChooseDate] = useState(false);

  const handleOnDayClick = (day) => {
    setRootDay(new Date(day).getTime());
    setShowChooseDate(false);
  };

  /* Get dashboard data for given week */
  useEffect(() => {
    let isMounted = true;
    const getWeekStatus = async () => {
      setIsLoading(true);
      try {
        const weekStatus = await getDiaryWeekStatus(currUser.uid, rootDay);
        setStatusData(weekStatus);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (isMounted) {
      getWeekStatus();
    }
    return () => {
      isMounted = false;
    };
  }, [currUser.uid, rootDay]);

  return (
    <div className="page-container">
      <div className="heading">
        <h1>Home</h1>
      </div>
      <div className="secondary-heading">
        <h2>Welcome to your dashboard</h2>
      </div>
      <Barometer
        calories={statusData.totalCalories}
        nutrition={statusData.byNutrition}
        footprint={statusData.totalFootprint}
        rootDay={rootDay}
        showChooseDate={showChooseDate}
        setShowChooseDate={setShowChooseDate}
        isLoading={isLoading}
      />
      {showChooseDate && (
        <Modal>
          <DayPicker onDayClick={handleOnDayClick} />
        </Modal>
      )}
      <Footer />
    </div>
  );
};
