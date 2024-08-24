const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

router.post('/signup', signupValidation, async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = new User(req.body);
        const isExistWithEmail = await User.findOne({ email: email });
        if (isExistWithEmail) {
            return res.status(409).json({ error: 'User already exists with the same Email', success: false });
        }
        user.password = await bcrypt.hash(password, 10)
        const result = await user.save();
        res.status(201).json({data: result.data, success: true});
    } catch (error) {
        res.status(500).json({ error: `Failed to create a new User ${error}` });
    }
});

router.post('/login', loginValidation, async (req, res) => {
    try {
        const { email, password } = req.body;
        const authError = 'Email / Password is wrong';
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({ error: authError, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ error: authError, success: false })
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to create a new User ${error}` });
    }
});

module.exports = router;