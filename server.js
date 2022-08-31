// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use('/images', express.static('public/images'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const itemApiRoutes = require('./routes/items-api');
const itemsRoutes = require('./routes/items');
const smsApiRoutes = require('./routes/sms-api');
const cartApiRoutes = require('./routes/cart-api');
const usersRoutes = require('./routes/users');
const ordersApiRoutes = require('./routes/orders-api');
// <<<<<<< HEAD
// =======

// >>>>>>> main

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/items', itemApiRoutes);
app.use('/api/users', userApiRoutes); // remove this later so we aren't spilling user info into a get request.
app.use('/items', itemsRoutes);
app.use('/users', usersRoutes);
app.use('/api/sms', smsApiRoutes);
app.use('/api/cart', cartApiRoutes);
app.use('/api/orders', ordersApiRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

/*app.get('/', (req, res) => {
  res.render('index');
});*/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
