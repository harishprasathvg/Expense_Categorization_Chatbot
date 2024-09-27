import React from 'react';
import './LoadingScreen.css'; // Import CSS file for loading screen styling

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
