const router = require("express").Router();
const db = require('../config/firebaseConfig');

router.get("/test", async (req, res) => {
    try {
        return res.status(200).json({ test: 'Dishes test successful!' });
    } catch (e) {
        console.log(e);
    }
});

/**
 * @api {get} /dishes?user=<userUID>&keyword=<keyword> Search for dishes
 * @apiName v1/Search
 * @apiGroup Dishes
 *
 * @apiParam {String} <userUID> User UID to match createdBy field
 * @apiParam {String} <keyword> Search for dishes with this keyword
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/dishes?user=Xn2NvmcXo0ekV2bjqw4RXT63swl2&keyword=Chicken
 * 
 * @apiSuccess (200) {Object[]} dishes List of dishes that match the search term.
 * @apiSuccess (200) {String} dishes[].id Dish ID.
 * @apiSuccess (200) {String} dishes[].name Dish Name.
 */
router.get("/", async (req, res) => {
    const nameHasKeyword = (dishName, keyword) => {
        return dishName.toLowerCase().includes(keyword);
    };

    const createdByUser = (creator, searcher) => {
        if (creator === "" || creator === searcher) return true;
        else return false;
    };

    try {
        let { user, keyword } = req.query;
        keyword = keyword.toLowerCase();

        /* get all dishes */
        let dishQuery = await db.collection('dishes').get();
        let dishes = [];

        /* go through each doc */
        dishQuery.forEach(doc => {
            let newDoc = doc.data();
            // TODO : MIGHT NEED TO CHECK IF newDoc.createdBy MATCHES CURRENT USER
            // TO RETURN ONLY THE DISHES THEY ADDED
            if (createdByUser(newDoc.createdBy), user) {
                if (nameHasKeyword(newDoc.name, keyword)) {
                    newDoc.id = doc.id;
                    dishes.push({
                        id: doc.id,
                        name: newDoc.name,
                    })
                }
            }
        });
        return res.status(200).json({ dishes })
    } catch (e) {
        console.log(e);
    }
});

/**
 * @api {get} /dishes/get_footprint?dishId=<id> Gets data of dish for search
 * @apiName v1/getFootprint
 * @apiGroup Dishes
 *
 * @apiParam {String} <id> ID of dish to retrieve stats for
 * @apiExample {js} Example usage:
 *      endpoint: /api/v1/dishes/get_footprint?dishId=CHjejJkeL62Mib9Vmngp
 * 
 * @apiSuccess (200) {String} name Dish Name.
 * @apiSuccess (200) {Number} totalCalories Total calories (kcal) of dish.
 * @apiSuccess (200) {Number} totalCarbs Total carbs (g) of dish.
 * @apiSuccess (200) {Number} totalProtein Total protein (g) of dish.
 * @apiSuccess (200) {Number} totalFat Total fat (g) of dish.
 * @apiSuccess (200) {Number} totalFootprint Total carbon footprint (kg CO2) of dish.
 * @apiSuccess (200) {Object[]} ingredients Ingredients in dish.
 * @apiSuccess (200) {String} ingredients[].id Ingredient ID.
 * @apiSuccess (200) {String} ingredients[].name Ingredient name.
 * @apiSuccess (200) {String} ingredients[].category Ingredient category.
 * @apiSuccess (200) {Number} ingredients[].weight Weight (g) of ingredient in this dish.
 * @apiSuccess (200) {Number} ingredients[].carbs g of carbs per 100g of ingredient.
 * @apiSuccess (200) {Number} ingredients[].protein g of protein per 100g of ingredient.
 * @apiSuccess (200) {Number} ingredients[].fat g of fat per 100g of ingredient.
 * @apiSuccess (200) {Number} ingredients[].calories kcal per 100g of ingredient.
 * @apiSuccess (200) {Number} ingredients[].footprint kg CO2 / kg of ingredient.
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
            for (let info in queryIngredient.data()) {
                i[info] = queryIngredient.data()[info]
            }

            /* Populate category reference */
            let queryCategory = await i.category.get();
            i.category = queryCategory.data().name;

            delete i.ingredient;
        }

        /* calculate nutrition - calories, carbs, protein, fat */
        let totalCalories = dish.ingredients.map(x => x.calories / 100 * x.weight).reduce((a, b) => a + b);
        let totalCarbs = dish.ingredients.map(x => x.carbs / 100 * x.weight).reduce((a, b) => a + b);
        let totalProtein = dish.ingredients.map(x => x.protein / 100 * x.weight).reduce((a, b) => a + b);
        let totalFat = dish.ingredients.map(x => x.fat / 100 * x.weight).reduce((a, b) => a + b);

        /* calculate footprint */
        let totalFootprint = dish.ingredients.map(x => (x.weight / 1000 * x.footprint)).reduce((a, b) => a + b);

        dish.totalCalories = totalCalories;
        dish.totalCarbs = totalCarbs;
        dish.totalProtein = totalProtein;
        dish.totalFat = totalFat;
        dish.totalFootprint = totalFootprint;
        delete dish.createdBy;

        return res.status(200).json(dish)
    } catch (e) {
        console.log(e);
    }
})

/**
 * @api {post} / Add a new dish
 * @apiName v1/addNewDish
 * @apiGroup Dishes
 *
 * @apiExample Example usage:
 *     endpoint: /api/v1/dishes
 *
 *     body:
 *      {
 *          "name": "Dish Name Here",
 *          "createdBy": "User UID",
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

/**
 * @api {post} /ingredient Add a new dish
 * @apiName v1/addNewIngredient
 * @apiGroup Dishes
 *
 * @apiExample Example usage:
 *     endpoint: /api/v1/dishes/ingredient
 *
 *     body:
 *      {
 *          "name": "Ingredient Name Here",
 *          "category": <category reference>,
 *      }
 *
 * @apiSuccess (200) {Number} id ID of new ingredient.
 */
router.post("/ingredient", async (req, res) => {
    try {
        let { name, category } = req.body;

        /* Create new ingredient document */
        let newIngredient = await db.collection('ingredients').add({
            name,
            category: db.collection('categories').doc(category),
            carbs: -1,
            protein: -1,
            fat: -1,
            calories: -1,
            footprint: -1,
        });

        return res.status(200).json({ id: newIngredient.id });
    } catch (e) {
        console.log(e);
    }
})
module.exports = router;