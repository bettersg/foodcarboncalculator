import React, { useState, useContext, useEffect } from 'react';
import { getFavouritesList, updateFavouritesList } from '../service/api.service';
import { useAuth } from '../contexts/AuthContext';

const MealContext = React.createContext();
export function useMealContext() {
  return useContext(MealContext);
}

export function MealProvider({ children }) {
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const categories = [
    {
      id: 'grains',
      name: 'Whole grain',
    },
    {
      id: 'tubers',
      name: 'Tubers or starchy vegetables',
    },
    {
      id: 'vegetables',
      name: 'Vegetables',
    },
    {
      id: 'fruits',
      name: 'Fruits',
    },
    {
      id: 'protein',
      name: 'Protein',
    },
    {
      id: 'dairy',
      name: 'Dairy Food',
    },
    {
      id: 'sugars',
      name: 'Added Sugars',
    },
    {
      id: 'fats',
      name: 'Added fats',
    },
  ];
  const [favourites, setFavourites] = useState();
  const { currUser } = useAuth();

  useEffect(() => {
    const getFavourites = async () => {
      let faves = await getFavouritesList(currUser.uid);
      setFavourites(faves);
    };
    if (currUser) {
      getFavourites();
    }
  }, [currUser]);

  const toggleFavourite = async (meal) => {
    let body = {
      user: currUser.uid,
      dish: meal.id,
    };
    let index = favourites.findIndex((x) => x.id === meal.id);
    let temp = [...favourites];
    try {
      await updateFavouritesList(body);

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

  const value = {
    meals,
    categories,
    favourites,
    toggleFavourite,
  };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
