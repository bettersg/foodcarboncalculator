const router = require("express").Router();
const db = require('../config/firebaseConfig');

router.get("/test", async (req, res) => {
    try {
        return res.status(200).json({ test: 'Dishes test successful!', dishes });
    } catch (e) {
        console.log(e);
    }
});

/* v1/Search */
router.get("/", async (req, res) => {
    try {
        let { keyword } = req.query;
        keyword = keyword.toLowerCase();

        /* get all dishes */
        let dishes = await db.collection('dishes').get();
        let allDishes = []

        /* go through each doc */
        dishes.forEach(doc => {
            let newDoc = doc.data();
            // TODO : MIGHT NEED TO CHECK IF newDoc.createdBy MATCHES CURRENT USER
            // TO RETURN ONLY THE DISHES THEY ADDED
            if (newDoc.name.toLowerCase().includes(keyword)) {
                newDoc.id = doc.id;
                allDishes.push(newDoc)
            }
        });
        return res.status(200).json({ allDishes })
    } catch (e) {
        console.log(e);
    }
});

/* v1/getDishStats */
router.get("/get_footprint", async (req, res) => {
    try {
        let { dishId } = req.query;

        /* get dish name */
        let dish = await db.collection('dishes').doc(dishId).get();
        dishName = dish.data().name;

        /* get dish ingredients */
        let queryIngredients = await db.collection(`dishes/${dishId}/ingredients`).get()
        queryIngredients = queryIngredients.docs.map(i => i.data());

        let ingredientsInDish = []
        for (let i of queryIngredients) {
            /* Popualte ingredient reference */
            let ing = await i.ingredient.get();
            ing = ing.data();

            /* Populate category reference */
            let cat = await ing.category.get();
            ing.category = cat.data().name;
            ingredientsInDish.push({ ...ing, weight: i.weight })
        }

        /* calculate calories */
        let calories = ingredientsInDish.map(x => x.calories * x.weight).reduce((a, b) => a + b);

        /* calculate footprint */
        let footprint = ingredientsInDish.map(x => (x.weight / 100 * x.footprint)).reduce((a, b) => a + b);

        return res.status(200).json({ name: dishName, calories, footprint, ingredients: ingredientsInDish })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;