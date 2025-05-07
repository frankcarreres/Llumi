import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import BotoTest from "./botoTest";
import BotoDenuncia from "./botoDenuncia";

export const Total = ({ totalScore }) => {
  const score = parseFloat(totalScore);
  let titulo = "";
  let mensaje = "";
  let color = "";

  if (score <= 10) {
    titulo = "Sin riesgo";
    mensaje =
      "Por ahora no se detectan señales de riesgo. Te animamos a seguir informándote sobre el acoso escolar y a estar pendiente de ti y de quienes te rodean.";
    color = "#4CAF50";
  } else if (score <= 13) {
    titulo = "Situación de riesgo medio";
    mensaje =
      "Podrías estar enfrentando algunas situaciones que merecen atención. Habla con un profesor o una persona adulta de confianza. No estás solo/a, y es importante expresar cómo te sientes para evitar que las cosas empeoren.";
    color = "#FFC107";
  } else if (score <= 16) {
    titulo = "Situación grave";
    mensaje =
      "Estás mostrando señales claras de estar atravesando una situación difícil. No lo enfrentes en silencio. Habla con alguien de confianza y busca apoyo. Es importante que revisemos el caso.";
    color = "#FF9800";
  } else if (score <= 19) {
    titulo = "Situación muy grave";
    mensaje =
      "Tu situación es seria y necesita ser atendida con urgencia. Denúnciala. Es fundamental que busques ayuda de inmediato. Acude a una persona adulta de confianza, un profesor, un orientador...";
    color = "#F44336";
  } else {
    titulo = "Situación crítica";
    mensaje =
      "Estás en una situación crítica. No esperes más, busca ayuda urgente. Comunica lo que estás viviendo a alguien de confianza y denuncia la situación de inmediato.";
    color = "#c20000";
  }

  const handleDenunciar = () => {
    alert("Redirigiendo al formulario de denuncia...");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      py={6}
    >
      <Typography variant="h2" sx={{ color, mb: 4 }}>
        {" "}
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
            Denúncia
          </BotoDenuncia>
        </Box>
      )}
    </Box>
  );
};

Total.propTypes = {
  totalScore: PropTypes.string.isRequired,
};

export const Inicio = ({ onComenzar }) => (
  <Box textAlign="center">
    <Typography variant="h4" fontWeight={300} mb={4}>
      Realiza el siguiente test para ayudarnos a conocer tu caso
    </Typography>
    <Box mt={4}>
      <BotoTest onClick={onComenzar}>Comenzar</BotoTest>
    </Box>
  </Box>
);

Inicio.propTypes = {
  onComenzar: PropTypes.func.isRequired,
};
