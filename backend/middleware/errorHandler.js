const { logEvents } = require('./logger')


//middleware adds additional functionality to the api and preliminary request processing
//there is built in, custom, and 3rd party
//iff errors aren't caught elsewhere this will run 
const errorHandler = (err, req, res, next) => { //override express middleware
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler