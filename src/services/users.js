const { hashPassword, createToken, checkPassword } = require('../utils');
const User = require('../models/users');

const signup = async (req, res) => {
  try {
    const { user } = req.body;
    const [password, token] = await Promise.all([hashPassword(user.password), createToken()]);
    user.password = password;
    user.token = token;
    const newUser = await User.create(user);
    console.log({ newUser });
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.json(500);
  }
};

const signin = async (req, res) => {
  const { user } = req.body;
  const foundUser = await User.findByEmail(user);
  if (!foundUser) return res.status(404);
  const match = checkPassword(user.password, foundUser);
  if (!match) return res.status(403);
  const token = await createToken();
  await User.updateUserToken(foundUser.id, token);
  delete foundUser.password;
  foundUser.token = token;
  res.status(200).json(foundUser);
};

module.exports = {
  signup,
  signin,
};
