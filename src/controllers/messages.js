const messageService = require('../services/messages');

const createMessage = async (req, res) => {
  const { content, userId, dialogId } = req.body;
  const { message, err } = await messageService.createMessage(userId, dialogId, content);
  if (err) res.status(err.status).send();
  else res.status(200).json(message);
};

module.exports = { createMessage };
