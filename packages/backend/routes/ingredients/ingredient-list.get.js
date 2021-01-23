// const DishesRoutes = require('express').Router();
// const db = require('../config/firestoreConfig');

import express from 'express';
import db from '../../config/firestoreConfig';
const router = express.Router();

router.get('/', async (req, res) => {
  const snapshot = await db.collection('ingredients').get();
  const response = snapshot.docs.map((doc) => doc.data());
  console.log(response);
  return res.status(200).json({ response });
});

export default router;
