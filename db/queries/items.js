const db = require('../connection');

const getItems = () => {
  return db.query(`
  SELECT categories.name AS category, items.* FROM items
  JOIN categories ON category_id = categories.id
  ORDER BY categories.name;`)
    .then(data => {
      return data.rows;
    });
};

exports.getItems =  getItems;
