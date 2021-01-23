const DiaryRoutes = require('express').Router();
const db = require('../config/firestoreConfig');

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
    let { user } = req.query;
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

    /* TODO : FILTER BY DATE */
    let diaryQuery = await db.collection('mealRecords').where('userID', '==', user).get();

    for (let entry of diaryQuery.docs) {
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

    return res.status(200).json(consumption);
  } catch (e) {
    console.log(e);
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
    let { user } = req.query;
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
        name: dish.data().dishName,
        id: dish.id,
      });
    };

    /* TODO : FILTER BY DATE */
    let diaryQuery = await db.collection('mealRecords').where('userID', '==', user).get();

    for (let entry of diaryQuery.docs) {
      sortMeal(consumption, entry);
      for (let i of entry.data().ingredients) {
        /* Retrieve ingredient reference */
        let queryIngredient = await i.ingredient.get();
        let thisIngredient = queryIngredient.data();

        /* Update final amount */
        calculateTotals(consumption, thisIngredient, i.weight);
      }
    }

    return res.status(200).json(consumption);
  } catch (e) {
    console.log(e);
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
 *           "dishName": "Dish Name",
 *           "ingredients": [
 *                  {
 *                      "ingredient": "Reference to ingredient"
 *                      "weight": 44
 *                  },
 *           ]
 *       }
 *
 * @apiSuccess (204)
 */
DiaryRoutes.post('/', async (req, res) => {
  try {
    let { userID, mealType, dishName, ingredients } = req.body;

    /* Create new mealRecord reference */
    let newRecord = db.collection('mealRecords').doc();

    /* Create reference to each ingredient */
    for (let i of ingredients) {
      i.ingredient = db.collection('ingredients').doc(i.ingredient);
    }

    /* Set data to new dish */
    await newRecord.set({
      // date,
      userID,
      mealType,
      dishName,
      ingredients,
    });

    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = DiaryRoutes;
