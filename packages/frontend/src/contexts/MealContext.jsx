import React, { useContext } from 'react';

const MealContext = React.createContext();
export function useMealContext() {
  return useContext(MealContext);
}

export function MealProvider({ children }) {
  const exampleMeals = [
    {
      id: 'cra1',
      mealName: 'Chicken Rice',
      ingredients: [
        {
          ingredientName: 'Chicken',
          ingredientAmt: '70g',
        },
        {
          ingredientName: 'Rice (Raw)',
          ingredientAmt: '60g',
        },
        {
          ingredientName: 'Vegetables',
          ingredientAmt: '6g',
        },
      ],
    },
    {
      id: 'nscb2',
      mealName: 'Nasi Lemak (Chicken)',
      ingredients: [
        {
          ingredientName: 'Chicken',
          ingredientAmt: '50g',
        },
        {
          ingredientName: 'Anchovies',
          ingredientAmt: '10g',
        },
        {
          ingredientName: 'Peanuts',
          ingredientAmt: '10g',
        },
        {
          ingredientName: 'Pandan Rice',
          ingredientAmt: '65g',
        },
        {
          ingredientName: 'Vegetables',
          ingredientAmt: '10g',
        },
      ],
    },
    {
      id: 'bckc3',
      mealName: 'Bak Chor Mee',
      ingredients: [
        {
          ingredientName: 'Minced Pork',
          ingredientAmt: '80g',
        },
        {
          ingredientName: 'Noodles',
          ingredientAmt: '60g',
        },
      ],
    },
    {
      id: 'sbd4',
      mealName: 'Spaghetti Bolognese',
      ingredients: [
        {
          ingredientName: 'Tomato',
          ingredientAmt: '100g',
        },
        {
          ingredientName: 'Spaghetti (Raw)',
          ingredientAmt: '80g',
        },
        {
          ingredientName: 'Minced Beef',
          ingredientAmt: '80g',
        },
      ],
    },
    {
      id: 'bme5',
      mealName: 'Ban Mian',
      ingredients: [
        {
          ingredientName: 'Meat',
          ingredientAmt: '70g',
        },
        {
          ingredientName: 'Noodles (Raw)',
          ingredientAmt: '80g',
        },
        {
          ingredientName: 'Vegetables',
          ingredientAmt: '20g',
        },
      ],
    },
    {
      id: 'pf6',
      mealName: 'Prata',
      ingredients: [
        {
          ingredientName: 'Prata',
          ingredientAmt: '40g',
        },
        {
          ingredientName: 'Ghee',
          ingredientAmt: '10g',
        },
        {
          ingredientName: 'Curry',
          ingredientAmt: '30g',
        },
      ],
    },
  ];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const value = {
    exampleMeals,
    meals,
  };
  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
