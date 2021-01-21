const router = require("express").Router();
const db = require('../config/firebaseConfig');

router.get("/test", (req, res) => {
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
router.get("/week", async (req, res) => {
    try {
        let { user, date } = req.query;
        let consumption = {
            totalCalories: 0,
            totalFootprint: 0,
            byNutrition: {
                totalCarbs: 0,
                totalProtein: 0,
                totalFat: 0,
            },
            byCategory: {
                "Whole grain": 0,
                "Vegetables": 0,
                "Fruits": 0,
                "Dairy Food": 0,
                "Protein": 0,
                "Added fat": 0,
                "Added sugar": 0,
                "Tubers or starchy vegetables": 0
            }
        }

        /* TODO : FILTER BY DATE */
        let diaryQuery = await db.collection('mealRecords').where("userID", "==", user).get();

        for (let entry of diaryQuery.docs) {
            for (let i of entry.data().ingredients) {
                /* Retrieve ingredient reference */
                let queryIngredient = await i.ingredient.get();
                let thisIngredient = queryIngredient.data();
                
                /* Retrieve category reference */
                let queryCategory = await queryIngredient.data().category.get();
                let category = queryCategory.data().name;

                /* Update final amount */
                consumption.totalCalories += (thisIngredient.calories / 100 * i.weight);
                consumption.totalFootprint += (i.weight / 1000 * thisIngredient.footprint);
                consumption.byNutrition.totalCarbs += thisIngredient.carbs / 100 * i.weight
                consumption.byNutrition.totalProtein += thisIngredient.protein / 100 * i.weight
                consumption.byNutrition.totalFat += thisIngredient.fat / 100 * i.weight
 
                // consumption.byNutrition
                consumption.byCategory[category] += i.weight;
            }
        }

        return res.status(200).json(consumption);
    } catch (e) {
        console.log(e);
    }
})

/**
 * @api {post} /diary?user=<user>?dishId=<id>?mealType=<meal> Add a meal to the log
 * @apiName v1/addDishToLog
 * @apiGroup Dairy
 *
 * @apiParam {String} <userUID> Log meal under this user
 * @apiParam {String} <id> Log this Dish 
 * @apiParam {String} <meal> Which meal of the day to log
 * 
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary?user=<user>?dishId=<id>?mealType=<meal>
 * 
 * @apiSuccess (204)
 */
router.post("/", async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;