const User = require('../repository/messages');

const createMessage = async (userId, dialogId, content) => {
  const message = await User.createMessage(userId, dialogId, content);
  return message;
};

module.exports = { createMessage };
