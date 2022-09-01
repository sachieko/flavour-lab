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
  SELECT * FROM orders
  WHERE id = $1;
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
  INSERT INTO orders (name, phone, note, tax, tip, discount)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`,
  [order.name, order.phone, order.note, order.tax, order.tip, order.discount])
    .then(data => {
      return data.rows[0];
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
    SELECT *
    FROM orders
    ORDER BY completed_time DESC, submit_time;`, [])
    .then(allOrders => {
      return allOrders.rows;
    })
    .catch(err => console.log(err));
};

exports.getAllOrders = getAllOrders;
