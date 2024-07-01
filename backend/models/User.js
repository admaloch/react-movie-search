const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedMovies: [
        {
            movieName: {
                type: String,
            },
            watched: {
                type: Boolean,
            },
            review: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        }
    ]
})

module.exports = mongoose.model('User', userSchema)

