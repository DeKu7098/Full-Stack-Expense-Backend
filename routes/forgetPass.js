const express = require('express');
const passwordController = require('../controller/forgetPassController');

const router = express.Router();

router.post('/password/forgetPassword', passwordController.generateLink);
router.get('/password/resetpassword/:uuid', passwordController.uuidValidator);
router.post('/password/createPassword', passwordController.createPassword);

module.exports = router;