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

const getItemById = (id) => {
  return db.query(`
  SELECT categories.name, items.* FROM items
  JOIN categories ON category_id = categories.id
  WHERE items.id = $1
  ORDER BY categories.id;`, [id])
    .then(data => {
      return data.rows[0];
    });
};

exports.getItemById =  getItemById;

const getAllItemsFromCart = (cart) => {
  const itemQueries = []
  for (const id in cart){
    itemQueries.push(getItemById(id))
  }
  return Promise.all(itemQueries)
  .then(items => {
    return items;
  });
}

exports.getAllItemsFromCart =  getAllItemsFromCart;

const getItemsByOrderId = (id) => {
  return db.query(`
  SELECT items.*, order_details.quantity
  FROM items
  JOIN order_details ON items.id = order_details.item_id
  WHERE order_details.order_id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

exports.getItemsByOrderId =  getItemsByOrderId;

