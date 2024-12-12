import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../molecules/loginComponents/loginForm';
import LoginMessage from '../molecules/loginComponents/loginMessage';
import { loginUser } from '../../utils/login';
import '../molecules/loginComponents/login.css';

export default function Login() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const data = await loginUser(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userID', data.user._id);
      setMessage('Usuario y contraseña validos.');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage(error.message);  // Mostrar el mensaje de error si ocurre
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <p className="login-description">Ingresa tu ususario  y contraseña</p>
        <LoginForm onSubmit={handleLogin} />
        <LoginMessage message={message} />
      </div>
    </div>
  );
}
