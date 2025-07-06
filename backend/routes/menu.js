module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  // Get all menu items
  router.get('/', (req, res) => {
    let sql = 'SELECT * FROM MenuItems';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  return router;
};
