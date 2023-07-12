const express = require('express');
const premiumController = require('../controller/premiumFeature');
const userAuthentication = require('../middleware/authorization');

const router = express.Router();

router.get('/premium/showleaderboard', userAuthentication.authenticate, premiumController.getUserLeaderBoard);
router.get('/premium/downrep', userAuthentication.authenticate, premiumController.downloadrep);
router.get('/premium/downgenerep', userAuthentication.authenticate, premiumController.downgenerep);

module.exports = router;