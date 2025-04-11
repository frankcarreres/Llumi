// components/SaludoChat.jsx
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import BurbujaMensaje from "./BurbujasMensaje";
import useAutoScroll from "../../hooks/useAutoScroll";

function SaludoChat({ data, mensajes, enviarMensaje, onNext }) {
  const { nombre, curso, centro } = data;
  const bottomRef = useAutoScroll(mensajes);
  useEffect(() => {
    enviarMensaje(`¡Perfecto, ${nombre}! Ya has iniciado sesión en ${curso} del ${centro}.`);

    setTimeout(() => {
      enviarMensaje("¿Qué quieres hacer ahora?");
    }, 1500);
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box maxHeight="300px" overflow="auto">
        {mensajes.map((m, i) => (
          <BurbujaMensaje key={i} texto={m.texto} autor={m.autor} />
        ))}
        <div ref={bottomRef} />
      </Box>

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={() => onNext("test")}>
          Hacer test
        </Button>
        <Button variant="outlined" onClick={() => onNext("recursos")}>
          Ver recursos
        </Button>
      </Box>
    </Box>
  );
}

SaludoChat.propTypes = {
  data: PropTypes.object.isRequired,
  mensajes: PropTypes.array.isRequired,
  enviarMensaje: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default SaludoChat;
