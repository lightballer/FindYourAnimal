const User = require('../repository/dialogs');

const getUserDialogs = async (token, skip = 0, take = USERS_PER_PAGE) => {
  const foundUser = await User.findByToken(token);
  const dialogs = await User.findUserDialogs(foundUser.email, skip, take);
  return dialogs.map(({ id, user1, user2 }) => ({
    id,
    ...(user1 === foundUser.email ? { user2 } : { user1 }),
  }));
};

const getDialog = async (dialogId) => {
  const dialog = await User.findDialog(dialogId);
  return dialog;
};

const createDialog = async (userId, companionId) => {
  const dialog = await User.createDialog(userId, companionId);
  return dialog;
};

module.exports = { getUserDialogs, getDialog, createDialog };
