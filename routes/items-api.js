const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  itemQueries.getItems()
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  itemQueries.getItemById(req.params.id)
    .then(item => console.log(item));
  res.end();
});

module.exports = router;
