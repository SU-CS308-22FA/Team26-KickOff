const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema(
    {
        teamname: { type: String, required:true},
        director: { type: String, required:true},
        st_name: { type: String, required:true},
        logo: { type: String, required:false}
    }, {timestamps: true}
);


const Team = mongoose.model('Team', teamSchema);
module.exports = Team;