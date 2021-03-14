const express = require('express');
const db = require('../config/firestoreConfig.js');
const DiaryRoutes = express.Router();
const moment = require('moment');
// const functions = require('firebase-functions');

DiaryRoutes.get('/test', (req, res) => {
  return res.status(200).json({ test: 'Diary test successful!' });
});

/**
 * @api {get} /diary/week?user=<userUID>&date=<date> Get carbon data for a given week
 * @apiName v1/getDiaryWeek
 * @apiGroup Diary
 *
 * @apiParam {String} <userUID> Search this user's diary
 * @apiParam {String} <date> OPTIONAL: Return entries in the week of this day
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary/week?user=<userUID>&date=<date>
 *
 * @apiSuccess (200) {Number} "totalCalories" total kcal in the week
 * @apiSuccess (200) {Number} "totalFootprint" total kg CO2 in the week
 * @apiSuccess (200) {Number} "byNutrition.totalCarbs" g of carbs for the week
 * @apiSuccess (200) {Number} "byNutrition.totalProtein" g of protein for the week
 * @apiSuccess (200) {Number} "byNutrition.totalFat" g of fat for the week
 * @apiSuccess (200) {Number} "byCategory.Whole grain" g of Whole grain for the week
 * @apiSuccess (200) {Number} "byCategory.Vegetables" g of Vegetables for the week
 * @apiSuccess (200) {Number} "byCategory.Fruits" g of Fruits for the week
 * @apiSuccess (200) {Number} "byCategory.Dairy Food" g of Dairy Food for the week
 * @apiSuccess (200) {Number} "byCategory.Protein" g of Protein for the week
 * @apiSuccess (200) {Number} "byCategory.Added fat" g of Added fat for the week
 * @apiSuccess (200) {Number} "byCategory.Added sugar" g of Added sugar for the week
 * @apiSuccess (200) {Number} "byCategory.Tubers or starchy vegetables" g of Tubers or starchy vegetables for the week
 */
DiaryRoutes.get('/week', async (req, res) => {
  try {
    let { user, date } = req.query;

    let dayOfWeek = moment(Number(date)).day() ? moment(Number(date)).day() : 7;
    let startOfWeek = moment(Number(date)).add(1 - dayOfWeek, 'd');
    let endOfWeek = moment(Number(date)).add(7 - dayOfWeek, 'd');

    if (!user) {
      return res.sendStatus(400).json({ msg: 'No user' });
    }
    let consumption = {
      totalCalories: 0,
      totalFootprint: 0,
      byNutrition: {
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
      },
      byCategory: {
        'Whole grain': 0,
        Vegetables: 0,
        Fruits: 0,
        'Dairy food': 0,
        Protein: 0,
        'Added fat': 0,
        'Added sugar': 0,
        'Tubers or starchy vegetables': 0,
      },
    };

    const calculateTotals = (consumption, thisIngredient, weight) => {
      consumption.totalCalories += (thisIngredient.calories / 100) * weight;
      consumption.totalFootprint += (weight / 1000) * thisIngredient.footprint;
      consumption.byNutrition.totalCarbs += (thisIngredient.carbs / 100) * weight;
      consumption.byNutrition.totalProtein += (thisIngredient.protein / 100) * weight;
      consumption.byNutrition.totalFat += (thisIngredient.fat / 100) * weight;
    };
    const isWithinWeek = (date) => {
      return (
        moment(date).isSameOrAfter(startOfWeek, 'day') &&
        moment(date).isSameOrBefore(endOfWeek, 'day')
      );
    };

    let diaryQuery = await db.collection('mealRecords').where('userId', '==', user).get();

    for (let entry of diaryQuery.docs) {
      if (isWithinWeek(entry.data().date)) {
        for (let i of entry.data().ingredients) {
          /* Retrieve ingredient reference */
          let queryIngredient = await i.ingredient.get();
          let thisIngredient = queryIngredient.data();

          /* Retrieve category reference */
          let queryCategory = await queryIngredient.data().category.get();
          let category = queryCategory.data().name;

          /* Update final amount */
          calculateTotals(consumption, thisIngredient, i.weight);

          // consumption.byCategory
          consumption.byCategory[category] += i.weight;
        }
      }
    }

    return res.status(200).json(consumption);
  } catch (e) {
    console.error(e);
  }
});

