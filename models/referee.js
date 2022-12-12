const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const refereeSchema = mongoose.Schema(
    {
        rname: { type: String, required:true},
        class: { type: String, require: true},
        region: { type: String, required: true},
        r_image: { type: String, required: true},
        matches: { type: Array}
    }, {timestamps: true}
);


const Referee = mongoose.model('Referee', refereeSchema);
module.exports = Referee;