const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  //make db call here

  db.query('SELECT * FROM items')
    .then(data => {
      const items = data.rows;
      res.json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
