module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  router.post('/', (req, res) => {
    const { table_id, waiter_id, items } = req.body;

    const orderSql = 'INSERT INTO Orders (table_id, waiter_id, order_time, status) VALUES (?, ?, NOW(), "pending")';
    db.query(orderSql, [table_id, waiter_id], (err, result) => {
      if (err) return res.status(500).send(err);

      const order_id = result.insertId;

      items.forEach(item => {
        const itemSql = 'INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (?, ?, ?)';
        db.query(itemSql, [order_id, item.item_id, item.quantity], (err) => {
          if (err) return res.status(500).send(err);
        });
      });

      res.status(201).json({ message: 'Order placed successfully', order_id });
    });
  });

  return router;
};
