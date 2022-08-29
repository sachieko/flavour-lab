const db = require('../connection');

const getUserByEmail = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE email ILIKE $1;`, [email])
    .then(data => {
      return data.rows[0];
    });
};

exports.getUserByEmail =  getUserByEmail;
