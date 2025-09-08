import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RutaProtegida = ({ children, rolesPermitidos }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return <Navigate to="/login" />;

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <h2>No tenés permiso para acceder a esta sección</h2>;
  }

  return children;
};

export default RutaProtegida;