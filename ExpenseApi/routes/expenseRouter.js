const express = require('express');
const expenseController = require('../controllers/expensesController');

const routes = (Expense) => {
    const expenseRouter = express.Router();
    const controller = expenseController(Expense);

    expenseRouter.route('/expenses')
        .get(controller.get)
        .post(controller.post);

    expenseRouter.route('/expenseuser')
        .post(controller.getByUserName);

    expenseRouter.get('/expenses/:username', (req, res) => {
        const name = { 'username': req.params.username };
        Expense.find(name, (err, expense) => {
            if (err) {
                return res.status(500).json(err);
            }
            else {
                return res.json(expense);
            }
        })
    });

    expenseRouter.delete('/expenses/:id', (req, res) => {
        const id = { 'username': req.params._id };
        Expense.remove({
            _id: id
        }, (err, expense) => {
            if (err) {
                res.status(500).json(err)
            }
            return res.json({
                status: 'success',
                message: 'Expense Deleted'
            })
        })
    });

    expenseRouter.use('/expenses/:expenseId', (req, res, next) => {
        Expense.findById(req.params.expenseId, (err, expense) => {
            if (err) {
                return res.json(err)
            }
            if (expense) {
                req.expense = expense;
                return next();
            }
            return res.sendStatus(404);
        });
    });

    expenseRouter.route('/expenses/:expenseId')
        .get((req, res) => res.json(req.expense))
        .put((req, res) => {
            const { expense } = req;
            expense.username = req.body.username;
            expense.expenseType = req.body.expenseType;
            expense.expenseAmount = req.body.expenseAmount;
            expense.expenseDate = req.body.expenseDate;
            expense.save();
            return res.json(expense);
        })
        .patch((req, res) => {
            const { expense } = req;
            if (req.expense._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const value = item[1];
                expense[key] = value;
            });
            req.expense.save((err) => {
                if (err) {
                    res.send(err)
                }
                return res.json(expense);
            });
        });

    return expenseRouter;
}

module.exports = routes;