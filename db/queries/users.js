const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
