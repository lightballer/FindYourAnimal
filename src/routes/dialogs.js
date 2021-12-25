const router = require('express').Router();

const { authorized } = require('../middlewares/authorized');
const { getUserDialogs, createDialog, getDialog } = require('../controllers/dialogs');

router.get('/:userId', authorized, getUserDialogs);
router.post('/', authorized, createDialog);
router.get('/:dialogId', authorized, getDialog);

module.exports = router;
