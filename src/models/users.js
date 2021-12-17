const database = require('../database');

const create = (user) =>
  database
    .query(
      'INSERT INTO users (name, password, token, email, type) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, token;',
      [user.name, user.password, user.token, user.email, user.type]
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

  const assignPetOwners = (id, userInfo) =>
  database
    .query(
      'INSERT INTO petOwners (phone, description, location, whome, age, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
      [userInfo.phone, userInfo.descriprtion, userInfo.location, userInfo.whome, userInfo.age, id]
    )
    .then((data) => {
      return data.rows[0];
    });

const assignPetFinders = (id, userInfo) =>
  database
    .query(
      'INSERT INTO petFinders (phone, description, location, whome, age, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
      [userInfo.phone, userInfo.descriprtion, userInfo.location, userInfo.whome, userInfo.age, id]
    )
    .then((data) => {
      return data.rows[0];
    });

module.exports = {
  create,
  findByEmail,
  updateUserToken,
  findByToken,
  assignPetOwners,
  assignPetFinders
};
