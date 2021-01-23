export const getIngredients = async () => {
  const response = await fetch('http://localhost:3080/api/v1/ingredients', {
    method: 'GET',
  });
  return response.json();
};
