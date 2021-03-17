const mongoose = require('mongoose');
const id = require('uuid');
const { Schema } = mongoose;

const expenseTypeModel = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true }
    }
);

module.exports = mongoose.model('ExpenseType', expenseTypeModel);