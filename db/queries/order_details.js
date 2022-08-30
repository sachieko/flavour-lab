const db = require('../connection');

const insertOrderDetails = (details) => {
  console.log(details);
  return db.query(`
  INSERT INTO order_details (order_id, item_id, quantity, price, note)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`,
  [details.order_id, details.item_id, details.quantity, details.price, details.note])
    .then(data => {
      return data.rows[0];
    });
};

exports.insertOrderDetails = insertOrderDetails;
