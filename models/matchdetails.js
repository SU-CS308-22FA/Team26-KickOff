
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const matchSchema = mongoose.Schema(
    {
        hometeam: {type: String, required: true},
        awayteam: {type: String, required: true},
        stadiumname: {type: String, required: true},
        refereename: {type: String, required: true},
        date: {type: String, required: true},
        firsthalfscoreHome: {type: String, required: true},
        firsthalfscoreAway: {type: String, required: true},
        secondhalfscoreHome: {type: String, required: true},
        secondhalfscoreAway: {type: String, required: true},
        ballpossesionHome: {type: String, required: true},
        ballpossesionAway: {type: String, required: true},
        totalshotsHome: {type: String, required: true},
        totalshotsAway: {type: String, required: true},
        shotsonbarHome: {type: String, required: true},
        shotsonbarAway: {type: String, required: true},
        shotsontargetHome: {type: String, required: true},
        shotsontargetAway: {type: String, required: true},
        cornerkicksHome: {type: String, required: true},
        cornerkicksAway: {type: String, required: true},
        offsidesHome: {type: String, required: true},
        offsidesAway: {type: String, required: true},
        foulsHome: {type: String, required: true},
        foulsAway: {type: String, required: true},
        yellowcardsHome: {type: String, required: true},
        yellowcardsAway: {type: String, required: true},
        redcardsHome: {type: String, required: true},
        redcardsAway: {type: String, required: true},
        goalsavesHome: {type: String, required: true},
        goalsavesAway: {type: String, required: true},
        passesHome: {type: String, required: true},
        passesAway: {type: String, required: true},
        accpassesHome: {type: String, required: true},
        accpassesAway: {type: String, required: true},

    }, {timestamps: true}
);

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;