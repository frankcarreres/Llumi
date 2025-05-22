// src/auth/RequireCentro.jsx
// Guard de ruta: sólo permite paso si la sesión indica "centro"
// Uso: <RequireCentro><Dashboard /></RequireCentro>

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "utils/session";

// eslint-disable-next-line react/prop-types
export default function RequireCentro({ children }) {
  const location = useLocation();
  const session = getSession();
  const permitido = session.data.rol === "centro";

  return permitido ? children : <Navigate to="/" replace state={{ from: location }} />;
}
