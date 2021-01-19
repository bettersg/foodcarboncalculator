const router = require("express").Router();
const db = require('../config/firebaseConfig');

router.get("/test", async (req, res) => {
    try {
        return res.status(200).json({ test: 'Dishes test successful!', dishes });
    } catch (e) {
        console.log(e);
    }
});

/**
 * @api {get} /dishes?keyword=searchTerm Search for dishes
 * @apiName v1/Search
 * @apiGroup Dishes
 *
 * @apiParam {String} searchTerm Search for dishes with this keyword
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/dishes?keyword=Chicken
 * 
 * @apiSuccess (200) {Object[]} dishes List of dishes that match the search term.
 * @apiSuccess (200) {String} dishes[].id Dish ID.
 * @apiSuccess (200) {String} dishes[].name Dish Name.
 * @apiSuccess (200) {String} dishes[].createdBy User ID of user who created the dish.
 */
router.get("/", async (req, res) => {
    try {
        let { keyword } = req.query;
        keyword = keyword.toLowerCase();

        /* get all dishes */
        let dishQuery = await db.collection('dishes').get();
        let dishes = [];

        /* go through each doc */
        dishQuery.forEach(doc => {
            let newDoc = doc.data();
            // TODO : MIGHT NEED TO CHECK IF newDoc.createdBy MATCHES CURRENT USER
            // TO RETURN ONLY THE DISHES THEY ADDED
            if (newDoc.name.toLowerCase().includes(keyword)) {
                newDoc.id = doc.id;
                dishes.push(newDoc)
            }
        });
        return res.status(200).json({ dishes })
    } catch (e) {
        console.log(e);
    }
});

/**
 * @api {get} /dishes/get_footprint?dishId=id Search for dishes
 * @apiName v1/getDishStats
 * @apiGroup Dishes
 *
 * @apiParam {String} id ID of dish to retrieve stats for
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/dishes/get_footprint?dishId=CHjejJkeL62Mib9Vmngp
 * 
 * @apiSuccess (200) {String} name Dish Name.
 * @apiSuccess (200) {Number} calories Total calories of dish.
 * @apiSuccess (200) {Number} footprint Total carbon footprint of dish.
 * @apiSuccess (200) {Object[]} ingredients Ingredients in dish.
 * @apiSuccess (200) {String} ingredients[].id Ingredient ID.
 * @apiSuccess (200) {String} ingredients[].name Ingredient name.
 * @apiSuccess (200) {String} ingredients[].category Ingredient category.
 * @apiSuccess (200) {Number} ingredients[].weight Weight of ingredient in this dish.
 * @apiSuccess (200) {Number} ingredients[].calories Calorie content per g of ingredient.
 * @apiSuccess (200) {Number} ingredients[].footprint UNIT of carbon per 100g of ingredient.
 */
router.get("/get_footprint", async (req, res) => {
    try {
        let { dishId } = req.query;

        /* get dish name */
        let dish = await db.collection('dishes').doc(dishId).get();
        dish = dish.data();

        for (let i of dish.ingredients) {
            /* Populate ingredient reference */
            let queryIngredient = await i.ingredient.get();
            i.id = queryIngredient.id;
            i.name = queryIngredient.data().name;
            i.footprint = queryIngredient.data().footprint;
            i.calories = queryIngredient.data().calories;

            /* Populate category reference */
            let queryCategory = await queryIngredient.data().category.get();
            i.category = queryCategory.data().name;

            delete i.ingredient;
        }

        /* calculate calories */
        let calories = dish.ingredients.map(x => x.calories * x.weight).reduce((a, b) => a + b);

        /* calculate footprint */
        let footprint = dish.ingredients.map(x => (x.weight / 100 * x.footprint)).reduce((a, b) => a + b);

        dish.calories = calories;
        dish.footprint = footprint;
        delete dish.createdBy;
        return res.status(200).json(dish)

        // /* get dish ingredients */
        // let queryIngredients = await db.collection(`dishes/${dishId}/ingredients`).get()
        // queryIngredients = queryIngredients.docs.map(i => i.data());

        // let ingredientsInDish = []
        // for (let i of queryIngredients) {
        //     /* Popualte ingredient reference */
        //     let ing = await i.ingredient.get();
        //     ing = ing.data();

        //     /* Populate category reference */
        //     let cat = await ing.category.get();
        //     ing.category = cat.data().name;
        //     ingredientsInDish.push({ ...ing, weight: i.weight })
        // }

        // /* calculate calories */
        // let calories = ingredientsInDish.map(x => x.calories * x.weight).reduce((a, b) => a + b);

        // /* calculate footprint */
        // let footprint = ingredientsInDish.map(x => (x.weight / 100 * x.footprint)).reduce((a, b) => a + b);

        // return res.status(200).json({ name: dishName, calories, footprint, ingredients: ingredientsInDish })
    } catch (e) {
        console.log(e);
    }
})

/**
 * @api {post} /dishes Add a new dish
 * @apiName v1/addNewDish
 * @apiGroup Dishes
 *
 * @apiExample Example usage:
 *     endpoint: /api/v1/dishes
 *
 *     body:
 *      {
 *          "name": "Dish Name Here",
 *          "createdBy": "User Email Here",
 *          "ingredients": [
 *              {
 *                  "ingredient": "Ingredient ID Here",
 *                  "weight": 44
 *              },
 *              {
 *                  "ingredient": "O23E7uzLgbyOaAXz7fpJ",
 *                  "weight": 55
 *              }
 *          ]
 *      }
 *
 * @apiSuccess (204)
 */
router.post("/", async (req, res) => {
    try {
        let { name, createdBy, ingredients } = req.body;

        /* Create new dish document */
        let newDish = db.collection('dishes').doc();

        /* Create reference to each ingredient */
        for (let i of ingredients) {
            i.ingredient = db.collection('ingredients').doc(i.ingredient)
        }

        /* Set data to new dish */
        await newDish.set({
            name,
            createdBy,
            ingredients
        });

        return res.sendStatus(204);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;