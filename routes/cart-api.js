const express = require('express');
const router = express.Router();
const items = require('../db/queries/items');

router.get('/', (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) {
    cart = JSON.stringify({});
  }
  const parsed = JSON.parse(cart);
  const queries = [];
  for (const id in parsed) {
    queries.push(items.getItemById(id).then((item) => {
      return {
        count: parsed[id],
        item: item
      };
    }));
  }
  Promise.all(queries).then((items) => {
    res.send(items);
  });
});

router.post('/', (req, res) => {
  let cart = req.cookies.cart;
  const item = req.body.itemId;
  if (!cart) {
    cart = {};
    cart = JSON.stringify(cart);
  }
  const parsed = JSON.parse(cart);
  const key = parsed[item];
  key ? parsed[item] = key + 1 : parsed[item] = 1;
  const jsonCart = JSON.stringify(parsed);
  res.cookie('cart', jsonCart);
  res.send(jsonCart);
});

router.post('/delete', (req, res) => {
  let cart = req.cookies.cart;
  const item = req.body.id;
  if (!cart) {
    cart = {};
    cart = JSON.stringify(cart);
  }
  const parsed = JSON.parse(cart);
  parsed[item] - 1 > 0 ? parsed[item] = parsed[item] - 1 : delete parsed[item];
  const jsonCart = JSON.stringify(parsed);
  if (jsonCart === '{}') {
    res.clearCookie('cart');
    return res.send('{}');
  }
  res.cookie('cart', jsonCart);
  res.send(jsonCart);
});


module.exports = router;
