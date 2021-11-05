const mongoose = require('mongoose')

// Dotenv
const dotenv = require('dotenv')
const { connect } = require('../router/auth')
dotenv.config({path : './config.env'})

//Databse
const Database = process.env.DATABASE

// Connect Database to Mongoose
try {
    mongoose.connect(Database, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useFindAndModify : false,
        useCreateIndex : true
    })

    console.log('Connection Successful .. hurraayy')

} catch(err) {
    console.log(err);
}
