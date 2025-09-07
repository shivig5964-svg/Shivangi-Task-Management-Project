import React from 'react';

const TaskFilters = ({ filter, onFilterChange, taskCounts }) => {
  const filters = [
    { value: 'all', label: 'All Tasks', count: taskCounts?.total || 0 },
    { value: 'pending', label: 'Pending', count: taskCounts?.pending || 0 },
    { value: 'completed', label: 'Completed', count: taskCounts?.completed || 0 }
  ];

  return (
    <div className="card">
      <h3>Filter Tasks</h3>
      <div className="d-flex gap-2" style={{ flexWrap: 'wrap' }}>
        {filters.map(({ value, label, count }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`btn ${filter === value ? 'btn-primary' : 'btn-secondary'}`}
            style={{ position: 'relative' }}
          >
            {label}
            {count > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: filter === value ? '#fff' : '#007bff',
                color: filter === value ? '#007bff' : '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;
