const db = require('../connection');

const getDetailsForOrder = (order) => {
  return db.query(`
  SELECT * FROM order_details
  WHERE order_id = $1;`, [order.id])
    .then(data => {
      return data.rows;
    });
};

exports.getDetailsForOrder = getDetailsForOrder;
