const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const itemQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  const orderPoll = new Date();
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
    const completedTime = new Date(queries[0].completed_time);
    console.log(completedTime < orderPoll, queries[0].completed_time);
    if (queries[0].completed_time < orderPoll && queries[0].completed_time){
      res.clearCookie('orderId');
      return res.end()
    }
    res.send({info: queries[0], items: queries[1]})
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
