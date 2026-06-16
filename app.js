// Load environment variables immediately
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

// Initialize the Express framework
const app = express();

// 1. Establish Database Connection
connectDB();

// 2. Global Middleware Configurations
// Enable Cross-Origin Resource Sharing (allows your frontend to communicate with the API)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5500',
    credentials: true
}));

// Body parsers (allows Express to read incoming JSON payloads)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Application API Routes
app.use('/api/books', bookRoutes);

// Root benchmark/health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// 4. Centralized Fallback Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`💥 Error Stack: ${err.stack}`);
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Only surface full error details to developer console in non-production environments
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Catch-all route for missing endpoints (404 Handler)
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Resource not found on this server' });
});
// Export the configured Express app for use in server.js
module.exports = app;