import React, { useState } from 'react';
import ConfirmationModal from '../UI/ConfirmationModal';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(task._id);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    return status === 'completed' ? 'btn-success' : 'btn-warning';
  };

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completed' : 'Pending';
  };

  return (
    <div 
      style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '16px',
        borderLeft: `4px solid ${task.status === 'completed' ? '#28a745' : '#ffc107'}`,
        opacity: task.status === 'completed' ? 0.9 : 1,
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        gap: '16px'
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '8px',
            flexWrap: 'wrap'
          }}>
            <h4 style={{ 
              margin: 0, 
              fontSize: '18px',
              fontWeight: '600',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              color: task.status === 'completed' ? '#6c757d' : '#333',
              lineHeight: '1.3'
            }}>
              {task.title}
            </h4>
            <span style={{
              background: task.status === 'completed' ? '#28a745' : '#ffc107',
              color: task.status === 'completed' ? 'white' : '#333',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {getStatusText(task.status)}
            </span>
          </div>
          
          {task.description && (
            <p style={{ 
              margin: '0 0 12px 0',
              color: task.status === 'completed' ? '#6c757d' : '#666',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {task.description}
            </p>
          )}
          
          <div style={{ 
            fontSize: '12px', 
            color: '#6c757d',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <span>📅 Created: {formatDate(task.createdAt)}</span>
            {task.updatedAt !== task.createdAt && (
              <span>🔄 Updated: {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '8px',
          alignItems: 'flex-start'
        }}>
          {/* Toggle Status Button */}
          <button
            onClick={() => onToggleStatus(task)}
            title={task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid #e9ecef',
              background: task.status === 'completed' ? '#fff3cd' : '#d4edda',
              color: task.status === 'completed' ? '#856404' : '#155724',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = task.status === 'completed' ? '#ffc107' : '#28a745';
              e.target.style.color = task.status === 'completed' ? '#333' : 'white';
              e.target.style.borderColor = task.status === 'completed' ? '#ffc107' : '#28a745';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = task.status === 'completed' ? '#fff3cd' : '#d4edda';
              e.target.style.color = task.status === 'completed' ? '#856404' : '#155724';
              e.target.style.borderColor = '#e9ecef';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            {task.status === 'completed' ? (
              <span title="Mark as Pending">⏳</span>
            ) : (
              <span title="Mark as Completed">✓</span>
            )}
          </button>
          
          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            title="Edit Task"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid #e9ecef',
              background: '#e7f3ff',
              color: '#0056b3',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#007bff';
              e.target.style.color = 'white';
              e.target.style.borderColor = '#007bff';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 2px 6px rgba(0,123,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#e7f3ff';
              e.target.style.color = '#0056b3';
              e.target.style.borderColor = '#e9ecef';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            ✏️
          </button>
          
          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            title="Delete Task"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid #e9ecef',
              background: '#f8d7da',
              color: '#721c24',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#dc3545';
              e.target.style.color = 'white';
              e.target.style.borderColor = '#dc3545';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 2px 6px rgba(220,53,69,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f8d7da';
              e.target.style.color = '#721c24';
              e.target.style.borderColor = '#e9ecef';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default TaskItem;
