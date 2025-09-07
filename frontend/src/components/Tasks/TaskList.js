import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center" style={{ padding: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
        <h3>No tasks found</h3>
        <p style={{ color: '#6c757d' }}>
          {tasks === null ? 'Loading...' : 'Create your first task to get started!'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
