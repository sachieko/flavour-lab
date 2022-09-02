/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();
const orderQueries = require('../db/queries/orders');
const itemQueries = require('../db/queries/items');
const orderDetails = require('../db/queries/order_details');

const scrubData = function(data, val) {
  if (!data) {
    data = val;
  }
  return data;
};

router.get('/', (req, res) => {
  const orderPoll = new Date();
  const orderId = req.cookies.orderId;
  if (!orderId) {
    //console.log('must have order id');
    return res.end();
  }
  Promise.all([
    orderQueries.getOrderById(orderId),
    itemQueries.getItemsByOrderId(orderId)
  ])
    .then(queries => {
      let thirtyLater = queries[0].completed_time;
      if (queries[0].completed_time) {
        thirtyLater = new Date(queries[0].completed_time.getTime() + 30 * 6000);
      }
      if (thirtyLater < orderPoll && queries[0].completed_time) {
        res.clearCookie('orderId');
        return res.end();
      }
      res.send({info: queries[0], items: queries[1]});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const rawPhone = req.body.phone;
  const note = scrubData(req.body.note, '');
  const tip = scrubData(req.body.tip, 0);
  // const discount = scrubData(req.body.discount, 0); // This value is calculated later and on behalf of the user, not an entered value.
  if (!req.cookies.cart ||
     !name ||
     isNaN(Number(rawPhone)) ||
     rawPhone.length !== 10 ||
     isNaN(Number(tip))) {
    return res.status(418).end();
  }
  const phone = '+1' + rawPhone;
  const cart = JSON.parse(req.cookies.cart);
  const orderArguments = {name, phone, note, tip};
  Promise.all([
    itemQueries.getAllItemsFromCart(cart),
    orderQueries.insertOrder(orderArguments)])
    .then(queries => {
      const items = queries[0];
      const order = queries[1];
      const detailQueries = [];
      for (const item of items) {
        const detailObj = {};
        detailObj.order_id = order.id;
        detailObj.item_id = item.id;
        detailObj.quantity = cart[item.id];
        detailObj.price = item.price;
        detailObj.note = null;
        detailQueries.push(orderDetails.insertOrderDetails(detailObj));
      }
      Promise.all(detailQueries)
        .then((allOrderDetails) => {
          const orderId = allOrderDetails[0].order_id;
          orderQueries.insertTaxForOrderId(orderId);
          res.clearCookie('cart');
          res.cookie('orderId', orderId);
          res.send(order);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  orderQueries.getDetailsForOrderById(id)
    .then(details => {
      //console.log(details);
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
