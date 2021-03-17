const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
// const swaggerUi = require('swagger-ui-express');
// const openApiDocumentation = require('../api/swagger/swagger.json');
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

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use(cors());
app.use(compression());
// Secure api using helmet
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
}));
app.use(helmet.frameguard({ action: 'sameorigin' }));
const sixtyDaysInSeconds = 5184000;
app.use(helmet.hsts({
    maxAge: sixtyDaysInSeconds
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Api use
app.use('/api', expenseRouter);
app.use('/api',expenseTypeRouter);
app.use('/api', categoryRouter);

app.listen("3001", () =>
  console.log(`Example app listening on port 3001!`),
);