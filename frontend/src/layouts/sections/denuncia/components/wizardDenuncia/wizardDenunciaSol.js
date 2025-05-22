import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DenunciaSolucio, SeguimentDenuncia } from "../wizardTest/components/componentsTest";
import { getSession } from "utils/session";
import { getDenunciaPorId } from "services/api";

export const WizardDenunciaSol = () => {
  const [paso, setPaso] = useState(1);
  const [estadoDenuncia, setEstadoDenuncia] = useState(null);
  const session = getSession("token");

  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        const { denuncias } = await getDenunciaPorId(session?.token);

        const estadosActivos = ["pendiente", "en_progreso", "en_observacion"];

        const activas = denuncias.filter((d) => estadosActivos.includes(d.estado?.toLowerCase()));

        if (activas.length > 0) {
          setEstadoDenuncia(activas[0].estado);
        } else {
          setEstadoDenuncia("sin denuncias activas");
        }
      } catch (error) {
        console.error("Error al cargar denuncias:", error);
        setEstadoDenuncia("error");
      }
    };

    if (session?.token) {
      cargarDenuncias();
    }
  }, [session?.token]);

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
      {paso === 2 && <SeguimentDenuncia estado={estadoDenuncia} volver={() => setPaso(1)} />}
    </Box>
  );
};
