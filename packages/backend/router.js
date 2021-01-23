const router = require('express').Router();
const DishesRoutes = require('./routes/dishes.routes');
const DiaryRoutes = require('./routes/diary.routes');
const AuthRoutes = require('./routes/auth.routes');

router.get('/api/v1/test', (req, res) => {
  return res.status(200).json({ test: 'Test successful!' });
});

router.use('/auth', AuthRoutes);
router.use('/dishes', DishesRoutes);
router.use('/diary', DiaryRoutes);

router.get('/api/*', (req, res) => {
  return res.sendStatus(404);
});

module.exports = router;
