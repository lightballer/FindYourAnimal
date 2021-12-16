const database = require('../database');

const create = (user) =>
  database
    .query(
      'INSERT INTO users (name, password, token, email) VALUES ($1, $2, $3, $4) RETURNING id, email, token;',
      [user.name, user.password, user.token, user.email]
    )
    .then((data) => {
      return data.rows[0];
    });

const findByEmail = (user) =>
  database
    .query('SELECT * FROM users WHERE email = $1;', [user.email])
    .then((data) => data.rows[0]);

const updateUserToken = (id, token) =>
  database
    .query('UPDATE users SET token = $1 WHERE id = $2;', [token, id])
    .then((data) => data.rows[0]);

const findByToken = (token) =>
  database.query('SELECT * FROM users WHERE token = $1;', [token]).then((data) => data.rows[0]);

module.exports = {
  create,
  findByEmail,
  updateUserToken,
  findByToken,
};
