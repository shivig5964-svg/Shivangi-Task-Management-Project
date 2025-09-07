import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit(formData);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '20px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: task ? '#ffc107' : '#007bff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px'
        }}>
          <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
            {task ? '✏️' : '+'}
          </span>
        </div>
        <h3 style={{ margin: 0, color: '#333', fontSize: '20px' }}>
          {task ? 'Edit Task' : 'Add New Task'}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#333',
            fontSize: '14px'
          }}>
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.title ? '#dc3545' : '#e9ecef'}`,
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              background: '#fff'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.title ? '#dc3545' : '#007bff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.title ? '#dc3545' : '#e9ecef';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Enter a descriptive task title"
            maxLength="100"
          />
          {errors.title && (
            <div style={{
              color: '#dc3545',
              fontSize: '12px',
              marginTop: '4px',
              fontWeight: '500'
            }}>
              {errors.title}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#333',
            fontSize: '14px'
          }}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.description ? '#dc3545' : '#e9ecef'}`,
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              background: '#fff',
              resize: 'vertical',
              minHeight: '80px'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.description ? '#dc3545' : '#007bff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.description ? '#dc3545' : '#e9ecef';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="Add a detailed description (optional)"
            rows="3"
            maxLength="500"
          />
          {errors.description && (
            <div style={{
              color: '#dc3545',
              fontSize: '12px',
              marginTop: '4px',
              fontWeight: '500'
            }}>
              {errors.description}
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '4px'
          }}>
            <small style={{ color: '#6c757d', fontSize: '12px' }}>
              {formData.description.length}/500 characters
            </small>
            <small style={{ color: '#6c757d', fontSize: '12px' }}>
              Optional field
            </small>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="status" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#333',
            fontSize: '14px'
          }}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              background: '#fff',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#007bff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e9ecef';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="pending">🟡 Pending</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{
                padding: '12px 24px',
                border: '2px solid #6c757d',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                background: 'white',
                color: '#6c757d',
                transition: 'all 0.2s ease',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = '#6c757d';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = 'white';
                  e.target.style.color = '#6c757d';
                }
              }}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              background: isSubmitting ? '#6c757d' : '#007bff',
              color: 'white',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#0056b3';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#007bff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 123, 255, 0.2)';
              }
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                {task ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                <span>{task ? '✏️' : '+'}</span>
                {task ? 'Update Task' : 'Add Task'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
