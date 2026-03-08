const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// Get all certifications
router.get('/', async (req, res) => {
    try {
        const certs = await Certification.find().sort({ createdAt: -1 });
        res.json(certs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new certification
router.post('/', async (req, res) => {
    const cert = new Certification(req.body);
    try {
        const newCert = await cert.save();
        res.status(201).json(newCert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete certification
router.delete('/:id', async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Certification deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
