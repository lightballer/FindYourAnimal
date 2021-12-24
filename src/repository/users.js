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

const findByEmail = (email) =>
  database.query('SELECT * FROM users WHERE email = $1;', [email]).then((data) => data.rows[0]);

const updateUserToken = (id, token) =>
  database
    .query('UPDATE users SET token = $1 WHERE id = $2;', [token, id])
    .then((data) => data.rows[0]);

const findByToken = (token) =>
  database.query('SELECT * FROM users WHERE token = $1;', [token]).then((data) => data.rows[0]);

const findById = (id) =>
  database
    .query('SELECT name, email, type FROM users WHERE id = $1;', [id])
    .then((data) => data.rows[0]);

const findPetOwnerByUserId = (id) =>
  database
    .query(
      'SELECT id, phone, description, location, whome, age FROM petowners WHERE userId = $1;',
      [id]
    )
    .then((data) => data.rows[0]);

const findPetFinderByUserId = (id) =>
  database
    .query(
      'SELECT id, phone, description, location, whome, age FROM petfinders WHERE userId = $1;',
      [id]
    )
    .then((data) => data.rows[0]);

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

const findPetFinders = (skip, take) =>
  database
    .query(
      'SELECT id, phone, description, location, whome, age FROM petfinders LIMIT $1 OFFSET $2',
      [take, skip]
    )
    .then((data) => data.rows);

const findPetOwners = (skip, take) =>
  database
    .query(
      'SELECT id, phone, description, location, whome, age FROM petowners LIMIT $1 OFFSET $2',
      [take, skip]
    )
    .then((data) => data.rows);

const findUserDialogs = (email, skip, take) =>
  database
    .query(
      'SELECT id, user1, user2 FROM dialogs WHERE user1 = $1 OR user2 = $1 LIMIT $2 OFFSET $3',
      [email, take, skip]
    )
    .then((data) => data.rows);

const findDialog = (dialogId) =>
  database
    .query('SELECT * FROM messages WHERE dialogId = $1 ORDER BY createdAt', [dialogId])
    .then((data) => data.rows);

const createDialog = (userId, companionId) =>
  database
    .query('INSERT INTO dialogs (user1, user2) VALUES ($1, $2) RETURNING id;', [
      userId,
      companionId,
    ])
    .then((data) => {
      return data.rows[0];
    });

module.exports = {
  create,
  findByEmail,
  updateUserToken,
  findByToken,
  assignPetOwners,
  assignPetFinders,
  findPetFinders,
  findPetOwners,
  findById,
  findPetFinderByUserId,
  findPetOwnerByUserId,
  findUserDialogs,
  findDialog,
  createDialog,
};
