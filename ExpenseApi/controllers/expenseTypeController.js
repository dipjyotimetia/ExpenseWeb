const ExpenseType = require('../models/expenseTypeModel');

exports.new = (req, res) => {
    let expenseType = new ExpenseType();
    expenseType.name = req.body.name;
    expenseType.description = req.body.description;
    expenseType.save((err) => {
        if (err) {
            res.json(err);
        }
        res.json({
            message: 'New Expense Type Added',
            data: expenseType
        });
    });
}

exports.view = (req, res) => {
    const query = {};
    ExpenseType.find(query, (err, expenseType) => {
        if (err) {
            return res.send(err);
        }
        return res.json(expenseType);
    });
}

exports.delete = (req, res) => {
    ExpenseType.remove({
        name: req.params.name
    }, (err, expenseType) => {
        if (err) {
            res.json(err);
        }
        res.json({
            status: "success",
            message: "ExpenseType Deleted"
        })
    })
}