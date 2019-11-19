let mongoose = require('mongoose');
let moment = require('moment');

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

AuthorSchema.virtual('dob').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD'): '';
})
AuthorSchema.virtual('dod').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD'): '';
})

AuthorSchema.virtual('name').get(function() {
    return this.last_name + ', ' + this.first_name;
})

AuthorSchema.virtual('lifespan').get(function(){
    return (this.date_of_birth.getYear() - this.date_of_death.getYear()).toString()
});

AuthorSchema.virtual('url').get(function(){
    return `/catalog/author/${this._id}`
});

module.exports = mongoose.model('Author', AuthorSchema);