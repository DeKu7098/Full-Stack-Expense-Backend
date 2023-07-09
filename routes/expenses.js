const express = require('express');
const expenses = require('../controller/expenses');
const userAuthentication = require('../middleware/authorization');

const router = express.Router();

router.get('/expense/get-expenses', userAuthentication.authenticate, expenses.getExpenses);
router.post('/expense/add-expenses', userAuthentication.authenticate, expenses.postExpenses);
router.delete('/expense/delete-expense/:id', userAuthentication.authenticate, expenses.deleteExpense);

module.exports = router;