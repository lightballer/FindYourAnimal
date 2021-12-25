const router = require('express').Router();

const { authorized } = require('../middlewares/authorized');
const { createMessage } = require('../controllers/messages');

router.post('/:id/dialogs/:dialogId', authorized, createMessage);

module.exports = router;
