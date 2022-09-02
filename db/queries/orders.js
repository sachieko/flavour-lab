const db = require('../connection');

const getOrdersByUser = (user) => {
  return db.query(`
  SELECT * FROM orders
  WHERE user_id = $1;
  `, [user.id])
    .then(data => {
      return data.rows;
    });
};

exports.getOrdersByUser = getOrdersByUser;

const getOrderById = (Id) => {
  return db.query(`
  SELECT orders.id, orders.note, orders.tax,
  orders.tip, orders.name, orders.phone, started_time at time zone '+13' as started_time ,
  estimated_time at time zone '+13' as estimated_time, completed_time at time zone '+13' as completed_time,
  submit_time at time zone '+13' as submit_time,
  SUM(order_details.price) AS subtotal, SUM(order_details.price) + orders.tax + orders.tip as total FROM orders
  JOIN order_details ON orders.id = order_id
  WHERE orders.id = $1
  GROUP BY orders.id
  LIMIT 1;
  `, [Id])
    .then(data => {
      return data.rows[0];
    });
};

exports.getOrderById = getOrderById;

const getDetailsForOrderById = (id) => {
  return db.query(`
  SELECT * FROM order_details
  WHERE order_id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

exports.getDetailsForOrderById = getDetailsForOrderById;

const insertOrder = (order) => {
  return db.query(`
  INSERT INTO orders (name, phone, note, tip)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`,
  [order.name, order.phone, order.note, order.tip]) // A different function will insert tax/discount after order details are submitted.
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

exports.insertOrder = insertOrder;

const updateField = (field, id, estimate = null) => {
  let text = 'UPDATE orders SET ';
  const args = [];
  if (field === 'Start') {
    text += 'started_time';
  } else if (field === 'Estimate') {
    text += 'estimated_time';
  } else if (field === 'Complete') {
    text += 'completed_time';
  }
  text += `= NOW() `;
  if (estimate) {
    args.push(estimate);
    text += `+ $1::int * INTERVAL '1 min' `;
  }
  args.push(Number(id));
  text += `WHERE orders.id = $${args.length} RETURNING *;`;
  return db.query(text, args)
    .then(data => {
      return data.rows[0];
    });
};

exports.updateField = updateField;

const addPrepTime = function(minutes, id) {
  return db.query(`
  SELECT submit_time + ($1 * interval '1 minute') AS estimated_time
  FROM orders
  WHERE id = $2;`, [Number(minutes), id])
    .then(data => {
      return data.rows;
    });
};

exports.addPrepTime = addPrepTime;

const getAllOrders = function() {
  return db.query(`
    SELECT
      items.name AS item_name,
      items.price AS items_price,
      orders.*
    FROM orders
    JOIN order_details ON orders.id=order_details.order_id
    JOIN items ON items.id=order_details.item_id
    GROUP BY orders.id, order_details.id, items.id
    ORDER BY completed_time DESC, submit_time;`, [])
    .then(allOrders => {
      return allOrders.rows;
    })
    .catch(err => console.log(err));
};

exports.getAllOrders = getAllOrders;

const getTotalPriceById = function(id) {
  return db.query(
    `SELECT SUM(price)
    FROM order_details
    WHERE order_id = $1
    ;`, [id])
    .then(data => {
      return data.rows[0];
    });
};

exports.getTotalPriceById = getTotalPriceById;

const insertTaxForOrderId = function(id) {
  return db.query(
    `UPDATE orders
    SET tax = (SELECT ROUND(SUM(price) * .12, 2)
    FROM order_details
    WHERE order_id = $1)
    WHERE orders.id = $1
    RETURNING *;`, [id])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

exports.insertTaxForOrderId = insertTaxForOrderId;