/**
 * @api {get} /diary/day?user=<userUID>&date=<date> Get carbon data for a given day
 * @apiName v1/getDiaryDay
 * @apiGroup Diary
 *
 * @apiParam {String} <userUID> Search this user's diary
 * @apiParam {String} <date> OPTIONAL: Return entries of this day
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary/day?user=<userUID>&date=<date>
 *
 * @apiSuccess (200) {Number} "totalCalories" total kcal in the day
 * @apiSuccess (200) {Number} "byNutrition.totalCarbs" g of carbs for the day
 * @apiSuccess (200) {Number} "byNutrition.totalProtein" g of protein for the day
 * @apiSuccess (200) {Number} "byNutrition.totalFat" g of fat for the day
 * @apiSuccess (200) {Object[]} "meals" List of meals for the day, grouped by mealType
 * @apiSuccess (200) {String} "meals.mealType[].name" name of dish
 * @apiSuccess (200) {String} "meals.mealType[].id" id of dish
 */
DiaryRoutes.get('/day', async (req, res) => {
  try {
    let { user, date } = req.query;

    let consumption = {
      totalCalories: 0,
      byNutrition: {
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0,
      },
      meals: {
        0: [],
        1: [],
        2: [],
        3: [],
      },
    };

    const calculateTotals = (consumption, thisIngredient, weight) => {
      consumption.totalCalories += (thisIngredient.calories / 100) * weight;
      consumption.byNutrition.totalCarbs += (thisIngredient.carbs / 100) * weight;
      consumption.byNutrition.totalProtein += (thisIngredient.protein / 100) * weight;
      consumption.byNutrition.totalFat += (thisIngredient.fat / 100) * weight;
    };
    const sortMeal = (consumption, dish) => {
      consumption.meals[dish.data().mealType].push({
        name: dish.data().name,
        id: dish.id,
      });
    };

    const isThisDay = (mealDate) => {
      return moment(mealDate).isSame(moment(Number(date)), 'day');
    };

    /* TODO : FILTER BY DATE */
    let diaryQuery = await db.collection('mealRecords').where('userId', '==', user).get();

    for (let entry of diaryQuery.docs) {
      if (isThisDay(entry.data().date)) {
        sortMeal(consumption, entry);
        for (let i of entry.data().ingredients) {
          /* Retrieve ingredient reference */
          let queryIngredient = await i.ingredient.get();
          let thisIngredient = queryIngredient.data();

          /* Update final amount */
          calculateTotals(consumption, thisIngredient, i.weight);
        }
      }
    }

    return res.status(200).json(consumption);
  } catch (e) {
    console.error(e);
  }
});

/**
 * @api {get} /diary/meal?id=<mealRecordID> Get meal record
 * @apiName v1/getMealRecord
 * @apiGroup Diary
 *
 * @apiParam {String} <mealRecordID> ID of meal record to retrieve
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary/meal?id=1s5df61sd5f6ds
 *
 * @apiSuccess (200) {Number} "name" name of the dish
 * @apiSuccess (200) {Number} "date" date of the dish in milliseconds
 * @apiSuccess (200) {Number} "totalCalories" total kcal in the dish
 * @apiSuccess (200) {Number} "totalCarbs" g of carbs in the dish
 * @apiSuccess (200) {Number} "totalProtein" g of protein in the dish
 * @apiSuccess (200) {Number} "totalFat" g of fat in the dish
 * @apiSuccess (200) {Number} "mealType" which meal of the day
 * @apiSuccess (200) {Object[]} "ingredients" List of ingredients in the dish
 * @apiSuccess (200) {Number} "ingredients[].weight" weight of ingredient
 * @apiSuccess (200) {String} "ingredients[].id" ID of ingredient
 */
DiaryRoutes.get('/meal', async (req, res) => {
  try {
    let { id } = req.query;
    let diaryQuery = await db.collection('mealRecords').doc(id).get();
    let meal = diaryQuery.data();

    const getTotals = (dish) => {
      /* calculate nutrition - calories, carbs, protein, fat */
      let totalCalories = dish.ingredients
        .map((x) => (x.calories / 100) * x.weight)
        .reduce((a, b) => a + b);
      let totalCarbs = dish.ingredients
        .map((x) => (x.carbs / 100) * x.weight)
        .reduce((a, b) => a + b);
      let totalProtein = dish.ingredients
        .map((x) => (x.protein / 100) * x.weight)
        .reduce((a, b) => a + b);
      let totalFat = dish.ingredients.map((x) => (x.fat / 100) * x.weight).reduce((a, b) => a + b);

      dish.totalCalories = totalCalories;
      dish.totalCarbs = totalCarbs;
      dish.totalProtein = totalProtein;
      dish.totalFat = totalFat;
    };

    for (let i of meal.ingredients) {
      /* Populate ingredient reference */
      let queryIngredient = await i.ingredient.get();
      i.id = queryIngredient.id;
      for (let info in queryIngredient.data()) {
        i[info] = queryIngredient.data()[info];
      }

      /* Populate category reference */
      let queryCategory = await i.category.get();
      i.category = queryCategory.data().name;

      delete i.ingredient;
    }

    getTotals(meal);

    return res.status(200).json({ meal });
  } catch (e) {
    // console.log(e);
    return res.sendStatus(500);
  }
});

