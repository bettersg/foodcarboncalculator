import express from 'express';
import db from '../config/firestoreConfig.js';
const UserRoutes = express.Router();

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

export default UserRoutes;
