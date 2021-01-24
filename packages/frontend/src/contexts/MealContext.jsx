import React, { useState, useContext, useEffect } from 'react';
import { getData } from '../common/axiosInstances';
import { useAuth } from '../contexts/AuthContext';

const MealContext = React.createContext();
export function useMealContext() {
  return useContext(MealContext);
}

export function MealProvider({ children }) {
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const [favourites, setFavourites] = useState();
  const { currUser } = useAuth();

  useEffect(() => {
    const getFavourites = async () => {
      let faves = await getData.get(`/dishes/favourite?user=${currUser.uid}`);
      setFavourites(faves.data);
    };
    if (currUser) {
      getFavourites();
    }
  }, [currUser]);
  const value = {
    meals,
    favourites,
    setFavourites,
  };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
