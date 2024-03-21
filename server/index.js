// Import necessary libraries
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./db');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Routes
const guestListRoutes = require('./routes/guestListRoutes');
const authRouter = require("./routes/auth");
app.use('/auth' , authRouter);
app.use('/guestlists', guestListRoutes);

// Utility function for wrapping async functions
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};



// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    error: {
      message: err.message || 'An unknown error occurred!',
    },
  });
});

// Server configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
