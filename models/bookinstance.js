let mongoose = require('mongoose');
let moment = require('moment');

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

BookInstanceSchema.virtual('due_back_formatted').get(function(){
    return moment(this.due_back).format('MMMM Do, YYYY');
})

BookInstanceSchema.virtual('url').get(function(){
    return `/catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);