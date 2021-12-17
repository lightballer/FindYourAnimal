const router = require('express').Router();
const { signup, signin, logout, assign } = require('../services/users');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout)
router.post('/assign', assign)

module.exports = router;
