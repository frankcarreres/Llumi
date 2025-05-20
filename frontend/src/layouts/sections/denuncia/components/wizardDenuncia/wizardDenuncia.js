import React, { useState } from "react";
import { Typography, Box, Grid, Paper, IconButton } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormDenunciaAluVictima from "./components/formAluVictima";
import FormDenunciaAluTestigo from "./components/formAluTestigo"; // Importamos el formulario para testigos

const optionsStep1 = [
  { label: "Alumno", icon: <SchoolIcon sx={{ fontSize: 70 }} /> },
  { label: "Docente", icon: <PersonIcon sx={{ fontSize: 70 }} /> },
  { label: "Tutor", icon: <SupervisorAccountIcon sx={{ fontSize: 70 }} /> },
];

const optionsStep2 = [
  { label: "Víctima", icon: <ReportProblemIcon sx={{ fontSize: 70 }} /> },
  { label: "Testigo", icon: <VisibilityIcon sx={{ fontSize: 70 }} /> },
];

function WizardDenuncia() {
  const [step, setStep] = useState(1);
  const [selectedStep1, setSelectedStep1] = useState("");
  const [selectedStep2, setSelectedStep2] = useState("");

  const handleSelect = (label) => {
    if (step === 1) {
      setSelectedStep1(label);
      if (label === "Tutor") {
        setStep(3);
      } else {
        setStep(2);
      }
    } else {
      setSelectedStep2(label);
      setStep(3);
    }
  };

  const renderOptions = (options, selected) => (
    <Grid container spacing={4} justifyContent="center">
      {options.map(({ label, icon }) => (
        <Grid item key={label} textAlign="center">
          <Paper
            elevation={3}
            onClick={() => handleSelect(label)}
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
      position="relative"
      sx={{ paddingY: 2 }}
    >
      {step === 2 && (
        <IconButton
          onClick={() => setStep(1)}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#eee",
            "&:hover": {
              backgroundColor: "#ddd",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Box
        mt={3}
        sx={{
          width: "100%",
          maxWidth: "900px",
          px: 2,
        }}
      >
        {step === 1 || step === 2 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
              textAlign: "center", // centrado horizontal del texto
            }}
          >
            <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: 100, mb: 4 }}>
              {step === 1 ? "¿Qué eres?" : "¿En qué posición te encuentras?"}
            </Typography>
            {step === 1
              ? renderOptions(optionsStep1, selectedStep1)
              : renderOptions(optionsStep2, selectedStep2)}
          </Box>
        ) : selectedStep1 === "Alumno" && selectedStep2 === "Víctima" ? (
          <FormDenunciaAluVictima />
        ) : selectedStep1 === "Alumno" && selectedStep2 === "Testigo" ? (
          <FormDenunciaAluTestigo />
        ) : (
          <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
            {selectedStep1} {selectedStep2}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default WizardDenuncia;
