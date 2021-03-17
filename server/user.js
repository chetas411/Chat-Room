const mongoose = require("mongoose"),
    {Schema} = require("mongoose");

var userSchema = new Schema(
    {
        fname: {
            type: String,
            trim: true
        },
        lname: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true
        },
        password: {
            type: String
        }
    }
);

module.exports = mongoose.model("User", userSchema);