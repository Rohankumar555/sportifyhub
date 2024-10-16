// models/Center.js
const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sports: {
        type: Array,
        default: [],
        required: true
    }
});
const centerData=new mongoose.model("Center",centerSchema);
module.exports = mongoose.model('Center', centerSchema);
