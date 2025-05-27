import React, { useState } from "react";
import { Typography, Box, Grid, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FormDenunciaAluVictima from "components/DenunciaComponents/formAluVictima";
import FormDenunciaAluTestigo from "components/DenunciaComponents/formAluTestigo";
import imgDenuncia from "assets/images/img-denuncia.png";
import BotoTest from "components/DenunciaComponents/botoTest";
import { guardarDenuncia } from "../../../../services/api";
import { getSession } from "../../../../utils/session";

// Definición de las opciones para el primer paso del Wizard
const optionsStep1 = [
  { label: "Víctima", icon: <ReportProblemIcon sx={{ fontSize: 70 }} /> },
  { label: "Testigo", icon: <VisibilityIcon sx={{ fontSize: 70 }} /> },
];

// Componente principal del Wizard para denuncias
function WizardDenuncia() {
  // Estado para llevar el control del paso actual y la opción seleccionada
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  // Función para manejar la selección de una opción
  const handleSelect = (label) => {
    setSelectedOption(label); // Se guarda la opción (víctima o testigo)
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedOption("");
      setStep(1);
    }
  };

  // Función asíncrona para enviar y guardar los datos de la denuncia
  const handleDenunciaRealizada = async (datos) => {
    try {
      // Función interna para guardar la denuncia mediante API
      const guardarDatosDenuncia = async () => {
        const session = getSession("token");
        const response = await guardarDenuncia(session?.token, session?.data.id_centro, datos);
        setStep(3);
        const idDenuncia = response.id_denuncia;
        console.log("Denuncia:", idDenuncia);
      };
      await guardarDatosDenuncia();
    } catch (error) {
      console.error("Error al registrar la denuncia:", error);
      alert("Hubo un error al registrar la denuncia. Inténtalo de nuevo.");
    }
  };

  const handleReturn = () => {
    navigate("/sections/denuncia/components/wizardTest");
  };

  // Función para renderizar las opciones del primer paso
  const renderOptions = (options, selected) => (
    <Grid container spacing={4} justifyContent="center">
      {options.map(({ label, icon }) => (
        <Grid item key={label} textAlign="center">
          <Paper
            elevation={3}
            onClick={() => handleSelect(label)} // Al hacer clic, se selecciona la opción
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "0.3s",
              backgroundColor: selected === label ? "#877fab" : "#c0bad0",
              "&:hover": {
                backgroundColor: "#877fab",
              },
              border: selected === label ? "2px solid #2c2645" : "2px solid transparent",
              margin: "0 auto",
            }}
          >
            {icon}
          </Paper>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            {label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      minHeight="70vh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ paddingY: 2, position: "relative" }}
    >
      {step === 2 && (
        <IconButton
          onClick={handleBack}
          sx={{
            position: "absolute",
            left: 16,
            top: 16,
            backgroundColor: "#eee",
            "&:hover": {
              backgroundColor: "#ddd",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Box mt={3} sx={{ width: "100%", maxWidth: "900px", px: 2 }}>
        {step === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: 100, mb: 4 }}>
              ¿En qué posición te encuentras?
            </Typography>
            {renderOptions(optionsStep1, selectedOption)} {/* Se renderizan las opciones */}
          </Box>
        )}

        {step === 2 && selectedOption === "Víctima" && (
          <FormDenunciaAluVictima onDenunciar={handleDenunciaRealizada} />
        )}

        {step === 2 && selectedOption === "Testigo" && (
          <FormDenunciaAluTestigo onDenunciar={handleDenunciaRealizada} />
        )}

        {step === 3 && (
          <Box
            sx={{
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 3,
            }}
          >
            <img
              src={imgDenuncia}
              alt="Confirmación"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Typography
              component="h4"
              fontSize="2rem"
              fontWeight={100}
              mb={4}
              sx={{ color: "#354667" }}
            >
              La denuncia se ha realizado correctamente
            </Typography>
            <BotoTest onClick={handleReturn}>volver</BotoTest>{" "}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default WizardDenuncia;
