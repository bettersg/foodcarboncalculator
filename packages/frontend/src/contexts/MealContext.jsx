/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useContext } from 'react';

const MealContext = React.createContext();
export function useMealContext() {
    return useContext(MealContext);
}

export function MealProvider({ children }) {
    const exampleMeals = ['Chicken Rice', 'Nasi Lemak', 'Bak Chor Mee', 'Spaghetti Bolognese', 'Ban Mian', 'Prata']
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    const value = {
        exampleMeals,
        meals,
    };
    return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}
