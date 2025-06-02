import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  DenunciaSolucio,
  SeguimentDenuncia,
} from "components/DenunciaComponents/componentsDenuncia";
import { getSession } from "../../../../utils/session";
import { getDenunciaPorId } from "../../../../services/api";

// Definición del componente funcional para el Wizard de Denuncia de Solución
export const WizardDenunciaSol = () => {
  const [paso, setPaso] = useState(1);
  const [estadoDenuncia, setEstadoDenuncia] = useState(null);
  const session = getSession("token");

  // Hook useEffect para cargar denuncias al iniciar el componente o cuando el token de la sesión cambie
  useEffect(() => {
    // Función asíncrona para cargar denuncias desde el servicio API
    const cargarDenuncias = async () => {
      try {
        const { denuncias } = await getDenunciaPorId(session?.token);
        const estadosActivos = ["pendiente", "en_progreso", "en_observacion"];
        const activas = denuncias.filter((d) => estadosActivos.includes(d.estado?.toLowerCase()));

        // Si existen denuncias activas, se actualiza el estado de la denuncia con el primero encontrado
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

    // Se llama a la función cargarDenuncias solo si existe un token en la sesión
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
