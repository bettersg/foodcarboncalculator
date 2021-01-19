const router = require("express").Router();

router.get("/test", (req, res) => {
    return res.status(200).json({ test: 'Diary test successful!' });
});

/**
 * @api {get} /dishes?user=<user>?date=<date> Get carbon data for a given week
 * @apiName v1/getDiary
 * @apiGroup Diary
 *
 * @apiParam {String} <user> Search this user's diary
 * @apiParam {String} <date> OPTIONAL: Return entries in the week of this day
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/dishes?keyword=Chicken
 * 
 * @apiSuccess (200) {Object[]} dishes List of dishes that match the search term.
 * @apiSuccess (200) {String} dishes[].id Dish ID.
 * @apiSuccess (200) {String} dishes[].name Dish Name.
 * @apiSuccess (200) {String} dishes[].createdBy User ID of user who created the dish.
 */
router.get("/diary", async (res, req) => {
    try {

    } catch (e) {

    }
})

/**
 * @api {post} /diary?user=<user>?dishId=<id>?mealType=<meal> Add a meal to the log
 * @apiName v1/addDishToLog
 * @apiGroup Dairy
 *
 * @apiParam {String} <user> Log meal under this user
 * @apiParam {String} <id> Log this Dish 
 * @apiParam {String} <meal> Which meal of the day to log
 * 
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/diary?user=<user>?dishId=<id>?mealType=<meal>
 * 
 * @apiSuccess (204)
 */
router.post("/diary", async (res, req) => {
    try {

    } catch (e) {

    }
})

module.exports = router;