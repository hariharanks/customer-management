const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
    try {
        // Setup Multer for file uploads
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'client/public/uploads'); // Save files in public/uploads
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
            },
        });

        const upload = multer({ storage });

        // Middleware to serve static files
        app.use(express.static('public'));

        // Route to handle file uploads
        app.post('/api/upload', upload.single('image'), (req, res) => {
            res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
        });
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected!");

        const authRoutes = require('./routes/auth');
        app.use('/api/auth', authRoutes);
        const customerRoutes = require('./routes/customers');
        app.use('/api/customers', customerRoutes);
        const productRoutes = require('./routes/products');
        app.use('/api/products', productRoutes);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Connection error', error);
        process.exit(1);
    }
};

startServer();
