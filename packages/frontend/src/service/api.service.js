const BASE_URL = 'http://localhost:3080/api/v1';

export const getIngredients = async () => {
  const response = await fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
  });
  return response.json();
};

export const getDiaryWeekStatus = async ({ uid }) => {
  const response = await fetch(`${BASE_URL}/diary/week?user=${uid}`, {
    method: 'GET',
  });
  return response.json();
};
