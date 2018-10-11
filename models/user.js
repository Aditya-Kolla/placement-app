const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {
        first: String,
        middle: { type: String, trim: true},
        last: { type: String, trim: true }
    },
    regNumber: Number,
    address: String,
    age: { type: String, min: 0 },
    gender: String,
    email: String,
    phone: Number,
    image: { type: String, default: "https://eabiawak.com/wp-content/uploads/2017/07/photo.png"},

    branch: String,
    cgpa: Number,
    created: {type: Date, default: Date.now()}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);