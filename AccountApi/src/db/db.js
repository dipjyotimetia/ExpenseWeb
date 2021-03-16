const mongoose = require('mongoose')

let url = "mongodb://mongodb:27017/accounts";

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
