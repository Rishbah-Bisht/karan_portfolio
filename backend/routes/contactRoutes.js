const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create a contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const newContact = new Contact({ name, email, message });

    try {
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all contact messages (for admin dashboard later)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
