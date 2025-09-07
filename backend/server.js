const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit'); // Disabled for development
const connectDB = require('./config/database');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());



// Clean logging middleware - only in development
if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('dev')); // Cleaner format: :method :url :status :response-time ms - :res[content-length]
} else {
  app.use(morgan('combined')); // Full format for production
}

// CORS configuration based on environment
const environment = process.env.ENVIRONMENT || 'local';
const frontendUrl = environment === 'production' 
  ? process.env.FRONTEND_URL_PRODUCTION 
  : process.env.FRONTEND_URL_LOCAL || 'http://localhost:3000';


  console.log(`Frontend URL: ${frontendUrl}`);
const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  optionsSuccessStatus: 200
};

// CORS and body parsing middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Disable caching in development only
if (process.env.ENVIRONMENT === 'development') {
  app.use((req, res, next) => {
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    next();
  });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Task Management API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.ENVIRONMENT || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    ...(process.env.ENVIRONMENT === 'development' && { error: error.message })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.ENVIRONMENT || 'development'}`);
  console.log(`App Environment: ${environment}`);
  console.log(`Frontend URL: ${frontendUrl}`);
});
