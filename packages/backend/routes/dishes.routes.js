const router = require("express").Router();
const db = require('../config/firebaseConfig');

router.get("/test", async (req, res) => {
    try {
        // console.log('here');
        const testDishes = await db.collection('ingredients').get()
        
        let dishes = testDishes.docs.map(doc => doc.data());

        return res.status(200).json({ test: 'Dishes test successful!', dishes });
    } catch (e) {
        console.log(e);
    }

});

module.exports = router;