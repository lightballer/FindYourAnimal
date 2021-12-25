const database = require('../database');

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
    .query('INSERT INTO dialogs (user1, user2) VALUES ($1, $2) RETURNING id', [userId, companionId])
    .then((data) => {
      return data.rows[0];
    });

module.exports = {
  findUserDialogs,
  findDialog,
  createDialog,
};
