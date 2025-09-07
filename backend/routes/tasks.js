const express = require('express');
const auth = require('../middleware/auth');
const { validateTask } = require('../middleware/validation');
const taskController = require('../controllers/taskController');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get('/', auth, taskController.getTasks);

// @route   GET /api/tasks/stats/summary
// @desc    Get task statistics for the authenticated user
// @access  Private
router.get('/stats/summary', auth, taskController.getTaskStats);

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
// @access  Private
router.get('/:id', auth, taskController.getTaskById);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, validateTask, taskController.createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, validateTask, taskController.updateTask);

// @route   PATCH /api/tasks/:id/status
// @desc    Update task status only
// @access  Private
router.patch('/:id/status', auth, taskController.updateTaskStatus);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
