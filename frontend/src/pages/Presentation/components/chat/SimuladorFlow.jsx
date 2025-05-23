import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";

import TypingIndicator from "components/ChatComponents/TypingIndicator";

import { enviarMensaje } from "./logica/enviarMensaje";
import { iniciarFlujo } from "./logica/iniciarFlujo";
import { getSession } from "utils/session";
import { getDenunciaPorId, obtenerTests } from "services/api";
import { useNavigate } from "react-router-dom";
import { getHistory, getSessionId, saveHistory, saveSessionId } from "utils/chatStorage";
import OptionAnimada from "components/ChatComponents/OpcionAnimada";
import BurbujaMensaje from "components/ChatComponents/BurbujasMensaje";
import SendIcon from "@mui/icons-material/Send";
import Mkbox from "components/MKBox";

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
        const allTests = await obtenerTests(token);
        const vivos = allTests.filter(
          (t) => !t.Denuncia || !["resuelta", "rechazada"].includes(t.Denuncia.estado)
        );

        // Calcula todo en variables locales
        const localHasTest = vivos.length > 0;
        const reusable = vivos.find((t) => !t.Denuncia) || null;
        const localTestId = reusable?.id_test ?? null;

        let localStatus = "none";
        const vinculado = vivos.find((t) => t.Denuncia) || null;
        if (vinculado) {
          const idDenuncia = vinculado.Denuncia.id_denuncia ?? vinculado.Denuncia;
          const { denuncias } = await getDenunciaPorId(token);
          const encontrada = denuncias.find((d) => d.id_denuncia === idDenuncia);
          localStatus = encontrada?.estado ?? "none";
        }
        // Y arranca el flujo con *estos* valores, no con los estados
        await iniciarFlujo({
          usuario,
          setMensajes,
          setSessionId,
          setResultId,
          setIsMultipleChoice,
          setOpcionesActivas,
          variables: {
            hasTest: localHasTest,
            testId: localTestId,
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
    <Mkbox
      sx={{
        width: "100%",
        maxWidth: "1400px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        mx: "auto",
        my: 4,
      }}
    >
      <Mkbox
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        {mensajes.map(
          (m, i) =>
            m.tipo !== "opcion" && <BurbujaMensaje key={i} texto={m.texto} autor={m.autor} />
        )}

        {escribiendo && <TypingIndicator />}

        {mensajes.some((m) => m.tipo === "opcion") && (
          <Mkbox display="flex" flexDirection="column" alignItems="flex-start" gap={1} mt={1}>
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
          </Mkbox>
        )}
      </Mkbox>

      <Mkbox
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          backgroundColor: "transparent",
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
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline, &:after": {
                  borderColor: "none",
                },
                borderColor: "none",
                transform: "scale(1.008)",
              },
              boxShadow: "none",
              borderRadius: "15px",
            },
            "& input": {
              zIndex: 1,
              border: "none",
              outline: "none",
              borderRadius: "15px",
              bgcolor: "rgba(224,227,228,255)",
              boxShadow: "inset 2px 5px 10px rgba(0,0,0,0.3)",
              transition: "300ms ease-in-out",
              "&:focus": {
                bgcolor: "#fff",
                transform: "scale(1.005)",
              },
            },
          }}
        />
        <Mkbox></Mkbox>
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
          {cargando ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : <SendIcon />}
        </Button>
      </Mkbox>
    </Mkbox>
  );
}

export default SimuladorFlujo;
