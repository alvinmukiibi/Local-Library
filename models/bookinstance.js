let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let obj = {
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back: {
        type: Date,
        default: Date.now
    }
};

let BookInstanceSchema = new Schema(obj);

BookInstanceSchema.virtual('url').get(() => `/catalog/bookinstance/${this._id}`)

module.exports = mongoose.model('BookInstance', BookInstanceSchema);