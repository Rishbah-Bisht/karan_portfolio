const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ username });
        if (adminExists) return res.status(400).json({ message: 'User already exists' });

        const admin = new Admin({ username, password });
        await admin.save();

        const token = jwt.sign({ admin: true, id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(201).json({ token, message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Use username from body
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            // Fallback for initial account provided in .env
            if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            }
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ admin: true, id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Password (Protected)
router.post('/update-password', async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find admin by ID from token
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(404).json({ message: 'Admin session invalid. Please log in again.' });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        admin.password = newPassword; // Pre-save hook will hash it
        await admin.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error("Update Password Error:", err);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

// Auth Ping (For Debugging 404s)
router.get('/ping', (req, res) => res.json({ message: 'Auth routes are working!' }));

module.exports = router;
