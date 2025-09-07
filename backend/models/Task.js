const mongoose = require('mongoose');
const { TASK_STATUS, TASK_STATUS_VALUES } = require('../constants/taskStatus');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: TASK_STATUS_VALUES,
    default: TASK_STATUS.PENDING
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
taskSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Task', taskSchema);
