const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const customerRoutes = require('./routes/customers'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('customers');
        // module.exports = db;

        const customerRoutes = require('./routes/customers')(db);

        app.use('/api/customers', customerRoutes);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Connection error', error);
        process.exit(1); // Exit the process with an error code
    }
};

startServer();
