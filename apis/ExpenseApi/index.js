const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('This is a real database');
mongoose.connect("mongodb://mongodb:27017/testdb", { useUnifiedTopology: true });

// Api Models
const Expense = require('./models/expenseModel');
const Category = require('./models/categoryModel');

// Api Routers
const expenseRouter = require('./routes/expenseRouter')(Expense);
const expenseTypeRouter = require('./routes/expenseTypeRouter');
const categoryRouter = require('./routes/categoryRouter')(Category);

app.use(compression());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Api use
app.use('/api', expenseRouter);
app.use('/api', expenseTypeRouter);
app.use('/api', categoryRouter);

app.listen("3001", () =>
    console.log(`Expense api listening on port 3001!`),
);