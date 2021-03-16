const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./src/routers/user');
require('./src/db/db');

const app = express();
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