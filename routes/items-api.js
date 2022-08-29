const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  userQueries.getItems()
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
