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
