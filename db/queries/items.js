const db = require('../connection');

const getItems = () => {
  return db.query(`
  SELECT categories.name AS category, items.* FROM items
  JOIN categories ON category_id = categories.id
  ORDER BY categories.id;`)
    .then(data => {
      return data.rows;
    });
};

exports.getItems =  getItems;

const getItemById = (item) => {
  return db.query(`
  SELECT categories.name, items.* FROM items
  JOIN categories ON category_id = categories.id
  WHERE items.id = #1
  ORDER BY categories.id;`, [item.id])
    .then(data => {
      return data.rows[0];
    });
};

exports.getItemById =  getItemById;

