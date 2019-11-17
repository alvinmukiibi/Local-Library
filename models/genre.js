let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let obj = {
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    }
};

let GenreSchema = new Schema(obj);

GenreSchema.virtual('url').get(() => `/catalog/genre/${this._id}`)

module.exports = mongoose.model('Genre', GenreSchema);