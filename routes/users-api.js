/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const orderQueries = require('../db/queries/orders');

router.get('/', (req, res) => {
  const isAdmin = req.cookies.chef;
  if (!isAdmin) {
    //gotta be logged in bro
    return res.status(400).end();
  }
  return res.end();
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userQueries.getUserByEmail(email)
    .then(admin => {
      if (admin.password === password) {
        res.cookie('chef', true);
        return res.end();
      }
      //wrong pass homie
      res.status(400).end();
    })
    .catch(err => {
    // gotta have employee email bro
      return res.status(400).end();
    });
});

router.get('/orders', (req, res) => {
  const isAdmin = req.cookies.chef;
  if (!isAdmin) {
    //gotta be logged in bro
    return res.status(400).end();
  }
  orderQueries.getAllOrders()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      // bad query perhaps
      return res.status(400).end();
    });
});

router.get('/logout', (req, res) => {
  const isAdmin = req.cookies.chef;
  if (!isAdmin) {
    console.log('not admin');
    //gotta be logged in bro
    return res.status(400).end();
  }
  res.clearCookie('chef');
  res.end();
});

module.exports = router;
