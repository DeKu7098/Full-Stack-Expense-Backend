const express = require('express');
const premiumController = require('../controller/premiumFeature');
const userAuthentication = require('../middleware/authorization');

const router = express.Router();

router.get('/premium/showleaderboard', userAuthentication.authenticate, premiumController.getUserLeaderBoard);

module.exports = router;