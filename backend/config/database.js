const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get the appropriate MongoDB URI based on environment
    const environment = process.env.ENVIRONMENT || 'local';
    const mongoUri = environment === 'production' 
      ? process.env.MONGODB_URI_PRODUCTION 
      : process.env.MONGODB_URI_LOCAL || 'mongodb://localhost:27017/task-management';
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected Successfully`);
    console.log(`Environment: ${environment}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
