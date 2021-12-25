const validateSignUp = (req, res, next) => {
  if (!req.body.user) {
    res.status(400).send();
    return;
  }
  const { name, email, password, type } = req.body.user;
  if (
    !name ||
    !email ||
    !password ||
    !type ||
    !isEmailValid(email) ||
    !isPasswordValid(password) ||
    !(type === 'owner' || type === 'finder')
  ) {
    res.status(400).send();
    return;
  }
  next();
};

const validateSignIn = (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email || !password || !isEmailValid(email) || !isPasswordValid(password)) {
    res.status(400).send();
    return;
  }
  next();
};

const validateAssigning = (req, res, next) => {
  if (!req.body.userInfo) {
    res.status(400).send();
    return;
  }
  const { phone, description, location, whome, age } = req.body.userInfo;
  if (!phone || !description || !location || !whome || !age) {
    res.status(400).send();
    return;
  }
  next();
};

const isEmailValid = (email) => {
  const EMAIL_REGEX = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return email.match(EMAIL_REGEX) ? true : false;
};
const isPasswordValid = (password) => {
  return password < 6 ? false : true;
};

module.exports = { validateSignUp, validateSignIn, validateAssigning };
