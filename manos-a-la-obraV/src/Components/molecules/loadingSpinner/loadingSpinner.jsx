import React from 'react';
import './LoadingSpinner.css'; // Asegúrate de personalizar los estilos aquí

const LoadingSpinner = ({ message }) => {
    return (
      <div className="custom-loading-container">
        <div className="custom-spinner"></div>
        <p className="custom-loading-message">{message}</p>
      </div>
    );
  };

export default LoadingSpinner;
