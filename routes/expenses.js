const express = require('express');
const expenses = require('../controller/expenses');

const router = express.Router();

router.get('/expense/get-expenses', expenses.getExpenses);
router.post('/expense/add-expenses', expenses.postExpenses);
router.delete('./expense/delete-expense/:id', expenses.deleteExpense);

module.exports = router;