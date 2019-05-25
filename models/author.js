var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, max: 100 },
        family_name: { type: String, required: true, max: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function () {
        return this.date_of_death ?
            (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString() :
            "Still alive";

    });

// Virtual for author's lifespan formatted
AuthorSchema
    .virtual('lifespan_formatted')
    .get(function () {
        return this.date_of_birth_formatted + ' - ' + (this.date_of_death_formatted ? this.date_of_death_formatted : '');
    })

// Virtual for author's date of birth formatted
AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).format("MMM Do, YYYY");
    })

// Virtual for author's date of death formatted
AuthorSchema
    .virtual('date_of_death_formatted')
    .get(function () {
        return this.date_of_death ? moment(this.date_of_death).format("MMM Do, YYYY") : this.date_of_death;
    })

// Virtual for author's date of birth formatted for date input fields
AuthorSchema
    .virtual('date_of_birth_date_input_formatted')
    .get(function () {
        return moment(this.date_of_birth).format("YYYY-MM-DD");
    })

// Virtual for author's date of death formatted for date input fields
AuthorSchema
    .virtual('date_of_death_date_input_formatted')
    .get(function () {
        return this.date_of_death ? moment(this.date_of_death).format("YYYY-MM-DD") : this.date_of_death;
    })

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);