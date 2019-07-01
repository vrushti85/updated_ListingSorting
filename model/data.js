var mongoose = require("mongoose");
var dataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    standard: Number
});
module.exports = mongoose.model("data", dataSchema);