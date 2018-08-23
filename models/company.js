const mongoose = require('mongoose');

//Schema for data of a Company
var companySchema = new mongoose.Schema({
    name: String,
    logo: String,
    about: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Company", companySchema);
