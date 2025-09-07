import React from 'react';

const TaskStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const { total, completed, pending, completionRate } = stats;

  return (
    <div className="card">
      <h3>Task Statistics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {total}
          </div>
          <div style={{ color: '#6c757d' }}>Total Tasks</div>
        </div>
        
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {completed}
          </div>
          <div style={{ color: '#6c757d' }}>Completed</div>
        </div>
        
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
            {pending}
          </div>
          <div style={{ color: '#6c757d' }}>Pending</div>
        </div>
        
        <div className="text-center">
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>
            {completionRate}%
          </div>
          <div style={{ color: '#6c757d' }}>Completion Rate</div>
        </div>
      </div>
      
      {total > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            background: '#e9ecef', 
            borderRadius: '10px', 
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
              height: '100%',
              width: `${completionRate}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
