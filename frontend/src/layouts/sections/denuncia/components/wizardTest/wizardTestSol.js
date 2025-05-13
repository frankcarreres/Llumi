import { useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BotoDenuncia from "./components/botoDenuncia";
import TestSolucioInici from "./components/componentsTest";

export const WizardTestSol = ({ resultadoTest }) => {
  const [paso, setPaso] = useState(1);
  const navigate = useNavigate();

  const handleComenzar = () => {
    setPaso(2); // Cambia al paso 2 donde se mostrará el resultado
  };

  const renderResultado = (resultado) => {
    let titulo = "";
    let mensaje = "";
    let color = "";

    switch (resultado) {
      case "Sin riesgo":
        titulo = "Sin riesgo";
        mensaje =
          "Ahora mismo no se detectan señales de riesgo. Te animamos a seguir informándote sobre el acoso escolar y a estar pendiente de ti y de quienes te rodean.";
        color = "#4CAF50";
        break;
      case "Riesgo medio":
        titulo = "Situación de riesgo medio";
        mensaje =
          "Podrías estar enfrentando algunas situaciones que merecen atención. Habla con un profesor o una persona adulta de confianza. No estás solo/a, y es importante expresar cómo te sientes para evitar que las cosas empeoren.";
        color = "#FFC107";
        break;
      case "Riesgo alto":
        titulo = "Situación grave";
        mensaje =
          "Estás mostrando señales claras de estar atravesando una situación difícil. No lo enfrentes en silencio. Habla con alguien de confianza y busca apoyo. Es importante que revisemos tu caso.";
        color = "#FF9800";
        break;
      case "Riesgo muy alto":
        titulo = "Situación muy grave";
        mensaje =
          "Tu situación es seria y necesita ser atendida con urgencia. Denúncialo. Es fundamental que busques ayuda inmediatamente. Acude a una persona adulta de confianza, un profesor, un orientador...";
        color = "#F44336";
        break;
      case "Riesgo crítico":
        titulo = "Situación crítica";
        mensaje =
          "Estás en una situación crítica. No esperes más, busca ayuda urgente. Comunica lo que estás viviendo a alguien de confianza y denuncia la situación inmediatamente.";
        color = "#c20000";
        break;
      default:
        titulo = "Resultado no disponible";
        mensaje = "No se ha podido determinar tu resultado.";
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

        {["Riesgo alto", "Riesgo muy alto", "Riesgo crítico"].includes(resultadoTest) && (
          <Box mt={4}>
            <BotoDenuncia onClick={() => navigate("/wizardDenuncia")} color={color}>
              Denunciar
            </BotoDenuncia>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {paso === 1 && <TestSolucioInici onComenzar={handleComenzar} />} {/* Paso 1 */}
      {paso === 2 && renderResultado(resultadoTest)} {/* Usamos el resultado directamente */}
    </Box>
  );
};

WizardTestSol.propTypes = {
  resultadoTest: PropTypes.string.isRequired,
};
