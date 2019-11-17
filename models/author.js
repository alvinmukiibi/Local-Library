let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let obj = {
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        max: 100
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    },
};

let AuthorSchema = new Schema(obj);

// virtuals are like methods, getter properties actually

AuthorSchema.virtual('lifespan').get(() => (this.date_of_birth.getYear() - this.date_of_death.getYear()).toString());

AuthorSchema.virtual('url').get(() => `/catalog/author/${this._id}`);

module.exports = mongoose.model('Author', AuthorSchema);