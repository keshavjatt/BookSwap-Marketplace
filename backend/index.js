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

// CORS enable karo frontend ke liye
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})); 

// Body parser with increased limit for image uploada
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

// Server start karo
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});