const express = require('express');
const { ObjectId } = require('mongodb');

module.exports = (db) => {
    const router = express.Router();
    const collection = db.collection('customers'); 

    router.post('/', async (req, res) => {
        try {
            const {phone} = req.body;
            const customer = await collection.findOne({ phone: phone });
            if(customer){
                res.status(409).json({ error: 'Customer already exist with same phone number' });
                return;
            }
            const result = await collection.insertOne(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create a new customer' });
        }
    });

    router.get('/', async (req, res) => {
        try {
            const customers = await collection.find().toArray();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch customers' });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const customer = await collection.findOne({ _id: new ObjectId(req.params.id) });
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
            
            const result = await collection.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body },
                { returnDocument: 'after' }
            );
            if (!result._id) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update the customer' });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
            if (!result.deletedCount) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete the customer' });
        }
    });

    return router;
};
