const authService = require('../services/authService');
const HTTP_STATUS = require('../constants/statusCodes');

// @desc    Register a new user
// @access  Public
const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error during registration';
    res.status(statusCode).json({ message });
  }
};

// @desc    Login user
// @access  Public
const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Login error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error during login';
    res.status(statusCode).json({ message });
  }
};

// @desc    Get current user
// @access  Private
const getMe = async (req, res) => {
  try {
    const result = await authService.getCurrentUser(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Get user error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error';
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  register,
  login,
  getMe
};
