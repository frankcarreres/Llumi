import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import BotoTest from "./botoTest";
import BotoDenuncia from "./botoDenuncia";

export const Total = ({ totalScore, onDenunciaClick }) => {
  const score = parseFloat(totalScore);
  const handleDenunciar = () => {
    if (onDenunciaClick) onDenunciaClick(); // Llamamos a la función del padre
  };
  let titulo = "";
  let mensaje = "";
  let color = "";

  if (score <= 10) {
    titulo = "Sense risc";
    mensaje =
      "Ara com ara no es detecten senyals de risc. T'animem a continuar informant-te sobre l'assetjament escolar i a estar pendent de tu i dels qui t'envolten.";
    color = "#4CAF50";
  } else if (score <= 13) {
    titulo = "Situació de risc mitjà";
    mensaje =
      "Podries estar enfrontant algunes situacions que mereixen atenció. Parla amb un professor o una persona adulta de confiança. No estàs només/a, i és important expressar com et sents per a evitar que les coses empitjoren.";
    color = "#FFC107";
  } else if (score <= 16) {
    titulo = "Situació greu";
    mensaje =
      "Estàs mostrant senyals clars d'estar travessant una situació difícil. No ho enfrontes en silenci. Parla amb algú de confiança i busca secunde. És important que revisem el cas.";
    color = "#FF9800";
  } else if (score <= 19) {
    titulo = "Situació molt greu";
    mensaje =
      "La teua situació és seriosa i necessita ser atesa amb urgència. Denuncia-la. És fonamental que busques ajuda immediatament. Acudix a una persona adulta de confiança, un professor, un orientador...";
    color = "#F44336";
  } else {
    titulo = "Situació crítica";
    mensaje =
      "Estàs en una situació crítica. No esperes més, busca ajuda urgent. Comunica el que estàs vivint a algú de confiança i denúncia la situació immediatament.";
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
            Denúncia
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
      titulo = "Sense risc";
      mensaje =
        "Ara com ara no es detecten senyals de risc. T'animem a continuar informant-te sobre l'assetjament escolar i a estar pendent de tu i dels qui t'envolten.";
      color = "#4CAF50";
      break;
    case "Riesgo medio":
      titulo = "Situació de risc mitjà";
      mensaje =
        "Podries estar enfrontant algunes situacions que mereixen atenció. Parla amb un professor o una persona adulta de confiança. No estàs només/a, i és important expressar com et sents per a evitar que les coses empitjoren.";
      color = "#FFC107";
      break;
    case "Riesgo alto":
      titulo = "Situació greu";
      mensaje =
        "Estàs mostrant senyals clars d'estar travessant una situació difícil. No ho enfrontes en silenci. Parla amb algú de confiança i busca secunde. És important que revisem el cas.";
      color = "#FF9800";
      break;
    case "Riesgo muy alto":
      titulo = "Situació molt greu";
      mensaje =
        "La teua situació és seriosa i necessita ser atesa amb urgència. Denuncia-la. És fonamental que busques ajuda immediatament. Acudix a una persona adulta de confiança, un professor, un orientador...";
      color = "#F44336";
      break;
    case "Riesgo crítico":
      titulo = "Situació crítica";
      mensaje =
        "Estàs en una situació crítica. No esperes més, busca ajuda urgent. Comunica el que estàs vivint a algú de confiança i denúncia la situació immediatament.";
      color = "#c20000";
      break;
    default:
      titulo = "Resultat no disponible :(";
      mensaje = "No s'ha pogut determinar el teu resultat.";
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
            Denúncia
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
    <Typography variant="h4" fontWeight={300} mb={8}>
      Realitza el següent test per a ajudar-nos a conéixer el teu cas
    </Typography>
    <Box mt={4}>
      <BotoTest onClick={onComenzar}>Començar</BotoTest>
    </Box>
  </Box>
);

Inicio.propTypes = {
  onComenzar: PropTypes.func.isRequired,
};

export const IniciSolucio = ({ onComenzar }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h4" fontWeight={300} mb={8}>
        Ja has realitzat un test. Comprova els resultats...{" "}
      </Typography>
      <Box mt={4}>
        <BotoTest onClick={onComenzar}>Veure resultats</BotoTest>
      </Box>
    </Box>
  );
};

IniciSolucio.propTypes = {
  onComenzar: PropTypes.func.isRequired,
};
