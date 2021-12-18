const userService = require('../services/users');

const signup = async (req, res) => {
  try {
    const { user } = req.body;
    const newUser = await userService.signup(user);
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const signin = async (req, res) => {
  const { user } = req.body;
  const { user: foundUser, err } = await userService.signin(user);
  if (err) res.status(err.status).send();
  else res.status(200).json(foundUser);
};

const logout = async (req, res) => {
  const { authorization: token } = req.headers;
  const { err } = await userService.logout(token);
  if (err) res.status(404).send();
  else res.status(200).send();
};

const assign = async (req, res) => {
  const { userInfo } = req.body;
  const { authorization: token } = req.headers;
  const { user, err } = await userService.assign(userInfo, token);
  if (err) res.status(err.status).send();
  else res.status(200).json(user);
};

module.exports = {
  signup,
  signin,
  logout,
  assign,
};
