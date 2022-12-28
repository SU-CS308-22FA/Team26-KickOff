const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const stadiumsSchema = mongoose.Schema(
    {
        stadium_teamname: {type: String, required: true},
        stadium_photo: {type: String, required: true},
        
    }, {timestamps: true}
);

const Stadiums = mongoose.model('stadiums', stadiumsSchema);
module.exports = Stadiums;