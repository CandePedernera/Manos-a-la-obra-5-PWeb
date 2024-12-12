import React from 'react';

export default function LoginMessage({ message }) {
  if (!message) return null;

  const isSuccess = message.includes('exitoso');
  return (
    <p className={`login-message ${isSuccess ? 'success' : 'error'}`}>
      {message}
    </p>
  );
}
