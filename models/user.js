const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {
        first: String,
        middle: String,
        last: String
    },
    image: { type: String, default: "https://eabiawak.com/wp-content/uploads/2017/07/photo.png"}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);