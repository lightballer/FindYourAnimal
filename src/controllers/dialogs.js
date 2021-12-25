const userService = require('../services/dialogs');

const getUserDialogs = async (req, res) => {
  const { skip, take } = req.query;
  const { authorization: token } = req.headers;
  const { dialogs, err } = await userService.getUserDialogs(token, skip, take);
  if (err) res.status(err.status).send();
  else res.status(200).json(dialogs);
};

const getDialog = async (req, res) => {
  const { dialogId } = req.params;
  const { dialog, err } = await userService.getDialog(dialogId);
  if (err) res.status(err.status).send();
  else res.status(200).json(dialog);
};

const createDialog = async (req, res) => {
  const { userId, companionId } = req.body;
  const { dialog, err } = await userService.createDialog(userId, companionId);
  if (err) res.status(err.status).send();
  else res.status(200).json(dialog);
};

module.exports = {
  getUserDialogs,
  getDialog,
  createDialog,
};
