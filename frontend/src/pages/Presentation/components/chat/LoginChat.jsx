import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import BurbujaMensaje from "./BurbujasMensaje";
import useAutoScroll from "../../hooks/useAutoScroll";

function LoginChat({ onNext, mensajes, enviarMensaje }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const esEmailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleEmailSubmit = async () => {
    if (!esEmailValido(email)) {
      enviarMensaje("El correo no tiene un formato válido.", "bot");

      return;
    }

    const res = await fetch("http://localhost:3001/auth/verificar-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      enviarMensaje(email, "user");
      enviarMensaje("Este correo no está registrado.", "bot");
      setEmail("");
      return;
    }
    enviarMensaje(email, "user");
    enviarMensaje("¿Cuál es tu contraseña?", "bot");
    setStep(2);
  };
  const bottomRef = useAutoScroll(mensajes);
  const handlePasswordSubmit = async () => {
    if (!password) return;
    enviarMensaje("********", "user");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena: password }),
      });

      if (!res.ok) throw new Error("Login incorrecto");

      const data = await res.json();

      // Espera un poco antes de pasar al siguiente componente
      setTimeout(() => {
        onNext("saludo", {
          email,
          jwt: data.token,
          nombre: data.usuario.nombre,
          curso: data.usuario.curso,
          centro: data.usuario.centro,
        });
      }, 500);
    } catch (err) {
      enviarMensaje("Contraseña incorrecta.", "bot");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box maxHeight="300px" overflow="auto">
        {mensajes.map((m, i) => (
          <BurbujaMensaje key={i} texto={m.texto} autor={m.autor} />
        ))}
        <div ref={bottomRef} />
      </Box>

      {step === 1 && (
        <>
          <TextField
            placeholder="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEmailSubmit();
            }}
            variant="outlined"
          />
          <Button variant="contained" onClick={handleEmailSubmit}>
            Enviar
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            placeholder="Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePasswordSubmit();
            }}
            variant="outlined"
          />
          <Button variant="contained" onClick={handlePasswordSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </>
      )}
    </Box>
  );
}

LoginChat.propTypes = {
  onNext: PropTypes.func.isRequired,
  mensajes: PropTypes.array.isRequired,
  enviarMensaje: PropTypes.func.isRequired,
};

export default LoginChat;
