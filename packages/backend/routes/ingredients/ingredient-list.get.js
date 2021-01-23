import express from 'express';
import db from '../../config/firestoreConfig';
const router = express.Router();

router.get('/', async (req, res) => {
  const snapshot = await db.collection('ingredients').get();
  const response = snapshot.docs.map((doc) => {
    const { category, ...data } = doc.data();
    return data;
  });

  return res.status(200).json(response);
});

export default router;
