const express = require('express')
const app = express()


const cookieParser = require('cookie-parser')

// For Hiding relevant information
const dotenv = require('dotenv')
dotenv.config({path : './config.env'})

// Database
require('./db/Database')

//Cookie
app.use(cookieParser())


// Adding Middleware To Understand Json Input
app.use(express.json())

// Routes
app.use(require('./router/auth.js'))

// Port
PORT = process.env.PORT


// EJS 
app.set('view engine', 'ejs')

// Public Folder
app.use(express.static('./public'))


app.listen(PORT, () => {
    console.log(`Server is Running`)
})