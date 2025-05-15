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
    <Box>
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
