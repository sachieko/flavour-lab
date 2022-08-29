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

const getDetailsForOrder = (order) => {
  return db.query(`
  SELECT * FROM order_details
  WHERE order_id = $1;`, [order.id])
    .then(data => {
      return data.rows;
    });
};

exports.getDetailsForOrder = getDetailsForOrder;

