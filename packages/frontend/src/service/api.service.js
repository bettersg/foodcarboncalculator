const BASE_URL = 'http://localhost:3080/api/v1';

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

export const getDiaryWeekStatus = async (uid) => {
  const response = await fetch(`${BASE_URL}/diary/week?user=${uid}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getFavouritesList = async (uid) => {
  const response = await fetch(`${BASE_URL}/dishes/favourite?user=${uid}}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
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
