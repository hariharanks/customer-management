const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const user = new User(req.body);
        const isExistWithEmail = await User.findOne({ email: email });
        if (isExistWithEmail) {
            return res.status(409).json({ error: 'User already exists with the same Email' });
        }
        const result = await user.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: `Failed to create a new User ${error}` });
    }
});

module.exports = router;