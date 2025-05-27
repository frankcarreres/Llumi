import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { IniciSolucio, TotalSolucio } from "components/DenunciaComponents/componentsDenuncia";

export const WizardTestSol = ({ resultadoTest, setMostrarDenuncia }) => {
  const [paso, setPaso] = useState(1);

  const handleComenzar = () => {
    setPaso(2);
  };

  const volverAInici = () => {
    setPaso(1);
  };

  return (
    <Box
      p={3}
      width={{ xs: "100%", sm: "80%", md: "60%", lg: "90%" }}
      minHeight="70vh"
      mx="auto"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {/* Botón de volver, solo en paso 2 */}
      {paso === 2 && (
        <IconButton
          onClick={volverAInici}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#eee",
            "&:hover": {
              backgroundColor: "#ddd",
            },
            zIndex: 10,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 36 }} />
        </IconButton>
      )}

      {paso === 1 && <IniciSolucio onComenzar={handleComenzar} />}
      {paso === 2 && (
        <TotalSolucio resultado={resultadoTest} onDenunciaClick={() => setMostrarDenuncia(true)} />
      )}
    </Box>
  );
};

WizardTestSol.propTypes = {
  resultadoTest: PropTypes.string.isRequired,
  setMostrarDenuncia: PropTypes.func.isRequired,
};
