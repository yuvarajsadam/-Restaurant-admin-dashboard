import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center" style={{ padding: '3rem' }}>
      <div className="spinner"></div>
      <p className="mt-4 text-sm text-muted">{message}</p>
    </div>
  );
};

export default Loading;
