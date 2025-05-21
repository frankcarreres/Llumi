import { useState } from "react";
import { Box } from "@mui/material";
import { DenunciaSolucio, SeguimentDenuncia } from "../wizardTest/components/componentsTest";

export const WizardDenunciaSol = () => {
  const [paso, setPaso] = useState(1);

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
      {paso === 1 && <DenunciaSolucio irASeguimiento={() => setPaso(2)} />}
      {paso === 2 && <SeguimentDenuncia estado="pendiente" />}
    </Box>
  );
};
