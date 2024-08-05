const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    imdbId: {
        type: String,
    },  
    body: {
        type: String,
    },
    rating: {
        type: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("Reviews", reviewSchema);



