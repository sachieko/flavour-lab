const db = require('../connection');

const getUsers = () => {
  return db.query(`SELECT * FROM users;`)
    .then(data => {
      return data.rows;
    });
};

exports.getUsers =  getUsers;
