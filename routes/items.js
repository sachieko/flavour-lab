const express = require('express');
const router = express.Router();
const itemQueries = require('../db/queries/items');

// GET menu /items/
router.get('/', (req, res) => {
  itemQueries.getItems()
    .then(items => {
      res.json(items);
    });
});

module.exports = router;
