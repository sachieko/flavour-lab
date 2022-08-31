const express = require('express');
const router = express.Router();
const items = require('../db/queries/items');
const orders = require('../db/queries/orders');
const orderDetails = require('../db/queries/order_details');

router.post('/', (req, res) => {
  const order = req.body;
  console.log('In the post request:', order);
  orders.insertOrder(order)
    .then(order => {
      console.log('order from post:', order);
      res.send(`${order.id}`);
    })
    .catch(err => console.log(err.message));
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const details = req.body;
  orderDetails.insertOrderDetails(details)
    .then(detail => console.log(detail))
    .catch(err => console.log(err.message));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  orders.getDetailsForOrderById(id)
    .then(details => {
      console.log(details);
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
