const User = require('../repository/users');

const authorized = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const foundUser = await User.findByToken(token);
  if (!foundUser) return res.status(401).send();
  next();
};

module.exports = {
  authorized,
};
