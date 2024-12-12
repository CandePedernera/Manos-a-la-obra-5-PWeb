import React, { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Ejecuta la función onSubmit desde el componente padre
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-inputs">
        <input
          placeholder="Usuario"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
        />
        <input
          placeholder="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />
      </div>
      <button type="submit" className="login-button">
        confirmar
      </button>
    </form>
  );
}
