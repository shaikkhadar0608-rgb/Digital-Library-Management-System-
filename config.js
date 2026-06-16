// Import the compiled application logic
const app = require('./app');

// Retrieve the port configuration from environment variables, defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server listener
const server = app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(` 📚 DigiLib Backend Engine Active            `);
    console.log(` 🚀 Running in [${process.env.NODE_ENV || 'development'}] mode`);
    console.log(` 📡 Listening on Port: ${PORT}               `);
    console.log(`=============================================`);
});

// Handle unhandled promise rejections globally (e.g., database connection issues)
process.on('unhandledRejection', (err) => {
    console.error(`🔴 Unhandled Rejection Error: ${err.message}`);
    // Close server & exit process gracefully
    server.close(() => process.exit(1));
});