/**
 * @api {put} /diary/meal?id=<mealRecordID> Edit meal details
 * @apiName v1/editMealRecord
 * @apiGroup Dairy
 *
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary/meal?id=1s5df61sd5f6ds
 *
 *      body:
 *       {
 *           "ingredients": [
 *              {
 *                "weight": 50,
 *                "id": "<ingredientID>"
 *              }
 *           ]
 *       }
 *
 * @apiSuccess (200) {Number} "name" name of the dish
 * @apiSuccess (200) {Number} "date" date of the dish in milliseconds
 * @apiSuccess (200) {Number} "totalCalories" total kcal in the dish
 * @apiSuccess (200) {Number} "totalCarbs" g of carbs in the dish
 * @apiSuccess (200) {Number} "totalProtein" g of protein in the dish
 * @apiSuccess (200) {Number} "totalFat" g of fat in the dish
 * @apiSuccess (200) {Number} "mealType" which meal of the day
 * @apiSuccess (200) {Object[]} "ingredients" List of ingredients in the dish
 * @apiSuccess (200) {Number} "ingredients[].weight" weight of ingredient
 * @apiSuccess (200) {String} "ingredients[].id" ID of ingredient
 */
DiaryRoutes.put('/meal', async (req, res) => {
  try {
    let { id } = req.query;
    let { ingredients } = req.body;
    let diaryQuery = db.collection('mealRecords').doc(id);

    for (let i of ingredients) {
      i.ingredient = db.collection('ingredients').doc(i.id);
      let { id, ...rest } = i;
      i = { ...rest };
    }

    await diaryQuery.update({ ingredients });
    let meal = await diaryQuery.get();
    meal = meal.data();

    const getTotals = (dish) => {
      /* calculate nutrition - calories, carbs, protein, fat */
      let totalCalories = dish.ingredients
        .map((x) => (x.calories / 100) * x.weight)
        .reduce((a, b) => a + b);
      let totalCarbs = dish.ingredients
        .map((x) => (x.carbs / 100) * x.weight)
        .reduce((a, b) => a + b);
      let totalProtein = dish.ingredients
        .map((x) => (x.protein / 100) * x.weight)
        .reduce((a, b) => a + b);
      let totalFat = dish.ingredients.map((x) => (x.fat / 100) * x.weight).reduce((a, b) => a + b);

      dish.totalCalories = totalCalories;
      dish.totalCarbs = totalCarbs;
      dish.totalProtein = totalProtein;
      dish.totalFat = totalFat;
    };

    for (let i of meal.ingredients) {
      /* Populate ingredient reference */
      let queryIngredient = await i.ingredient.get();
      i.id = queryIngredient.id;
      for (let info in queryIngredient.data()) {
        i[info] = queryIngredient.data()[info];
      }

      /* Populate category reference */
      let queryCategory = await i.category.get();
      i.category = queryCategory.data().name;

      delete i.ingredient;
    }

    getTotals(meal);

    return res.status(200).json({ meal });
  } catch (e) {
    // console.log(e);
    return res.sendStatus(500);
  }
});

/**
 * @api {post} /diary Add a meal to the log
 * @apiName v1/addDishToLog
 * @apiGroup Dairy
 *
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary
 *
 *      body:
 *       {
 *           "userId": "User UID",
 *           "date": date,
 *           "mealType": Number - 0, 1, 2, 3,
 *           "dishID": "Dish ID",
 *       }
 *
 * @apiSuccess (200) {String} id id of newly created MealRecord
 */
DiaryRoutes.post('/', async (req, res) => {
  try {
    let { userID, mealType, dishID, date } = req.body;
    /* Create new mealRecord reference */
    let newRecord = db.collection('mealRecords').doc();
    let dishToAdd = await db.collection('dishes').doc(dishID).get();

    let { createdBy, ...rest } = dishToAdd.data();

    let dish = { ...rest, userId: userID, mealType, date };

    /* Set data to new dish */
    await newRecord.set(dish);

    return res.status(200).json({ id: newRecord.id });
  } catch (e) {
    console.error(e);
  }
});

module.exports = DiaryRoutes;
