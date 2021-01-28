const express = require('express');
const db = require('../../config/firestoreConfig');
const router = express.Router();

router.get('/', async (req, res) => {
  const snapshot = await db.collection('ingredients').get();
  const response = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const { category: categoryReference, ...data } = doc.data();
      let category;
      if (categoryReference) {
        const categoryQuery = await categoryReference.get();
        category = categoryQuery.id;
      }

      return {
        ...data,
        category,
        id: doc.id,
      };
    }),
  );

  return res.status(200).json(response);
});

module.exports = router;
