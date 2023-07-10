const express = require('express');
const purchaseController = require('../controller/purchase');
const userAuthentication = require('../middleware/authorization');

const router = express.Router();

router.get('/purchase/premiummembership', userAuthentication.authenticate, purchaseController.purchasepremium);
router.post('/purchase/updatetransactionstatus', userAuthentication.authenticate, purchaseController.updateTransaction)

module.exports = router;