const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// Get profile
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update/Create profile
router.post('/', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (profile) {
            profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
        } else {
            profile = new Profile(req.body);
            await profile.save();
        }
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
