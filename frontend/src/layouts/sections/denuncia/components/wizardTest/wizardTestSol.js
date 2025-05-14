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
