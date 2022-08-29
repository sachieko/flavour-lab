const db = require('../connection');

const getItemById = (item) => {
  return db.query(`
  SELECT categories.name, items.* FROM items
  JOIN categories ON category_id = categories.id
  WHERE items.id = #1
  ORDER BY categories.name;`, [item.id])
    .then(data => {
      return data.rows[0];
    });
};

exports.getItemById =  getItemById;
