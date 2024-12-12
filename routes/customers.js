const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { ObjectId } = require('mongodb');

router.post('/', async (req, res) => {
    try {
        const { phone, email } = req.body;
        const customer = new Customer(req.body);
        const isExistWithPhone = await Customer.findOne({ phone: phone });
        if (isExistWithPhone) {
            return res.status(409).json({ error: 'Customer already exists with the same Phone number' });
        }
        const isExistWithEmail = await Customer.findOne({ email: email });
        if (isExistWithEmail) {
            return res.status(409).json({ error: 'Customer already exists with the same Email' });
        }
        const result = await customer.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: `Failed to create a new customer ${error}` });
    }
});

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the customer' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the customer' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the customer' });
    }
});

module.exports = router;
