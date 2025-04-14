import { useEffect, useRef, useState } from "react";
import { startConversation, sendMessageToBot } from "./services/typebotAPI";
import BurbujaMensaje from "./BurbujasMensaje";
import OptionAnimada from "./animaciones/OpcionAnimada";
import TypingIndicator from "./animaciones/TypingIndicator";
import { Box, TextField, Button } from "@mui/material";

function SimuladorFlujo() {
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [opcionesActivas, setOpcionesActivas] = useState([]);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [escribiendo, setEscribiendo] = useState(false);
  const scrollRef = useRef(null);

  const esperar = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const init = async () => {
      const res = await startConversation();
      if (!res?.sessionId) return;

      setSessionId(res.sessionId);

      const nuevos = res.messages
        .filter((msg) => msg.type === "text")
        .map((msg) => ({
          autor: "bot",
          texto: msg.content.richText
            .map((p) => p.children.map((c) => c.text).join(""))
            .join("\n\n"),
        }));

      setMensajes(nuevos);

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

    init();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes, escribiendo]);

  const enviarMensaje = async (msg) => {
    const texto = msg || input;
    if (!texto || !sessionId) return;

    setMensajes((prev) => prev.filter((m) => m.tipo !== "opcion").concat({ autor: "user", texto }));
    setInput("");
    setOpcionesActivas([]);
    setIsMultipleChoice(false);

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
                  sx={{
                    color: "#4b4945",
                  }}
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
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
          variant="outlined"
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
          onClick={() => {
            if (input.trim()) {
              enviarMensaje();
            } else if (isMultipleChoice && opcionesActivas.length > 0) {
              enviarMensaje(opcionesActivas.join(", "));
            }
          }}
          disabled={!input.trim() && !(isMultipleChoice && opcionesActivas.length > 0)}
          disableElevation
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
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

export default SimuladorFlujo;
