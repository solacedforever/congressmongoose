const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/senatorsdb');

const senatorsSchema = new Schema({
  "id": Number,
  "party": { type: String, required: true },
  "state": { type: String, required: true },
  "person": { "gender": { type: String, required: true },
                    "firstname": { type: String, required: true },
                    "lastname": { type: String, required: true },
                    "birthday": { type: Date, required: true },
                  },
  "phone": String,
  "extra": {
                "address": String,
                "contact_form": String,
                "fax": String,
                "office": String,
                }
});
senatorsSchema.statics.findAndSort = function (findRestrictions, howToRender) {
  this
    .find(findRestrictions)
    .sort({ "person.lastname": 1})
    .then(function(senators) {
      // docs.forEach(function (doc) {
      //     //doc.spoilerFreeName = if (doc.season === 7) { 'spoiler'} else { doc.name }// if the episode is in the current season, show 'spoiler', otherwise, show the normal name
      //   doc.spoilerFreeName = (doc.season === 7 ? 'spoiler' : doc.name);
      // });
      howToRender(senators);
    });
}
senatorsSchema.statics.deleteSenator = function (findRestrictions, howToRender) {
  this
    .deleteOne(findRestrictions)
    .then(function() {
      redirect();
    });
}
senatorsSchema.statics.findOneSenator = function (findRestrictions, howToRender) {
  this
    .findOne(findRestrictions)
    .then(function(senators) {
      howToRender(senators);
    });
}


const Senator = mongoose.model('senatorsdb', senatorsSchema, 'senators');

module.exports = Senator;
