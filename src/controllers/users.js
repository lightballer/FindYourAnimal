const router = require('express').Router();
const { signup, signin } = require('../services/users');

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
