import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import TaskStats from '../components/Tasks/TaskStats';
import TaskFilters from '../components/Tasks/TaskFilters';
import Notification from '../components/UI/Notification';
import { useAuth } from '../context/AuthContext';
import { getTaskEndpoint } from '../config/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false); // Start as false to prevent initial loading
  const [dataLoading, setDataLoading] = useState(false); // New state for data fetching
  const [hasFetchedData, setHasFetchedData] = useState(false); // Track if data has been fetched
  const isFetchingRef = useRef(false); // Ref to prevent multiple simultaneous fetches
  const hasAttemptedFetchRef = useRef(false); // Ref to prevent multiple fetch attempts
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const { user, isAuthenticated, loading: authLoading } = useAuth();
  
  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Fetch tasks and stats
  const fetchTasks = async (statusFilter = '') => {
    try {
      setError(null);
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await axios.get(getTaskEndpoint('BASE'), { params });
      setTasks(response.data.tasks);
      setFilteredTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(getTaskEndpoint('STATS'));
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Combined data fetching function with loading state
  const fetchAllData = async () => {
    // Prevent multiple simultaneous fetches
    if (isFetchingRef.current) {
      return;
    }
    
    try {
      isFetchingRef.current = true;
      setDataLoading(true);
      setError(null);
      
      // Fetch both tasks and stats in parallel
      const [tasksResponse, statsResponse] = await Promise.all([
        axios.get(getTaskEndpoint('BASE')),
        axios.get(getTaskEndpoint('STATS'))
      ]);
      
      // Update state directly
      setTasks(tasksResponse.data.tasks);
      setFilteredTasks(tasksResponse.data.tasks);
      setStats(statsResponse.data);
      setHasFetchedData(true);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setDataLoading(false);
      isFetchingRef.current = false;
    }
  };

  // Single consolidated data fetching effect - only one useEffect for data fetching
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Only fetch data if:
    // 1. We have a token
    // 2. We haven't fetched data yet
    // 3. We're not currently loading data
    // 4. We're not already fetching
    // 5. We haven't already attempted to fetch
    if (token && !hasFetchedData && !dataLoading && !isFetchingRef.current && !hasAttemptedFetchRef.current) {
      hasAttemptedFetchRef.current = true; // Mark that we've attempted to fetch
      fetchAllData();
    }
  }, [hasFetchedData, dataLoading]); // Only depend on these two states

  // Cleanup function to reset refs when component unmounts
  useEffect(() => {
    return () => {
      isFetchingRef.current = false;
      hasAttemptedFetchRef.current = false;
    };
  }, []);

  // Calculate stats from tasks
  const calculateStats = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter(task => task.status === 'completed').length;
    const pending = taskList.filter(task => task.status === 'pending').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      pending,
      completionRate
    };
  };

  // Update stats when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const newStats = calculateStats(tasks);
      setStats(newStats);
    }
  }, [tasks]);

  // Filter tasks based on selected filter
  useEffect(() => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filter));
    }
  }, [tasks, filter]);

  const handleAddTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(getTaskEndpoint('BASE'), taskData);
      setTasks(prev => [response.data.task, ...prev]);
      setShowForm(false);
      showNotification('Task created successfully!', 'success');
      // Stats will be automatically updated by the useEffect that watches tasks
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
      showNotification('Failed to create task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const response = await axios.put(`${getTaskEndpoint('BASE')}/${editingTask._id}`, taskData);
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? response.data.task : task
      ));
      setEditingTask(null);
      showNotification('Task updated successfully!', 'success');
      // Stats will be automatically updated by the useEffect that watches tasks
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
      showNotification('Failed to update task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${getTaskEndpoint('BASE')}/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      showNotification('Task deleted successfully!', 'success');
      // Stats will be automatically updated by the useEffect that watches tasks
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
      showNotification('Failed to delete task', 'error');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      const response = await axios.patch(`/api/tasks/${task._id}/status`, {
        status: newStatus
      });
      setTasks(prev => prev.map(t => 
        t._id === task._id ? response.data.task : t
      ));
      
      // Show appropriate success message
      const statusText = newStatus === 'completed' ? 'completed' : 'pending';
      showNotification(`Task marked as ${statusText} successfully!`, 'success');
      // Stats will be automatically updated by the useEffect that watches tasks
    } catch (error) {
      console.error('Error updating task status:', error);
      setError('Failed to update task status');
      showNotification('Failed to update task status', 'error');
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleEditTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  // Show loading while authentication is being checked or data is being fetched
  // But don't show loading if we have a token and auth is stuck
  const token = localStorage.getItem('token');
  if ((authLoading || dataLoading) && !(token && !isAuthenticated && !authLoading)) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>{authLoading ? 'Authenticating...' : 'Loading dashboard data...'}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Welcome back, {user?.username || (isAuthenticated ? 'User' : 'Loading...')}!</h1>
        <p style={{ color: '#6c757d' }}>Manage your tasks efficiently</p>
        {!hasFetchedData && (
          <button 
            onClick={() => {
              setHasFetchedData(false);
              isFetchingRef.current = false; // Reset the ref
              hasAttemptedFetchRef.current = false; // Reset the attempt ref
              fetchAllData();
            }}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Refresh Data
          </button>
        )}
      </div>

      {error && (
        <div className="error-message mb-3" style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          {error}
          <button 
            onClick={() => setError(null)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#721c24', 
              marginLeft: '10px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Data loading overlay */}
      {dataLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(2px)'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
            <span style={{ color: '#333', fontWeight: '500' }}>Loading dashboard data...</span>
          </div>
        </div>
      )}

      <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
        <TaskStats stats={stats} loading={loading} />
        <TaskFilters 
          filter={filter} 
          onFilterChange={handleFilterChange}
          taskCounts={stats}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Your Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          disabled={showForm || isSubmitting}
          style={{
            background: showForm ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: showForm || isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,123,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (!showForm && !isSubmitting) {
              e.target.style.background = '#0056b3';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,123,255,0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!showForm && !isSubmitting) {
              e.target.style.background = '#007bff';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,123,255,0.2)';
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
              {editingTask ? 'Updating...' : 'Adding...'}
            </>
          ) : showForm ? (
            'Form Open'
          ) : (
            <>
              <span style={{ fontSize: '16px' }}>+</span>
              Add New Task
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '20px' }}>
          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDeleteTask}
        onToggleStatus={handleToggleStatus}
        loading={loading}
      />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
