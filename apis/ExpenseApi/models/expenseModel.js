const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseModel = new Schema(
    {
        username: { type: String, required: true },
        expenseType: { type: String, required: true },
        expenseAmount: { type: Number, required: true },
        expenseDate: { type: String, required: true },
    }
);

module.exports = mongoose.model('Expense', expenseModel);