const allowedOrigins = require('./allowedOrigins')

//The corsOptions object configures the behavior of the CORS middleware.
//allowed origins just array of domains that are allowed
//origin arg is the domain origin that is being tested
//callback: A callback function that is called with the result of the origin check.
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,//This property is set to true, which means that the Access-Control-Allow-Credentials header will be set to true. This allows cookies and other credentials to be included in cross-origin requests.
    optionsSuccessStatus: 200//ensures the status code is 200
}

module.exports = corsOptions 