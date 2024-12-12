import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza el componente hijo (el contenido protegido)
  return children; /*El return children en React es una forma de "composición de componentes"
                    En otras palabras, el valor de children es todo lo que se encuentra entre 
                    las etiquetas de apertura y cierre del componente padre.*/
}
