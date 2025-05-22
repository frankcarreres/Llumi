import { Box, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import BotoTest from "./botoTest";
import BotoDenuncia from "./botoDenuncia";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const steps = ["pendiente", "en_progreso", "en_observacion", "resuelta"];

const colors = {
  pendiente: "#f1c40f",
  en_progreso: "#2980b9",
  en_observacion: "#1B5883",
  resuelta: "#27ae60",
  gris: "#ccc",
};

export const Total = ({ totalScore, onDenunciaClick }) => {
  const score = parseFloat(totalScore);
  const handleDenunciar = () => {
    if (onDenunciaClick) onDenunciaClick(); // Llamamos a la función del padre
  };

  let titulo = "";
  let mensaje = "";
  let color = "";

  if (score <= 10) {
    titulo = "Sin riesgo";
    mensaje =
      "Por ahora no se detectan señales de riesgo. Te animamos a continuar informándote sobre el acoso escolar y a estar pendiente de tú y de quienes te rodean.";
    color = "#4CAF50";
  } else if (score <= 13) {
    titulo = "Situación de riesgo medio";
    mensaje =
      "Podrías estar enfrentando algunas situaciones que merecen atención. Parla con un profesor o una persona adulta de confianza. No estás solo/en, y es importante expresar como te sientes para evitar que las cosas empeoran.";
    color = "#FFC107";
  } else if (score <= 16) {
    titulo = "Situación grave";
    mensaje =
      "Estás mostrando señales claras de estar atravesando una situación difícil. No lo enfrentas en silencio. Parla con alguien de confianza y busca secundo. Es importante que revisemos el caso.";
    color = "#FF9800";
  } else if (score <= 19) {
    titulo = "Situación muy grave";
    mensaje =
      "Tu situación es seria y necesita ser atendida con urgencia. Denúnciala. Es fundamental que busques ayuda inmediatamente. Acude a una persona adulta de confianza, un profesor, un orientador...";
    color = "#F44336";
  } else {
    titulo = "Situación crítica";
    mensaje =
      "Estás en una situación crítica. No esperas más, busca ayuda urgente. Comunica el que estás viviendo en alguien de confianza y denuncia la situación inmediatamente.";
    color = "#c20000";
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      py={6}
    >
      <Typography variant="h2" sx={{ color, mb: 4 }}>
        {titulo}
      </Typography>

      <Box maxWidth="500px" textAlign="center">
        <Typography variant="body1" fontSize="1.5rem" fontWeight={250}>
          {mensaje}
        </Typography>
      </Box>

      {score > 13 && (
        <Box mt={4}>
          <BotoDenuncia onClick={handleDenunciar} color={color}>
            Denuncia
          </BotoDenuncia>
        </Box>
      )}
    </Box>
  );
};

Total.propTypes = {
  totalScore: PropTypes.string.isRequired,
  onDenunciaClick: PropTypes.func,
};

export const TotalSolucio = ({ resultado, onDenunciaClick }) => {
  const handleDenunciar = () => {
    if (onDenunciaClick) onDenunciaClick(); // Llamamos a la función del padre
  };

  let titulo = "";
  let mensaje = "";
  let color = "";

  switch (resultado) {
    case "Sin riesgo":
      titulo = "Sin riesgo";
      mensaje =
        "Por ahora no se detectan señales de riesgo. Te animamos a continuar informándote sobre el acoso escolar y a estar pendiente de tú y de quienes te rodean.";
      color = "#4CAF50";
      break;
    case "Riesgo medio":
      titulo = "Situación de riesgo medio";
      mensaje =
        "Podrías estar enfrentando algunas situaciones que merecen atención. Parla con un profesor o una persona adulta de confianza. No estás solo/en, y es importante expresar como te sientes para evitar que las cosas empeoran.";
      color = "#FFC107";
      break;
    case "Riesgo alto":
      titulo = "Situación grave";
      mensaje =
        "Estás mostrando señales claras de estar atravesando una situación difícil. No lo enfrentas en silencio. Parla con alguien de confianza y busca secundo. Es importante que revisemos el caso.";
      color = "#FF9800";
      break;
    case "Riesgo muy alto":
      titulo = "Situación muy grave";
      mensaje =
        "Tu situación es seria y necesita ser atendida con urgencia. Denúnciala. Es fundamental que busques ayuda inmediatamente. Acude a una persona adulta de confianza, un profesor, un orientador...";
      color = "#F44336";
      break;
    case "Riesgo crítico":
      titulo = "Situación crítica";
      mensaje =
        "Estás en una situación crítica. No esperas más, busca ayuda urgente. Comunica el que estás viviendo en alguien de confianza y denuncia la situación inmediatamente.";
      color = "#c20000";
      break;
    default:
      titulo = "Resultado no disponible :(";
      mensaje = "No se ha podido determinar el resultado.";
      color = "#9E9E9E";
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      py={6}
    >
      <Typography variant="h2" sx={{ color, mb: 4 }}>
        {titulo}
      </Typography>

      <Box maxWidth="500px" textAlign="center">
        <Typography variant="body1" fontSize="1.5rem" fontWeight={250}>
          {mensaje}
        </Typography>
      </Box>

      {["Riesgo alto", "Riesgo muy alto", "Riesgo crítico"].includes(resultado) && (
        <Box mt={4}>
          <BotoDenuncia onClick={handleDenunciar} color={color}>
            Denuncia
          </BotoDenuncia>
        </Box>
      )}
    </Box>
  );
};

TotalSolucio.propTypes = {
  resultado: PropTypes.string.isRequired,
  onDenunciaClick: PropTypes.func,
};

export const Inicio = ({ onComenzar }) => (
  <Box textAlign="center">
    <Typography component="h4" fontSize="2rem" fontWeight={100} mb={4} sx={{ color: "#354667" }}>
      Realiza el siguiente test para ayudarnos a conocer tu caso
    </Typography>
    <Box mt={4}>
      <BotoTest onClick={onComenzar}>Empezar</BotoTest>
    </Box>
  </Box>
);

Inicio.propTypes = {
  onComenzar: PropTypes.func.isRequired,
};

export const IniciSolucio = ({ onComenzar }) => {
  return (
    <Box textAlign="center">
      <Typography component="h4" fontSize="2rem" fontWeight={100} mb={4} sx={{ color: "#354667" }}>
        Ya has realizado un test. Comprueba tus resultados...{" "}
      </Typography>
      <Box mt={4}>
        <BotoTest onClick={onComenzar}>Ver resultados</BotoTest>
      </Box>
    </Box>
  );
};

IniciSolucio.propTypes = {
  onComenzar: PropTypes.func.isRequired,
};

export const DenunciaSolucio = ({ irASeguimiento }) => {
  return (
    <Box textAlign="center">
      <Typography component="h4" fontSize="2rem" fontWeight={100} mb={4} sx={{ color: "#354667" }}>
        Tienes una denuncia activa en estos momentos...
      </Typography>
      <Box mt={4}>
        <BotoTest onClick={irASeguimiento}>Ver seguimiento</BotoTest>
      </Box>
    </Box>
  );
};

DenunciaSolucio.propTypes = {
  irASeguimiento: PropTypes.func.isRequired,
};

export const SeguimentDenuncia = ({ estado, volver }) => {
  const currentStep = steps.indexOf(estado);
  const estadosBonitos = {
    pendiente: "Pendiente",
    en_progreso: "En proceso",
    en_observacion: "En observación",
    resuelta: "Resuelta",
    rechazada: "Rechazada",
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Botón de volver flotante a la izquierda */}
      <IconButton
        onClick={volver}
        sx={{
          position: "absolute",
          left: 32, // ajústalo según lo que necesites
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#eee",
          "&:hover": {
            backgroundColor: "#ddd",
          },
          zIndex: 10,
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 48 }} />
      </IconButton>

      {/* Contenedor blanco centrado */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          position: "relative",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "32px 24px",
        }}
      >
        <Typography
          component="h4"
          fontSize="2rem"
          fontWeight={100}
          sx={{
            color: "#354667",
            textAlign: "center",
          }}
        >
          Seguimento del estado de la denúncia
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: colors[estado] || "#666",
            textAlign: "center",
            mb: 8,
          }}
        >
          Estado actual: {estadosBonitos[estado] || estado}
        </Typography>

        {/* Barra de seguimiento */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%", gap: 1 }}
        >
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const pointColor = isActive ? colors[estado] : colors.gris;
            const lineColor = index < currentStep ? colors[estado] : colors.gris;

            return (
              <React.Fragment key={step}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: pointColor,
                    border: `2px solid ${pointColor}`,
                    zIndex: 2,
                    position: "relative",
                  }}
                />
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      height: 4,
                      flexGrow: 1,
                      backgroundColor: lineColor,
                      mx: 0.5,
                      borderRadius: 2,
                      zIndex: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

SeguimentDenuncia.propTypes = {
  estado: PropTypes.string.isRequired,
  volver: PropTypes.func.isRequired,
};
