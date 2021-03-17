const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./src/routers/user');

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('This is a real database');
mongoose.connect("mongodb://mongodb:27017/testdb", { useUnifiedTopology: true });
const sixtyDaysInSeconds = 5184000;

app.use(cors());
// Secure api using helmet
app.use(helmet.xssFilter());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
}));

app.use(helmet.frameguard({ action: 'sameorigin' }));

app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}));

app.use(express.json());

app.use(userRouter);

app.listen("3002", () =>
  console.log(`Example app listening on port 3002!`),
);