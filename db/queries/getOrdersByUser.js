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
