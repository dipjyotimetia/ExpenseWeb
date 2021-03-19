const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./src/routers/user');

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('This is a real database');
mongoose.connect("mongodb://mongodb:27017/testdb", { useUnifiedTopology: true });

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use('/api', userRouter);

app.listen("3002", () =>
  console.log(`Accounts api listening on port 3002!`),
);