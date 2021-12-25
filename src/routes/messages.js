const router = require('express').Router();

const { authorized } = require('../middlewares/authorized');
const { createMessage } = require('../controllers/messages');

router.post('/:dialogId', authorized, createMessage);

module.exports = router;
