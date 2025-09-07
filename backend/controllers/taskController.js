const taskService = require('../services/taskService');
const HTTP_STATUS = require('../constants/statusCodes');

// @desc    Get all tasks for the authenticated user
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const result = await taskService.getTasks(req.user._id, status);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Get tasks error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while fetching tasks';
    res.status(statusCode).json({ message });
  }
};

// @desc    Get a single task by ID
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const result = await taskService.getTaskById(req.params.id, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Get task error:', error);
    if (error.name === 'CastError') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid task ID' });
    }
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while fetching task';
    res.status(statusCode).json({ message });
  }
};

// @desc    Create a new task
// @access  Private
const createTask = async (req, res) => {
  try {
    const result = await taskService.createTask(req.body, req.user._id);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    console.error('Create task error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while creating task';
    res.status(statusCode).json({ message });
  }
};

// @desc    Update a task
// @access  Private
const updateTask = async (req, res) => {
  try {
    const result = await taskService.updateTask(req.params.id, req.body, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Update task error:', error);
    if (error.name === 'CastError') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid task ID' });
    }
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while updating task';
    res.status(statusCode).json({ message });
  }
};

// @desc    Update task status only
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const result = await taskService.updateTaskStatus(req.params.id, status, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Update task status error:', error);
    if (error.name === 'CastError') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid task ID' });
    }
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while updating task status';
    res.status(statusCode).json({ message });
  }
};

// @desc    Delete a task
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Delete task error:', error);
    if (error.name === 'CastError') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid task ID' });
    }
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while deleting task';
    res.status(statusCode).json({ message });
  }
};

// @desc    Get task statistics for the authenticated user
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const result = await taskService.getTaskStats(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error('Get task stats error:', error);
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.statusCode ? error.message : 'Server error while fetching task statistics';
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats
};
