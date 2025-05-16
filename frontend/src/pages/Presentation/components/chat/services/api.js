const BASE_URL = "http://13.216.39.33:3001";

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
export async function guardarTest(token, respuestas, resultado) {
  const res = await fetch(`${BASE_URL}/api/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ respuestas, resultado }),
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

/**
 * Envía el resultId de una denuncia para ser procesado y guardado en el backend.
 */
export async function guardarDenuncia(token, id_centro, datosDenuncia) {
  const res = await fetch(`${BASE_URL}/denuncias/typebot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id_centro, datosDenuncia }),
  });

  if (!res.ok) throw new Error("No se pudo registrar la denuncia");
  return await res.json();
}

export async function vincularDenuncia(token, idTest, idDenuncia) {
  const res = await fetch(`${BASE_URL}/api/test/${idTest}/denuncia`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id_denuncia: idDenuncia }),
  });

  if (!res.ok) throw new Error("Error al vincular la denuncia al test");
  return await res.json();
}

export async function loginCentro(id_centro, contrasena) {
  const res = await fetch(`${BASE_URL}/auth/login-centro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_centro, contrasena }),
  });

  if (!res.ok) throw new Error("Login de centro fallido");
  return await res.json();
}

export async function obtenerUsuario(token) {
  const res = await fetch(`${BASE_URL}/usuario/:id_usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Usuario no encontrado");
    throw new Error(`Error al obtener usuario: ${res.status}`);
  }

  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("Respuesta vacía al obtener usuario");
  }

  // Devolvemos el primer elemento (tu endpoint retorna un array con un solo usuario)
  return rows[0];
}

/**
 * Obtiene los tests del usuario autenticado.
 * Devuelve un array de { id_test, riesgo, fecha, id_denuncia }
 */
export async function obtenerTests(token) {
  const res = await fetch(`${BASE_URL}/api/test/usuario/:id_usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Error al obtener tests: ${res.status}`);
  }
  return await res.json();
}
