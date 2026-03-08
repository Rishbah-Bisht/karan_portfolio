const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Login Route
router.post('/login', async (req, res) => {
    const { password } = req.body;
    try {
        const admin = await Admin.findOne({ username: 'admin' });
        if (!admin) {
            // Fallback to .env during migration if no DB user exists yet
            if (password === process.env.ADMIN_PASSWORD) {
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
        jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findOne({ username: 'admin' });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        admin.password = newPassword;
        await admin.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
});

module.exports = router;
