const express = require('express');
const DishesRoutes = require('./routes/dishes.routes.js');
const DiaryRoutes = require('./routes/diary.routes.js');
const AuthRoutes = require('./routes/auth.routes.js');
const UserRoutes = require('./routes/user.routes');
const IngredientsListGet = require('./routes/ingredients/ingredient-list.get');

const router = express.Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ test: 'Test successful!' });
});

router.use('/auth', AuthRoutes);
router.use('/dishes', DishesRoutes);
router.use('/diary', DiaryRoutes);
router.use('/ingredients', IngredientsListGet);
router.use('/user', UserRoutes);

router.get('/*', (req, res) => {
  return res.sendStatus(404);
});

module.exports = router;
