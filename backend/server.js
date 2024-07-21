require('dotenv').config()
const express = require('express')
const app = express();  //calls express
//import path from nodejs system then use below
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')//parsing cookies middleware
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
//connect to the db
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

//determines what port server runs on // dev vs deploy
//looks for location in environment vars otherwise 3500 by default
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

//connect to mongo db uri
connectDB()

app.use(logger) //logger middleware

app.use(cors(corsOptions))//cors middleware

app.use(express.json())//parse json data middleware

app.use(cookieParser())

//telling server where to look for static files this is express middleware
//listening for root of webpage
//path.join is method of path
//dirname is global var of nodejs.. look in folder we're in
app.use('/', express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/reviews', require('./routes/reviewRoutes.js'))


//listner for issues
//app.all '*' matches all http requests so it is a cathcall for errors
//res.status just changes the status code
//conditionals check if the client accepts html, json or anything else
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) { //if html found
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) { //this is for misrouting
        res.json({ message: '404 not found' })
    } else {
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler)// for middleware for errors

//wapr listener for connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
