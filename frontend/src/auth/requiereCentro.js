// src/auth/RequireCentro.jsx
// Guard de ruta: sólo permite paso si la sesión indica "centro"
// Uso: <RequireCentro><Dashboard /></RequireCentro>

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

/**
 * Extrae el tipo de la sesión tanto de sessionStorage como de las cookies (token).
 * Ajusta esta función según cómo guardes tu sesión.
 */
function getTipoSesion() {
  try {
    const sesion = JSON.parse(sessionStorage.getItem("sesion") || "null");
    if (sesion?.tipo) return sesion.tipo;
  } catch (_) {
    console.log("Forbbiden");
  }
  // fallback: si usas cookies para diferenciar, hazlo aquí
  if (Cookies.get("token") && Cookies.get("centro")) return "centro";
  return null;
}

// eslint-disable-next-line react/prop-types
export default function RequireCentro({ children }) {
  const location = useLocation();
  const permitido = getTipoSesion() === "centro";

  return permitido ? children : <Navigate to="/" replace state={{ from: location }} />;
}
