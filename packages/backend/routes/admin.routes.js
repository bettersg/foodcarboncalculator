const express = require('express');
const AdminRoutes = express.Router();

AdminRoutes.get('/test', async (req, res) => {
    try {
      return res.status(200).json({ test: 'Admin test successful!' });
    } catch (e) {
      console.error(e);
    }
});

// 2QdGeOLCwIPlSBMtZuJLKsvAx3F2

AdminRoutes.get('/summary', async (req, res) => {
    try {
      let { user } = req.query;


      
      return res.status(200).json({ test: 'Admin test successful!' });
    } catch (e) {
      console.error(e);
    }
});

module.exports = AdminRoutes;
