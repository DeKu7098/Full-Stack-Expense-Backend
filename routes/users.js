const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/user/signUp', userController.addUser);
router.post('/user/logIn', userController.logIn);

module.exports = router;