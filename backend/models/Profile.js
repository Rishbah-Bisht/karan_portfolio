const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: String,
    title: String,
    about: String,
    email: String,
    location: String,
    linkedin: String,
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
