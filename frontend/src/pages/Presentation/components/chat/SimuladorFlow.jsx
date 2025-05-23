import { useEffect, useRef, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";

import TypingIndicator from "components/ChatComponents/TypingIndicator";

import { enviarMensaje } from "./logica/enviarMensaje";
import { iniciarFlujo } from "./logica/iniciarFlujo";
import { getSession } from "utils/session";
import { getDenunciaPorId, obtenerTests } from "services/api";
import { useNavigate } from "react-router-dom";
import { getHistory, getSessionId, saveHistory, saveSessionId } from "utils/chatStorage";
import OptionAnimada from "components/ChatComponents/OpcionAnimada";
import BurbujaMensaje from "components/ChatComponents/BurbujasMensaje";

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
  const navigate = useNavigate();
  const SALUDO = "Hola 👋 ¿Cuál es tu correo electrónico?";
  const session = getSession("token");
  const esLoginWeb = session?.data?.loginWeb === true;
  const [faseDenuncia, setFaseDenuncia] = useState(false);

  const [, setPuntuacionFinal] = useState(null);
  const [, setNivelRiesgo] = useState(null);
  const [testEnviado, setTestEnviado] = useState(false);
  const [preguntasMostradas, setPreguntasMostradas] = useState([]);
  const idTestRef = useRef(null);
  const scrollRef = useRef(null);
  const hayOpciones = mensajes.some((m) => m.tipo === "opcion");
  const inputDisabled = cargando || hayOpciones || (sessionId && !testEnviado && !faseDenuncia);
  // valores: `null` = ningún test; número = id de test a reanudar
  // valores: "null" | "pending" | "observation"
  // 3) Bloqueo para el <Button>
  const buttonDisabled =
    cargando ||
    (sessionId && !testEnviado && !faseDenuncia && !hayOpciones) ||
    (isMultipleChoice && opcionesActivas.length === 0) ||
    (!isMultipleChoice && !input.trim());

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes, escribiendo]);

  useEffect(() => {
    // Si ya había cookie/session almacenada, restauramos token y usuario
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
    if (!token || sessionId != null) return;

    const init = async () => {
      try {
        // 1) Cargo todos los tests
        const allTests = await obtenerTests(token);

        // 2) Encuentro el primero con Denuncia
        const vinculado = allTests.find((t) => t.Denuncia != null);
        const localTestId = vinculado?.id_test ?? null;
        const localHasTest = Boolean(vinculado);
        let localStatus = "none";

        // 3) Si existe Denuncia, voy a buscar su estado
        if (vinculado?.Denuncia) {
          const { denuncias } = await getDenunciaPorId(token);
          const encontrada = denuncias.find((d) => d.id_denuncia === vinculado.Denuncia);
          localStatus = encontrada?.estado ?? "none";
        }

        // 4) Actualizo tu state (si lo necesitas en render)

        // 5) **Y ahora sí**, inicio el flujo
        await iniciarFlujo({
          usuario,
          setMensajes,
          setSessionId,
          setResultId,
          setIsMultipleChoice,
          setOpcionesActivas,
          variables: {
            testId: localTestId,
            hasTest: localHasTest,
            denunciaStatus: localStatus,
          },
        });
      } catch (err) {
        console.error("Error inicializando flujo:", err);
      }
    };

    init();
  }, [token]);

  useEffect(() => {
    if (!esLoginWeb) return;
    // Eliminamos sólo el mensaje exacto del saludo por defecto
    const filtrados = mensajes.filter((m) => !(m.autor === "bot" && m.texto === SALUDO));
    if (filtrados.length !== mensajes.length) {
      setMensajes(filtrados);
    }
  }, [mensajes, esLoginWeb]);

  useEffect(() => {
    saveHistory(mensajes);
  }, [mensajes]);

  // 4. Cada vez que 'sessionId' cambie, persisto la sesión
  useEffect(() => {
    if (sessionId) saveSessionId(sessionId);
  }, [sessionId]);

  const manejarEnvio = (msg = null) => {
    const texto = (msg ?? input).trim();
    if (texto.toLowerCase() === "denunciar") {
      setFaseDenuncia(true);
    }
    if (texto.toLowerCase() === "recursos") {
      // antes de navegar, guarda el mensaje en el historial
      setMensajes((prev) => {
        const newState = [...prev, { autor: "user", texto }];
        saveHistory(newState);
        return newState;
      });
      // redirige a la página de recursos
      navigate("/sections/recursos/inici");
      return;
    }
    void enviarMensaje({
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
      setFaseDenuncia,
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
          disabled={inputDisabled}
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
          disabled={buttonDisabled}
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
