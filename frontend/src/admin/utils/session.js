// src/utils/session.js
// Gestión de sesión vía cookies 👇
// Usa la librería "js-cookie" (instálala con: npm i js-cookie)

import Cookies from "js-cookie";

// Claves constantes para las cookies
const TOKEN_KEY = "token";
const CENTRO_KEY = "centro";

// Opciones base para las cookies (HTTPS & mismo sitio)
const BASE_COOKIE_OPTIONS = {
  secure: false, // sólo sobre HTTPS
  sameSite: "strict",
  path: "/", // disponible en toda la app
};

/**
 * Guarda el token JWT y el objeto centro en cookies.
 * @param {Object} payload
 * @param {boolean} remember
 * @param {number} days
 */
export function saveSession({ token }, remember = false, days = 7) {
  const opts = remember ? { ...BASE_COOKIE_OPTIONS, expires: days } : BASE_COOKIE_OPTIONS;

  Cookies.set(TOKEN_KEY, token, opts);
}

export function getSession() {
  const token = Cookies.get(TOKEN_KEY);
  if (!token) return null;

  try {
    const centroJson = Cookies.get(CENTRO_KEY);
    return {
      token,
      centro: centroJson ? JSON.parse(centroJson) : null,
    };
  } catch (err) {
    clearSession();
    return null;
  }
}

/**
 * Elimina todas las cookies de sesión.
 */
export function clearSession() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  Cookies.remove(CENTRO_KEY, { path: "/" });
}

export function isAuthenticated() {
  return Boolean(Cookies.get(TOKEN_KEY));
}

export function withAuth(headers = {}) {
  const session = getSession();
  if (!session) return headers;
  return {
    ...headers,
    Authorization: `Bearer ${session.token}`,
  };
}
