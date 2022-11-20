const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        username: { type: String, required:true},
        email: { type: String, required:true},
        password: { type: String, required:true},
        image: { type: String, required:false}
    }, {timestamps: true}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;