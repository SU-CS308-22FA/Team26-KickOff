const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const upcomingmatchSchema = mongoose.Schema(
    {
        hometeamU: {type: String, required: true},
        awayteamU: {type: String, required: true},
        stadiumnameU: {type: String, required: true},
        refereenameU: {type: String, required: true},
        dateU: {type: String, required: true},

    }, {timestamps: true}
);

const upcomingMatch = mongoose.model('upcomingMatch', upcomingmatchSchema);
module.exports = upcomingMatch;