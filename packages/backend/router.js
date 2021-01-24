import express from 'express';
import DishesRoutes from './routes/dishes.routes.js';
import DiaryRoutes from './routes/diary.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import IngredientsListGet from './routes/ingredients/ingredient-list.get';

const router = express.Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ test: 'Test successful!' });
});

router.use('/auth', AuthRoutes);
router.use('/dishes', DishesRoutes);
router.use('/diary', DiaryRoutes);
router.use('/ingredients', IngredientsListGet);

router.get('/*', (req, res) => {
  return res.sendStatus(404);
});

export default router;
