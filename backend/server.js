require('dotenv').config()
const express = require('express')
const app = express();  //calls express
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')//parsing cookies middleware
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3500

connectDB()

app.use(logger) //logger middleware

app.use(cors(corsOptions))//cors middleware

app.use(express.json())//parse json data middleware

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/userRoutes'))
app.use('/reviews', require('./routes/reviewRoutes.js'))

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
