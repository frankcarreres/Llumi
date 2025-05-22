// src/utils/session.js
// Gestión de sesión vía cookies (usa js-cookie)
import Cookies from "js-cookie";

// Claves constantes
const TOKEN_KEY = "token";
const DATA_KEY = "data";

// Opciones comunes a todas las cookies
const BASE_COOKIE_OPTIONS = {
  secure: false, // ponlo en true en producción https
  sameSite: "strict",
  path: "/",
};

/**
 * Guarda el JWT y los datos (usuario|centro) en cookies.
 * @param {{token:string, data:object}} payload
 * @param {boolean} remember  Si es true la cookie persiste `days` días.
 * @param {number}  days      Número de días para la expiración.
 */
export function saveSession({ token, data }, remember = false, days = 7) {
  if (!token) return;
  const opts = remember ? { ...BASE_COOKIE_OPTIONS, expires: days } : BASE_COOKIE_OPTIONS;

  Cookies.set(TOKEN_KEY, token, opts);
  if (data) {
    Cookies.set(DATA_KEY, JSON.stringify(data), opts);
  }
}

/**
 * Devuelve el objeto de sesión o `null` si no existe.
 */
export function getSession() {
  const token = Cookies.get(TOKEN_KEY);
  if (!token) return null;

  try {
    const raw = Cookies.get(DATA_KEY);
    return { token, data: raw ? JSON.parse(raw) : null };
  } catch (e) {
    return null;
  }
}

/**
 * Determina si la sesión es de tipo Centro (rol "centro").
 */
export function isCentro() {
  const data = getSession()?.data;
  return Boolean(data) && data.rol === "centro";
}

/**
 * Determina si la sesión es de tipo Usuario (rol distinto a "centro").
 */
export function isUsuario() {
  const data = getSession()?.data;
  return Boolean(data) && data.rol !== "centro";
}

/**
 * Elimina las cookies de sesión.
 * No realiza navegación; el llamador debe manejar redirección.
 */
export function clearSession() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  Cookies.remove(DATA_KEY, { path: "/" });
}
