const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
