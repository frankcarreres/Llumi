import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pregunta1,
  Pregunta2,
  Pregunta3,
  Pregunta4,
  Pregunta5,
  Pregunta6,
  Pregunta7,
} from "./preguntasTest";
import { Inicio, Total } from "./componentsTest";

const WizardDenuncia = () => {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false);
  const [selectedPregunta1, setSelectedPregunta1] = useState("");
  const [selectedPregunta2, setSelectedPregunta2] = useState([]);
  const [selectedPregunta3, setSelectedPregunta3] = useState([]);
  const [selectedPregunta4, setSelectedPregunta4] = useState("");
  const [selectedPregunta5, setSelectedPregunta5] = useState([]);
  const [selectedPregunta6, setSelectedPregunta6] = useState("");
  const [selectedPregunta7, setSelectedPregunta7] = useState("");
  const [direction, setDirection] = useState(0); // -1 = atrás, 1 = adelante
  const [totalScore, setTotalScore] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const totalSteps = 8;
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  // Función para bloquear las flechas si no se selecciona nada
  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return selectedPregunta1 !== "";
      case 2:
        return selectedPregunta2.length > 0;
      case 3:
        return selectedPregunta3.length > 0;
      case 4:
        return selectedPregunta4 !== "";
      case 5:
        return selectedPregunta5.length > 0;
      case 6:
        return selectedPregunta6 !== "";
      case 7:
        return selectedPregunta7 !== "";
      default:
        return true;
    }
  };

  // Función para calcular el puntaje total
  const calculateTotalScore = () => {
    let score = 0;

    // Puntajes para Pregunta 1
    const pregunta1Scores = {
      p1s1: 0,
      p1s2: 1,
      p1s3: 2,
      p1s4: 2,
      p1s5: 3,
    };
    score += pregunta1Scores[selectedPregunta1] || 0;

    // Puntajes para Pregunta 2
    const pregunta2Scores = {
      p2s1: 1,
      p2s2: 1,
      p2s3: 3,
      p2s4: 2,
      p2s5: 2,
    };

    if (selectedPregunta2.length > 0) {
      let totalPregunta2 = 0;
      selectedPregunta2.forEach((item) => {
        totalPregunta2 += pregunta2Scores[item] || 0;
      });
      score += totalPregunta2 / selectedPregunta2.length;
    }

    // Puntajes para Pregunta 3
    const pregunta3Scores = {
      p3s1: 2,
      p3s2: 3,
      p3s3: 4,
      p3s4: 4,
      p3s5: 3,
    };

    if (selectedPregunta3.length > 0) {
      let totalPregunta3 = 0;
      selectedPregunta3.forEach((item) => {
        totalPregunta3 += pregunta3Scores[item] || 0;
      });
      score += totalPregunta3 / selectedPregunta3.length;
    }

    // Puntajes para Pregunta 4
    const pregunta4Scores = {
      p4s1: 4,
      p4s2: 3,
      p4s3: 2,
      p4s4: 1,
      p4s5: 0,
    };
    score += pregunta4Scores[selectedPregunta4] || 0;

    // Puntajes para Pregunta 5
    const pregunta5Scores = {
      p5s1: 3,
      p5s2: 1,
      p5s3: 2,
      p5s4: 0,
      p5s5: 3,
    };

    if (selectedPregunta5.length > 0) {
      let totalPregunta5 = 0;
      selectedPregunta5.forEach((item) => {
        totalPregunta5 += pregunta5Scores[item] || 0;
      });
      score += totalPregunta5 / selectedPregunta5.length;
    }

    // Puntajes para Pregunta 6
    const pregunta6Scores = {
      p6s1: 3,
      p6s2: 2,
      p6s3: 2,
      p6s4: 2,
      p6s5: 0,
    };
    score += pregunta6Scores[selectedPregunta6] || 0;

    // Puntajes para Pregunta 7
    const pregunta7Scores = {
      p7s1: 2,
      p7s2: 3,
      p7s3: 3,
      p7s4: 1,
      p7s5: 4,
      p7s6: 0,
    };

    if (selectedPregunta7.length > 0) {
      let totalPregunta7 = 0;
      selectedPregunta7.forEach((item) => {
        totalPregunta7 += pregunta7Scores[item] || 0;
      });
      score += totalPregunta7 / selectedPregunta7.length;
    }

    setTotalScore(score.toFixed(2));
  };

  // Usamos useEffect para recalcular el puntaje cada vez que cambian las respuestas
  useEffect(() => {
    calculateTotalScore(); // Recalcular puntaje cuando cambian las respuestas
  }, [
    selectedPregunta1,
    selectedPregunta2,
    selectedPregunta3,
    selectedPregunta4,
    selectedPregunta5,
    selectedPregunta6,
    selectedPregunta7,
  ]); // Se vuelve a calcular cuando se cambia la selección

  const next = () => {
    if (step < totalSteps) {
      setDirection(1);
      setStep((prev) => prev + 1);
      setCompletedSteps((prev) => [...prev, step]); // Marca el paso como completado
    }
  };

  const back = () => {
    setDirection(-1);
    setCompletedSteps((prev) => prev.filter((s) => s !== step)); // Elimina el paso actual de los completados
    setStep((prev) => prev - 1);
  };

  // Función para comenzar el cuestionario
  const handleComenzar = () => {
    setStarted(true); // Marcar que el cuestionario ha comenzado
    setStep(1); // Comienza en la primera pregunta
  };

  return (
    <Box
      p={3}
      width={{ xs: "100%", sm: "80%", md: "60%", lg: "90%" }}
      minHeight="60vh"
      mx="auto"
      position="relative"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" flex={1} alignItems="center" position="relative">
        {/* Botón Back: solo visible si no estás en paso 1 ni en paso final, y ya comenzó */}
        {step !== 1 && step !== totalSteps && started && (
          <Box position="absolute" left={0}>
            <IconButton onClick={back}>
              <ArrowBackIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </Box>
        )}

        <Box flex={1} px={5}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              {!started ? (
                <Inicio onComenzar={handleComenzar} />
              ) : (
                <>
                  {step === 1 && (
                    <Pregunta1 selected={selectedPregunta1} setSelected={setSelectedPregunta1} />
                  )}
                  {step === 2 && (
                    <Pregunta2 selected={selectedPregunta2} setSelected={setSelectedPregunta2} />
                  )}
                  {step === 3 && (
                    <Pregunta3 selected={selectedPregunta3} setSelected={setSelectedPregunta3} />
                  )}
                  {step === 4 && (
                    <Pregunta4 selected={selectedPregunta4} setSelected={setSelectedPregunta4} />
                  )}
                  {step === 5 && (
                    <Pregunta5 selected={selectedPregunta5} setSelected={setSelectedPregunta5} />
                  )}
                  {step === 6 && (
                    <Pregunta6 selected={selectedPregunta6} setSelected={setSelectedPregunta6} />
                  )}
                  {step === 7 && (
                    <Pregunta7 selected={selectedPregunta7} setSelected={setSelectedPregunta7} />
                  )}
                  {step === 8 && <Total totalScore={totalScore} />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* ✅ Botón Next: visible solo si no estás en paso final, y ya comenzó */}
        {step !== totalSteps && started && (
          <Box position="absolute" right={0}>
            <IconButton onClick={next} disabled={!isCurrentStepValid()}>
              <ArrowForwardIcon
                sx={{
                  fontSize: 48,
                  color: isCurrentStepValid() ? "#0d315a" : "#ccc",
                }}
              />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Indicadores de pasos */}
      {step < totalSteps && started && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={1}>
          {Array.from({ length: totalSteps }, (_, i) => {
            const dotStep = i + 1;
            const isActive = step === dotStep;
            const isCompleted = completedSteps.includes(dotStep);
            return (
              <Box
                key={dotStep}
                width={isActive || isCompleted ? 10 : 8}
                height={isActive || isCompleted ? 10 : 8}
                borderRadius="50%"
                bgcolor={isActive || isCompleted ? "#0d315a" : "#ccc"}
                transition="all 0.3s ease"
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default WizardDenuncia;
