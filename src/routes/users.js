const router = require('express').Router();
const {
  signup,
  signin,
  logout,
  assign,
  getUsers,
  getUser,
  getUserDialogs,
  getDialog,
  createDialog,
  createMessage,
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
router.post('/:id/dialogs', createDialog);
router.get('/:id/dialogs/:dialogId', getDialog);
router.post('/:id/dialogs/:dialogId', createMessage);

module.exports = router;
