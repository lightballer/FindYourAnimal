const database = require('../database');

const createMessage = (userId, dialogId, content) =>
  database
    .query(
      'INSERT INTO dialogs (user1, dialogId, content) VALUES ($1, $2, $3) RETURNING id, content;',
      [userId, dialogId, content]
    )
    .then((data) => {
      return data.rows[0];
    });

module.exports = {
  createMessage,
};
