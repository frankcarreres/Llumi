import { verificarEmail, login, guardarTest, obtenerVariablesTest } from "../services/api";
import { calcularNivelRiesgo } from "../utils/calculoRiesgo";
import { sendMessageToBot } from "../services/typebotAPI";

const esperar = (ms) => new Promise((res) => setTimeout(res, ms));

export async function enviarMensaje({
  input,
  isMultipleChoice,
  opcionesActivas,
  setMensajes,
  setInput,
  setOpcionesActivas,
  setIsMultipleChoice,
  faseLogin,
  setFaseLogin,
  token,
  setToken,
  email,
  setEmail,
  setPassword,
  setUsuario,
  setCargando,
  sessionId,
  resultId,
  usuario,
  preguntasMostradas,
  setPreguntasMostradas,
  setPuntuacionFinal,
  setNivelRiesgo,
  testEnviado,
  setTestEnviado,
  setEscribiendo,
}) {
  const texto =
    input || (isMultipleChoice && opcionesActivas.length > 0 ? opcionesActivas.join(", ") : "");

  if (!texto) return;

  const esLogin = !token;

  setMensajes((prev) =>
    prev
      .filter((m) => m.tipo !== "opcion")
      .concat({
        autor: "user",
        texto: faseLogin === "password" ? "********" : texto,
      })
  );

  setInput("");
  setOpcionesActivas([]);
  setIsMultipleChoice(false);

  // Login: Email
  if (esLogin && faseLogin === "email") {
    const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
    if (!esValido) {
      await esperar(500);
      setMensajes((prev) => [
        ...prev,
        { autor: "bot", texto: "El formato del correo no es válido. Intenta de nuevo." },
      ]);
      return;
    }

    setCargando(true);
    setEmail(texto);

    try {
      await verificarEmail(texto);
      await esperar(500);
      setFaseLogin("password");
      setMensajes((prev) => [...prev, { autor: "bot", texto: "¿Cuál es tu contraseña?" }]);
    } catch {
      setMensajes((prev) => [
        ...prev,
        { autor: "bot", texto: "Ese correo no está registrado. Intenta de nuevo." },
      ]);
    } finally {
      setCargando(false);
    }

    return;
  }

  // Login: Password
  if (esLogin && faseLogin === "password") {
    setCargando(true);
    setPassword(texto);

    try {
      const data = await login(email, texto);
      setToken(data.token);
      setUsuario(data.usuario);
      setFaseLogin("hecho");
    } catch {
      setMensajes((prev) => [
        ...prev,
        { autor: "bot", texto: "Contraseña incorrecta. Intenta otra vez." },
      ]);
    } finally {
      setCargando(false);
    }

    return;
  }

  // Envío normal de mensaje
  if (!sessionId) return;

  await esperar(1000);
  // ✅ Esto llama directamente a Typebot
  const data = await sendMessageToBot(sessionId, texto);

  for (const msg of data.messages || []) {
    if (msg.type === "text" && msg.content?.type === "richText") {
      const textoPlano = msg.content.richText
        .map((p) => p.children.map((c) => c.text).join(""))
        .join("\n")
        .trim();

      setEscribiendo(true);
      await esperar(1200);
      setEscribiendo(false);
      setMensajes((prev) => [...prev, { autor: "bot", texto: textoPlano }]);
      await esperar(1000);

      const esFinalDeTest = textoPlano.toLowerCase().includes("gracias por responder al test");

      if (esFinalDeTest && !testEnviado && resultId) {
        try {
          const variables = await obtenerVariablesTest(resultId);
          if (variables && typeof variables.score !== "undefined") {
            const puntuacion = parseInt(variables.score);
            if (!isNaN(puntuacion)) {
              const nivel = calcularNivelRiesgo(puntuacion);
              setPuntuacionFinal(puntuacion);
              setNivelRiesgo(nivel);

              const respuestasTest = {};
              preguntasMostradas.forEach((pregunta, index) => {
                const respuesta = variables.respuestas[index + 1]?.content || "Sin respuesta";
                respuestasTest[pregunta] = respuesta;
              });

              await guardarTest(token, usuario.id_usuario, respuestasTest, nivel);
              setTestEnviado(true);
            }
          }
        } catch (err) {
          console.error("❌ Error al guardar el test:", err);
        }
      }

      if (!esFinalDeTest && textoPlano.startsWith("¿") && textoPlano.trim().endsWith("?")) {
        setPreguntasMostradas((prev) => [...prev, textoPlano]);
      }
    }
  }

  // Mostrar nuevas opciones si las hay
  if (data.input?.type === "choice input" && data.input.items) {
    const multiple = data.input?.options?.isMultipleChoice || false;
    setIsMultipleChoice(multiple);
    setOpcionesActivas([]);

    const opciones = data.input.items.map((item) => ({
      autor: "bot",
      tipo: "opcion",
      texto: item.content,
    }));

    setMensajes((prev) => prev.filter((m) => m.tipo !== "opcion").concat(opciones));
  }
}
