const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const itemQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  const orderId = req.cookies.orderId;
  if (!orderId){
    console.log('must have order id');
    return res.status(400).end();
  }
  Promise.all([
    orderQueries.getOrderById(orderId),
    itemQueries.getItemsByOrderId(orderId)
  ])
  .then(queries => {
    res.send({info: queries[0], items: queries[1]})
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
