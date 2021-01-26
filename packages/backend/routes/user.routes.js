const UserRoutes = require('express').Router();
const db = require('../config/firestoreConfig');

UserRoutes.get('/', async (req, res) => {
    try {
        let { user } = req.query;
        let newUser = db.collection('userSettings').doc(user);

        await newUser.set({
            favouriteDishes: [],
            viaGoogle: false,
            viaFacebook: false,
            viaEmail: true,
        })

        return res.sendStatus(204);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

module.exports = UserRoutes;
