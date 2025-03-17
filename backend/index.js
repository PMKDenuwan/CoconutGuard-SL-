const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Debug: Check if MONGODB_CONNECTION is loading correctly
console.log("MongoDB Connection String:", process.env.MONGODB_CONNECTION);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Database connected successfully...'))
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);  // Exit the process if MongoDB connection fails
});

// Initialize Express
const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const clientRouter = require('./routes/client.route.js');
const appointmentRouter = require('./routes/appointments.route.js');
const authRouter = require('./routes/auth.route.js');

app.get('/', (req, res) => {
    res.send('Backend is running!');
});


app.use('/api/client', clientRouter);
app.use('/api/appointment', appointmentRouter);
app.use('/api/auth', authRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the Server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
