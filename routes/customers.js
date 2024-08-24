const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const isAuthenticated = require('../Middlewares/Auth');

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { phone, email } = req.body;
        const customer = new Customer(req.body);
        const isExistWithPhone = await Customer.findOne({ phone: phone });
        if (isExistWithPhone) {
            return res.status(409).json({ success: false, error: 'Customer already exists with the same Phone number' });
        }
        const isExistWithEmail = await Customer.findOne({ email: email });
        if (isExistWithEmail) {
            return res.status(409).json({ success: false, error: 'Customer already exists with the same Email' });
        }
        const result = await customer.save();
        res.status(201).json({success:true, data: result});
    } catch (error) {
        res.status(500).json({ error: `Failed to create a new customer ${error}` });
    }
});

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({success:true, data:customers});
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch customers' });
    }
});

router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }
        res.status(200).json({success:true, data: customer});
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch the customer' });
    }
});

router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const { phone } = req.body;
        const isExistWithPhone = await Customer.findOne({ phone: phone, _id: { $ne: req.params.id } });
        if (isExistWithPhone) {
            return res.status(409).json({ success: false, error: 'Customer already exists with the same Phone number' });
        }
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update the customer' });
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete the customer' });
    }
});

module.exports = router;
