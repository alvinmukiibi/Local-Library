let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let obj = {
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    genre: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }]
}

let BookSchema = new Schema(obj);

BookSchema.virtual('url').get(() => `/catalog/book/${this._id}`)

module.exports = mongoose.model('Book', BookSchema);