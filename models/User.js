const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
    username: String,
    redditID: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;