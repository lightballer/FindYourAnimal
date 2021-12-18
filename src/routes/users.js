const router = require('express').Router();
const { signup, signin, logout, assign } = require('../controllers/users');

router.post('/signup', signup);
router.put('/signin', signin);
router.put('/logout', logout);
router.post('/assign', assign);

module.exports = router;
