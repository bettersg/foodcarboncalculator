export const getIngredients = () => {
  fetch('http://localhost:3080/api/v1/ingredients', { method: 'GET', mode: 'no-cors' })
    .then((response) => {
      console.log(response);
      return response.json;
    })
    .then((data) => console.log(data));
};
