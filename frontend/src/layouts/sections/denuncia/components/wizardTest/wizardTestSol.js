import { useState } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { IniciSolucio, TotalSolucio } from "./components/componentsTest";

export const WizardTestSol = ({ resultadoTest, setMostrarDenuncia }) => {
  const [paso, setPaso] = useState(1);

  const handleComenzar = () => {
    setPaso(2);
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
