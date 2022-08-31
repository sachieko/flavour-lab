/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userQueries.getUserByEmail(email)
  .then(admin => {
    if (admin.password === password){
      res.cookie('chef', true);
      return res.end();
    }
    //wrong pass home
    res.status(400).end();
  })
  .catch(err => {
    // gotta have employee email bro
    return res.status(400).end();
  })

});

module.exports = router;
