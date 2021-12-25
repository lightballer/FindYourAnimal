const userService = require('../services/messages');

const createMessage = async (req, res) => {
  const { dialogId } = req.params;
  const { content, userId } = req.body;
  const { message, err } = await userService.createMessage(userId, dialogId, content);
  if (err) res.status(err.status).send();
  else res.status(200).json(message);
};

module.exports = { createMessage };
