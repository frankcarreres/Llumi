import { useEffect, useRef, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";

import BurbujaMensaje from "./componenetes/BurbujasMensaje";
import OptionAnimada from "./componenetes/OpcionAnimada";
import TypingIndicator from "./componenetes/TypingIndicator";

import { enviarMensaje } from "./logica/enviarMensaje";
import { iniciarFlujo } from "./logica/iniciarFlujo";
import { getSession } from "admin/utils/session";
import { obtenerTests } from "pages/Presentation/components/chat/services/api";
import { getHistory, saveHistory, getSessionId, saveSessionId } from "./utils/chatStorage";

function SimuladorFlujo() {
  const [faseLogin, setFaseLogin] = useState("email");
  const [email, setEmail] = useState("");
  const [, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const [mensajes, setMensajes] = useState(() => getHistory());
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(() => getSessionId());
  const [resultId, setResultId] = useState(null);
  const [opcionesActivas, setOpcionesActivas] = useState([]);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [escribiendo, setEscribiendo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tests, setTests] = useState(null);

  const [, setPuntuacionFinal] = useState(null);
  const [, setNivelRiesgo] = useState(null);
  const [testEnviado, setTestEnviado] = useState(false);
  const [preguntasMostradas, setPreguntasMostradas] = useState([]);
  const idTestRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes, escribiendo]);

  useEffect(() => {
    // Si ya había cookie/session almacenada, restauramos token y usuario
    const session = getSession("token");
    if (session?.token && session?.data) {
      setToken(session.token);
      setUsuario(session.data);
      // Marcamos login como “hecho” para pasar directamente al chat/test
      setFaseLogin("hecho");
    }
  }, []);

  useEffect(() => {
    if (mensajes.length === 0) {
      const session = getSession("token");
      let mensajeInicial = "Hola 👋 ¿Cuál es tu correo electrónico?";

      if (session?.token && session?.data) {
        try {
          mensajeInicial = `Hola, ${session.data.nombre} 👋`;
          setToken(session?.token); // activará iniciarFlujo automáticamente
        } catch (err) {
          console.error("Error al leer datos de la sesión:", err);
        }
      }

      setTimeout(() => {
        setMensajes([{ autor: "bot", texto: mensajeInicial }]);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    // 1) Cargo los tests
    obtenerTests(token)
      .then((t) => {
        setTests(t);
        return t; // para la siguiente fase
      })
      .catch((err) => {
        console.error("Error al cargar tests:", err);
        setMensajes([{ autor: "bot", texto: "Error comprobando tu test. Inténtalo más tarde." }]);
        // Si quieres, aún llamas al flujo sin flags:
        setTests([]);
      });
  }, [token]);

  useEffect(() => {
    if (tests === null) return; // Aún no hemos cargado nada
    if (sessionId) return;

    // 2) Una vez tengo tests, calculo flags y arranco el chat
    const hasTest = Array.isArray(tests) && tests.length > 0;
    const hasDenuncia = hasTest && Boolean(tests[0].Denuncia);

    iniciarFlujo({
      usuario,
      setMensajes,
      setSessionId,
      setResultId,
      setIsMultipleChoice,
      setOpcionesActivas,
      variables: { hasTest, hasDenuncia },
    });
  }, [tests, sessionId]);

  useEffect(() => {
    saveHistory(mensajes);
  }, [mensajes]);

  // 4. Cada vez que 'sessionId' cambie, persisto la sesión
  useEffect(() => {
    if (sessionId) saveSessionId(sessionId);
  }, [sessionId]);

  const manejarEnvio = (msg = null) => {
    enviarMensaje({
      input: msg ?? input,
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
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        mx: "auto",
        my: 4,
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "#f9f9fb",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mensajes.map(
          (m, i) =>
            m.tipo !== "opcion" && <BurbujaMensaje key={i} texto={m.texto} autor={m.autor} />
        )}

        {escribiendo && <TypingIndicator />}

        {mensajes.some((m) => m.tipo === "opcion") && (
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} mt={1}>
            {mensajes
              .filter((m) => m.tipo === "opcion")
              .map((m, i) => (
                <OptionAnimada
                  key={i}
                  texto={m.texto}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    if (isMultipleChoice) {
                      setOpcionesActivas((prev) =>
                        prev.includes(m.texto)
                          ? prev.filter((o) => o !== m.texto)
                          : [...prev, m.texto]
                      );
                    } else {
                      manejarEnvio(m.texto);
                    }
                  }}
                  selected={opcionesActivas.includes(m.texto)}
                />
              ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <TextField
          fullWidth
          placeholder="Escribe tu respuesta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && manejarEnvio()}
          type={faseLogin === "password" && !token ? "password" : "text"}
          variant="outlined"
          disabled={
            cargando || (sessionId && !testEnviado) // 👈 desactiva mientras el test está en curso
          }
          InputProps={{
            sx: {
              borderRadius: "20px",
              backgroundColor: "#f5f5f5",
              "&.MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #ccc",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #f08636",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #f08636",
                },
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => manejarEnvio()}
          disabled={
            cargando || (!input.trim() && !(isMultipleChoice && opcionesActivas.length > 0))
          }
          sx={{
            background: "#ea8917",
            color: "#fff",
            borderRadius: "20px",
            px: 3,
            "&:hover": {
              background: "rgba(234, 129, 0, 1.0)",
            },
          }}
        >
          {cargando ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Enviar"}
        </Button>
      </Box>
    </Box>
  );
}

export default SimuladorFlujo;
