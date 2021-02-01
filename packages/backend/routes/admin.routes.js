const express = require('express');
const moment = require('moment');
const db = require('../config/firestoreConfig.js');
const AdminRoutes = express.Router();

const compareDate = (d1, d2) => {
  if (d1 === d2) {
    return true;
  } else {
    return false;
  }
};

AdminRoutes.get('/test', async (req, res) => {
  try {
    return res.status(200).json({ test: 'Admin test successful!' });
  } catch (e) {
    console.error(e);
  }
});

AdminRoutes.get('/summary', async (req, res) => {
  let meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  try {
    let { user, date } = req.query;
    let searchDate;
    if (date) {
      searchDate = moment(date, `D-MM-YYYY`).format(`D MMM YYYY`);
    }

    let query = await db.collection('mealRecords').where(`userId`, `==`, user).get();

    let final = [];

    for (let doc of query.docs) {
      let record = doc.data();
      let { userId, mealType, ...rest } = record;
      let toAdd = {
        ...rest,
        meal: meals[mealType],
        date: moment(record.date).format(`D MMM YYYY`),
      };

      if (!searchDate || (searchDate && compareDate(searchDate, toAdd.date))) {
        for (let i of toAdd.ingredients) {
          /* Populate ingredient reference */
          let queryIngredient = await i.ingredient.get();
          i.name = queryIngredient.data().name;

          // /* Populate category reference */
          // let queryCategory = await i.category.get();
          // i.category = queryCategory.data().name;

          delete i.ingredient;
        }
        final.push(toAdd);
      }
    }

    let printOut = `
        --------------
        Meals on ${searchDate}
        --------------
        `;
    for (let r of final) {
      printOut += `\n${r.meal}\n${r.name}`;
      for (let i of r.ingredients) {
        printOut += `\n${i.name}, ${i.weight}g`;
      }
      printOut += `\n--------------`;
    }

    return res.status(200).json(printOut);
  } catch (e) {
    console.error(e);
  }
});

module.exports = AdminRoutes;
