const Task = require('../models/Task');
const HTTP_STATUS = require('../constants/statusCodes');
const { TASK_STATUS } = require('../constants/taskStatus');

// Get all tasks for a user
const getTasks = async (userId, status) => {
  const filter = { user: userId };
  
  // Add status filter if provided
  if (status && Object.values(TASK_STATUS).includes(status)) {
    filter.status = status;
  }

  const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .select('-__v');

  return {
    tasks,
    count: tasks.length
  };
};

// Get a single task by ID
const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId
  });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return { task };
};

// Create a new task
const createTask = async (taskData, userId) => {
  const { title, description, status } = taskData;

  const task = new Task({
    title,
    description: description || '',
    status: status || TASK_STATUS.PENDING,
    user: userId
  });

  await task.save();

  return {
    message: 'Task created successfully',
    task
  };
};

// Update a task
const updateTask = async (taskId, taskData, userId) => {
  const { title, description, status } = taskData;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    {
      title,
      description: description || '',
      status: status || TASK_STATUS.PENDING,
      updatedAt: new Date()
    },
    { new: true, runValidators: true }
  );

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return {
    message: 'Task updated successfully',
    task
  };
};

// Update task status only
const updateTaskStatus = async (taskId, status, userId) => {
  if (!status || !Object.values(TASK_STATUS).includes(status)) {
    const error = new Error('Status must be either pending or completed');
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw error;
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    { status, updatedAt: new Date() },
    { new: true }
  );

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return {
    message: 'Task status updated successfully',
    task
  };
};

// Delete a task
const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId
  });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return { message: 'Task deleted successfully' };
};

// Get task statistics
const getTaskStats = async (userId) => {
  const totalTasks = await Task.countDocuments({ user: userId });
  const completedTasks = await Task.countDocuments({ 
    user: userId, 
    status: TASK_STATUS.COMPLETED 
  });
  const pendingTasks = await Task.countDocuments({ 
    user: userId, 
    status: TASK_STATUS.PENDING 
  });

  return {
    total: totalTasks,
    completed: completedTasks,
    pending: pendingTasks,
    completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  };
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
