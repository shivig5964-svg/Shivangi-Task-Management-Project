const jwt = require('jsonwebtoken');
const User = require('../models/User');
const HTTP_STATUS = require('../constants/statusCodes');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '7d'
  });
};

// Register a new user
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    const error = new Error(existingUser.email === email ? 'Email already registered' : 'Username already taken');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  // Create new user
  const user = new User({
    username,
    email,
    password
  });

  await user.save();

  // Generate token
  const token = generateToken(user._id);

  return {
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
};

// Login user
const loginUser = async (loginData) => {
  const { email, username, password } = loginData;

  // Determine if the input is email or username
  const isEmail = email && email.includes('@');
  const loginField = isEmail ? email : username;

  if (!loginField) {
    const error = new Error('Email or username is required');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  // Find user by email or username
  const user = await User.findOne({
    $or: [
      { email: loginField },
      { username: loginField }
    ]
  });

  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  // Generate token
  const token = generateToken(user._id);

  return {
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
};

// Get current user
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
