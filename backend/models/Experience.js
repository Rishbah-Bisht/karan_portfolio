const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    duration: String,
    location: String,
    description: String,
    tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
