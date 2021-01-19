const router = require("express").Router();
const db = require('../config/firebaseConfig');

router.get("/test", async (req, res) => {
    try {
        return res.status(200).json({ test: 'Dishes test successful!', dishes });
    } catch (e) {
        console.log(e);
    }
});

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
})

module.exports = router;