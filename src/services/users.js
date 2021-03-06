const { hashPassword, createToken, checkPassword } = require('../utils');
const User = require('../repository/users');

const USERS_PER_PAGE = 10;

const signup = async (user) => {
  const [password, token] = await Promise.all([hashPassword(user.password), createToken()]);
  user.password = password;
  user.token = token;
  return User.create(user);
};

const signin = async (user) => {
  const foundUser = await User.findByEmail(user.email);
  if (!foundUser) return { err: { status: 404 } };
  const match = await checkPassword(user.password, foundUser.password);
  if (!match) return { err: { status: 403 } };
  const token = await createToken();
  await User.updateUserToken(foundUser.id, token);
  delete foundUser.password;
  foundUser.token = token;
  return { user: foundUser };
};

const logout = async (token) => {
  const foundUser = await User.findByToken(token);
  await User.updateUserToken(foundUser.id, null);
  foundUser.token = token;
  return { user: foundUser };
};

const assign = async (info, token) => {
  const foundUser = await User.findByToken(token);
  if (foundUser.type === 'owner') {
    await User.assignPetOwners(foundUser.id, info);
  } else {
    await User.assignPetFinders(foundUser.id, info);
  }
  return foundUser;
};

const getUsers = async (token, skip = 0, take = USERS_PER_PAGE) => {
  const foundUser = await User.findByToken(token);
  if (foundUser.type === 'owner') {
    return User.findPetFinders(skip, take);
  } else {
    return User.findPetOwners(skip, take);
  }
};

const getUser = async (id) => {
  const foundUser = await User.findById(id);
  if (foundUser.type === 'owner') {
    return {
      ...foundUser,
      ...(await User.findPetOwnerByUserId(id)),
    };
  } else {
    return {
      ...foundUser,
      ...(await User.findPetFinderByUserId(id)),
    };
  }
};

module.exports = {
  signup,
  signin,
  logout,
  assign,
  getUsers,
  getUser,
};
