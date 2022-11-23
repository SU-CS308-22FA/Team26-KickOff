const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const playerSchema = mongoose.Schema(
    {
        teamname: { type: String, required:true},
        p_num: { type: String, required:true}, //player number
        p_name: { type: String, required:true}, //player name
        p_pos: { type: String, required:false}, //player position
        p_image: { type: String, required:true} //player image
    }, {timestamps: true}
);


const Player = mongoose.model('Player', playerSchema);
module.exports = Player;