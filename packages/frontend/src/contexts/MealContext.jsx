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

  const toggleFavourite = async (meal) => {
    let body = {
      user: currUser.uid,
      dish: meal.id,
    };
    let index = favourites.findIndex((x) => x.id === meal.id);
    let temp = [...favourites];
    try {
      await getData.put('/dishes/favourite', body);

      if (index !== -1) {
        temp.splice(index, 1);
        setFavourites(temp);
      } else {
        temp.push(meal);
        setFavourites(temp);
      }
    } catch (e) {
      console.log(e);
      alert('error adding dish to favourites');
    }
  };

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
    toggleFavourite,
  };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
