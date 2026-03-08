const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: String,
    category: String, // e.g., 'CRM & Data Strategy', 'Operations & Scaling', 'Technical Tooling'
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
