const mongoose = require('mongoose')

let url = process.env.MONGODB_URL_TEST;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
