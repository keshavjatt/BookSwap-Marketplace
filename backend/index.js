const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database.config');

// Route imports
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const requestRoutes = require('./routes/request.routes');

// Environment variables load karo
dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // CORS enable karo frontend ke liye

// Body parser with increased limit for image upload - YAHAN CHANGE KIYA HAI
app.use(express.json({ limit: '5mb' })); // JSON body parser with 5MB limit
app.use(express.urlencoded({ extended: true, limit: '5mb' })); // URL encoded body parser with 5MB limit

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: 'BookSwap Marketplace API is running!',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/requests', requestRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API route not found',
        requestedUrl: req.originalUrl
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    
    if (error.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'File too large. Please upload images less than 10MB.'
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
});

// Server start karo
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});