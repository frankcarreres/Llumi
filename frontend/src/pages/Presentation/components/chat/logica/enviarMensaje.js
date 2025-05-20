import {
  verificarEmail,
  login,
  guardarTest,
  obtenerVariablesTest,
  guardarDenuncia,
  vincularDenuncia,
} from "../services/api";
import { calcularNivelRiesgo } from "../utils/calculoRiesgo";
import { sendMessageToBot } from "../services/typebotAPI";
import { saveSession } from "admin/utils/session";

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
  idTestRef,
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
      const { token, usuario } = await login(email, texto);

      // 2) Preparamos los datos de sesión idénticos a SignInBasic
      const sessionData = {
        ...usuario,
        rol: "usuario",
      };

      // 3) Guardamos con tu util: cookie  almacenamiento interno
      saveSession({ token, data: sessionData }, true);

      // 4) Actualizamos estado local
      setToken(token);
      setUsuario(usuario);
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
          console.table("🧩 Variables obtenidas para TEST:", variables);
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

              const { id_test } = await guardarTest(token, respuestasTest, nivel);
              idTestRef.current = id_test;
              setTestEnviado(true);
            }
          }
        } catch (err) {
          console.error("❌ Error al guardar el test:", err);
        }
      }
      const esFinalDeDenuncia = textoPlano
        .toLowerCase()
        .includes("gracias por realizar la denuncia");

      if (esFinalDeDenuncia && resultId) {
        try {
          const variables = await obtenerVariablesTest(resultId);
          console.table("🧩 Variables obtenidas para DENUNCIA:", variables);
          const respuestas = variables.respuestas || [];
          if (variables) {
            const datosDenuncia = {
              tipo_acoso: respuestas.tipo_acoso || "otros",
              descripcion: respuestas.descripcion || "",
              evidencias: respuestas.evidencias || null,
              es_testigo: respuestas.es_testigo || "",
              nombre_victima: respuestas.nombre_victima || null,
              relacion_victima: respuestas.relacion_victima || null,
              nombre_acosador: respuestas.nombre_acosador || null,
              testigos: respuestas.testigos || null,
              nombre_testigo_extra: respuestas.nombre_testigo_extra || null,
              intervencion_docente: respuestas.intervencion_docente || null,
              nombre_docente: respuestas.nombre_docente || null,
            };

            let estado = {
              esperandoNombreTestigoExtra: false,
              esperandoNombreDocente: false,
            };
            const SI = ["sí", "si"];
            let esTestigo = false;
            let flujo = "es_testigo";

            let inicioDenuncia = 0;

            // Detectar si hizo el test antes de denunciar
            if (respuestas[0]?.content?.toLowerCase().includes("test autoevaluación")) {
              inicioDenuncia = 9; // Saltamos las 9 respuestas del test
            } else {
              inicioDenuncia = 1; // Empieza directamente con la denuncia
            }

            for (let i = inicioDenuncia; i < respuestas.length; i++) {
              const respuestaActual = respuestas[i];
              const texto = respuestaActual.content?.trim().toLowerCase() || "";

              if (estado.esperandoNombreTestigoExtra) {
                datosDenuncia.nombre_testigo_extra = texto !== "no" ? respuestaActual.content : "";
                estado.esperandoNombreTestigoExtra = false;
                continue;
              }

              if (estado.esperandoNombreDocente) {
                datosDenuncia.nombre_docente = texto !== "no" ? respuestaActual.content : "";
                estado.esperandoNombreDocente = false;
                continue;
              }

              switch (flujo) {
                case "es_testigo":
                  datosDenuncia.es_testigo = texto;
                  esTestigo = SI.includes(texto);
                  flujo = "descripcion";
                  break;

                case "descripcion":
                  datosDenuncia.descripcion = respuestaActual.content;
                  flujo = "tipo_acoso";
                  break;

                case "tipo_acoso":
                  datosDenuncia.tipo_acoso = respuestaActual.content;
                  flujo = "nombre_victima_o_acosador";
                  break;

                case "nombre_victima_o_acosador":
                  if (esTestigo) {
                    datosDenuncia.nombre_victima = respuestaActual.content;
                    flujo = "relacion_victima";
                  } else {
                    datosDenuncia.nombre_acosador = respuestaActual.content;
                    flujo = "testigos";
                  }
                  break;

                case "relacion_victima":
                  datosDenuncia.relacion_victima = respuestaActual.content;
                  flujo = "intervencion_docente";
                  break;

                case "testigos":
                  datosDenuncia.testigos = texto;
                  if (SI.includes(texto)) {
                    estado.esperandoNombreTestigoExtra = true;
                  }
                  flujo = "intervencion_docente";
                  break;

                case "intervencion_docente":
                  datosDenuncia.intervencion_docente = texto;
                  if (SI.includes(texto)) {
                    estado.esperandoNombreDocente = true;
                  }
                  flujo = "fin";
                  break;

                case "fin":
                  // Nada más que hacer
                  break;
              }
            }

            console.log("🚀 Enviando denuncia con:");
            console.log("  🔑 token:", token);
            console.log("  👤 id_usuario:", usuario?.id_usuario);
            console.log("  🏫 id_centro:", usuario?.id_centro);
            console.log("  📦 datosDenuncia:", datosDenuncia);

            const { id_denuncia } = await guardarDenuncia(token, usuario.id_centro, datosDenuncia);
            console.log("📄 Denuncia guardada correctamente");
            console.log(id_denuncia);

            await vincularDenuncia(token, idTestRef.current, id_denuncia);
            idTestRef.current = null;
          }
        } catch (err) {
          console.error("❌ Error al guardar la denuncia:", err);
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
