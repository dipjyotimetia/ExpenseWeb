const express = require('express');
const router = express.Router();

const ExpenseTypeController = require('../controllers/expenseTypeController');

router.route('/expensetypes')
    .post(ExpenseTypeController.new)
    .get(ExpenseTypeController.view)
    .delete(ExpenseTypeController.delete);

module.exports = router;

