import React from 'react';
import '../styles/common.css';

const Loader = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
