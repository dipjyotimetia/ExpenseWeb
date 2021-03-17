const expensesController = (Expense) => {
    const post = (req, res) => {
        const expense = new Expense(req.body);
        if (!req.body.username) {
            res.status(400);
            return res.send('username is required');
        }
        expense.save();
        res.status(201)
        return res.json(expense);
    }

    const get = (req, res) => {
        const query = { 'expenseDate': -1 };
        if (req.query.username) {
            query.username = req.query.username;
        }
        Expense.find()
            .sort(query)
            .exec()
            .then((doc) => {
                res.status(200).json(doc);
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error shorting expense date',
                    error: err
                })
            });
    }

    const getByUserName = (req, res) => {
        const query = { 'expenseDate': -1 };
        const name = { 'username': req.body.username };
        if (req.query.username) {
            query.username = req.query.username;
        }
        Expense.find(name)
            .sort(query)
            .exec()
            .then((doc) => {
                res.status(200).json(doc);
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error shorting expense date',
                    error: err
                })
            });
    }


    return { post, get, getByUserName };
}

module.exports = expensesController;