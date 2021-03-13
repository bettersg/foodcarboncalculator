const BASE_URL =
  'https://asia-east2-better-food-carbon-calculator.cloudfunctions.net/climateDiet/api/v1';

export const getIngredients = async () => {
  const response = await fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getDiaryWeekStatus = async (uid, date) => {
  const response = await fetch(`${BASE_URL}/diary/week?user=${uid}&date=${date}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getFavouritesList = async (uid) => {
  const response = await fetch(`${BASE_URL}/dishes/favourite?user=${uid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const updateFavouritesList = async (body) => {
  const response = await fetch(`${BASE_URL}/dishes/favourite`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const createIngredient = async ({ name, category }) => {
  const response = await fetch(`${BASE_URL}/dishes/ingredient`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, category }),
  });
  return response.json();
};

export const createDish = async ({ name, createdBy, ingredients }) => {
  const response = await fetch(`${BASE_URL}/dishes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, createdBy, ingredients }),
  });

  if (response.status === 200) {
    return response.json();
  }

  return {};
};

export const addToDiary = async ({ userID, date, dishID, mealType }) => {
  const response = await fetch(`${BASE_URL}/diary`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID, date, dishID, mealType }),
  });
  return response.json();
};

export const createUserSettings = async (id) => {
  const response = await fetch(`${BASE_URL}/user/?user=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getAllDishes = async (id) => {
  const response = await fetch(`${BASE_URL}/dishes?user=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getMealRecord = async (id) => {
  const response = await fetch(`${BASE_URL}/diary/meal?id=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const updateMealRecord = async (id, ingredients) => {
  const response = await fetch(`${BASE_URL}/diary/meal?id=${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredients),
  });
  return response.json();
};
