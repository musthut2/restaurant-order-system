module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Tables';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  return router;
};
