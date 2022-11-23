const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const leagueSchema = mongoose.Schema(
    {
        leaguename: {type: String, required: true},
        leagueyear: {type: String, required: true},
        leagueteam: {type: String, required: true},
        teamscore: {type: String, required: true},
        totalgoalsscored: {type: String, required: true},
        totalgoalsconceded: {type: String, required: true},
        matchesplayed: {type: String, required: true},
        matcheswon: {type: String, required: true},
        matcheslost: {type: String, required: true},
        matchestied: {type: String, required: true},
        averagegoals: {type: String, required: true},

    }, {timestamps: true}
);

const League = mongoose.model('League', leagueSchema);
module.exports = League;
