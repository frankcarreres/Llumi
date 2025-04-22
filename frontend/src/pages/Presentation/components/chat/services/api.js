const BASE_URL = "http://localhost:3001";

/**
 * Verifica si el email está registrado.
 */
export async function verificarEmail(email) {
  const res = await fetch(`${BASE_URL}/auth/verificar-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error("Email no encontrado");
  return res;
}

/**
 * Realiza el login con email y contraseña.
 * Devuelve { token, usuario } si es exitoso.
 */
export async function login(email, contrasena) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasena }),
  });

  if (!res.ok) throw new Error("Login fallido");
  return await res.json();
}

/**
 * Envía las respuestas del test al backend.
 */
export async function guardarTest(token, id_usuario, respuestas, resultado) {
  const res = await fetch(`${BASE_URL}/api/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id_usuario, respuestas, resultado }),
  });

  if (!res.ok) throw new Error("Error al guardar el test");
  return await res.json();
}

/**
 * Obtiene las variables almacenadas del resultado del bot.
 */
export async function obtenerVariablesTest(resultId) {
  const res = await fetch(`${BASE_URL}/typebot/result/${resultId.trim()}`);
  if (!res.ok) throw new Error("No se pudieron obtener las variables del test");
  return await res.json();
}
