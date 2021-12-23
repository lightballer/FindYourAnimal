const router = require('express').Router();
const {
  signup,
  signin,
  logout,
  assign,
  getUsers,
  getUser,
  getUserDialogs,
} = require('../controllers/users');
const { authorized } = require('../middlewares/authorized');

router.post('/signup', signup);
router.put('/signin', signin);
router.use(authorized);
router.put('/logout', logout);
router.post('/assign', assign);
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/:id/dialogs', getUserDialogs);

module.exports = router;
