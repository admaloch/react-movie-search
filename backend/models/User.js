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
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    likedMovies: [
        {
            imdbId: {
                type: String,
            },
            title: {
                type: String,
            },
            type: {
                type: String,
            },
            hasWatched: {
                type: Boolean,
            }
        }
    ],
})

module.exports = mongoose.model('User', userSchema)

