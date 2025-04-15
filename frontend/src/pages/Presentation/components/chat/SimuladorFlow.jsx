import { useEffect, useRef, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { startConversation, sendMessageToBot } from "./services/typebotAPI";
import BurbujaMensaje from "./BurbujasMensaje";
import OptionAnimada from "./animaciones/OpcionAnimada";
import TypingIndicator from "./animaciones/TypingIndicator";

function SimuladorFlujo() {
  const [faseLogin, setFaseLogin] = useState("email"); // email | password | hecho
  const [email, setEmail] = useState("");
  const [, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [opcionesActivas, setOpcionesActivas] = useState([]);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [escribiendo, setEscribiendo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const scrollRef = useRef(null);

  const esperar = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes, escribiendo]);

  useEffect(() => {
    if (mensajes.length === 0) {
      setTimeout(() => {
        agregarMensaje("bot", "Hola 👋 ¿Cuál es tu correo electrónico?");
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (token) iniciarFlujo();
  }, [token]);

  const agregarMensaje = (autor, texto) => {
    setMensajes((prev) => [...prev, { autor, texto }]);
  };

  const iniciarFlujo = async () => {
    agregarMensaje("bot", `¡Hola, ${usuario?.nombre}!`);
    await esperar(1000);

    const res = await startConversation();
    if (!res?.sessionId) return;

    setSessionId(res.sessionId);

    const nuevos = res.messages
      .filter((msg) => msg.type === "text")
      .map((msg) => ({
        autor: "bot",
        texto: msg.content.richText.map((p) => p.children.map((c) => c.text).join("")).join("\n\n"),
      }));

    setMensajes((prev) => [...prev, ...nuevos]);

    if (res.input?.items) {
      const multiple = res.input?.options?.isMultipleChoice || false;
      setIsMultipleChoice(multiple);
      setOpcionesActivas([]);

      await esperar(1000);

      const opciones = res.input.items.map((item) => ({
        autor: "bot",
        tipo: "opcion",
        texto: item.content,
      }));

      setMensajes((prev) => prev.filter((m) => m.tipo !== "opcion").concat(opciones));
    }
  };

  const enviarMensaje = async (msg) => {
    const texto = msg || input;
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

    if (esLogin && faseLogin === "email") {
      const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
      if (!esValido) {
        await esperar(500);
        agregarMensaje("bot", "El formato del correo no es válido. Intenta de nuevo.");
        return;
      }

      setCargando(true);
      setEmail(texto);

      try {
        const res = await fetch("http://localhost:3001/auth/verificar-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: texto }),
        });

        if (!res.ok) throw new Error();

        await esperar(500);
        setFaseLogin("password");
        agregarMensaje("bot", "¿Cuál es tu contraseña?");
      } catch {
        agregarMensaje("bot", "Ese correo no está registrado. Intenta de nuevo.");
      } finally {
        setCargando(false);
      }

      return;
    }

    if (esLogin && faseLogin === "password") {
      setCargando(true);
      setPassword(texto);

      try {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, contrasena: texto }),
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setToken(data.token);
        setUsuario(data.usuario);
        setFaseLogin("hecho");
      } catch {
        agregarMensaje("bot", "Contraseña incorrecta. Intenta otra vez.");
      } finally {
        setCargando(false);
      }

      return;
    }

    // 🔄 Flujo normal del chatbot
    if (!sessionId) return;

    await esperar(1000);

    const data = await sendMessageToBot(sessionId, texto);

    for (const msg of data.messages || []) {
      if (msg.type === "text" && msg.content?.type === "richText") {
        const texto = msg.content.richText
          .map((p) => p.children.map((c) => c.text).join(""))
          .join("\n\n");

        setEscribiendo(true);
        await esperar(1200);
        setEscribiendo(false);

        setMensajes((prev) => [...prev, { autor: "bot", texto }]);
        await esperar(1000);
      }
    }

    if (data.input?.type === "choice input" && data.input.items) {
      const multiple = data.input?.options?.isMultipleChoice || false;
      setIsMultipleChoice(multiple);
      setOpcionesActivas([]);

      await esperar(800);

      const opciones = data.input.items.map((item) => ({
        autor: "bot",
        tipo: "opcion",
        texto: item.content,
      }));

      setMensajes((prev) => prev.filter((m) => m.tipo !== "opcion").concat(opciones));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
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
                  onClick={() => {
                    if (isMultipleChoice) {
                      setOpcionesActivas((prev) =>
                        prev.includes(m.texto)
                          ? prev.filter((o) => o !== m.texto)
                          : [...prev, m.texto]
                      );
                    } else {
                      enviarMensaje(m.texto);
                    }
                  }}
                  selected={opcionesActivas.includes(m.texto)}
                />
              ))}
          </Box>
        )}
      </Box>

      {/* Input */}
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
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
          type={faseLogin === "password" && !token ? "password" : "text"}
          variant="outlined"
          disabled={cargando}
          InputProps={{
            sx: {
              borderRadius: "20px",
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ccc",
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => enviarMensaje()}
          disabled={
            cargando || (!input.trim() && !(isMultipleChoice && opcionesActivas.length > 0))
          }
          sx={{
            background: "#FF9E4C",
            color: "#fff",
            borderRadius: "20px",
            px: 3,
            "&:hover": {
              background: "rgba(221, 90, 27, 0.9)",
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
