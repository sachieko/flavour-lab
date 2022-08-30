const db = require('../connection');

const getUsers = () => {
  return db.query(`SELECT * FROM users;`)
    .then(data => {
      return data.rows;
    });
};

exports.getUsers =  getUsers;

const getUserById = (user) => {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1;`, [user.id])
    .then(data => {
      return data.rows[0];
    });
};

exports.getUserById =  getUserById;

const getUserByEmail = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE email ILIKE $1;`, [email])
    .then(data => {
      return data.rows[0];
    });
};

exports.getUserByEmail =  getUserByEmail;

