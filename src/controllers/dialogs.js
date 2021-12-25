const dialogsService = require('../services/dialogs');

const getUserDialogs = async (req, res) => {
  const { skip, take } = req.query;
  const { authorization: token } = req.headers;
  const dialogs = await dialogsService.getUserDialogs(token, skip, take);
  res.status(200).json(dialogs);
};

const getDialog = async (req, res) => {
  const { dialogId } = req.params;
  const dialog = await dialogsService.getDialog(dialogId);
  res.status(200).json(dialog);
};

const createDialog = async (req, res) => {
  const { userId, companionId } = req.body;
  const { dialog, err } = await dialogsService.createDialog(userId, companionId);
  if (err) res.status(err.status).send();
  else res.status(200).json(dialog);
};

module.exports = {
  getUserDialogs,
  getDialog,
  createDialog,
};
