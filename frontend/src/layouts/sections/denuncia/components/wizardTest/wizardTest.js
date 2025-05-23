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
} from "./components/preguntasTest";
import { Inicio, Total } from "components/componentsDenuncia";
import { calcularNivelRiesgo } from "utils/calculoRiesgo";
import { guardarTest } from "services/api";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const WizardTest = ({ setMostrarDenuncia }) => {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false);
  const [selectedPregunta1, setSelectedPregunta1] = useState("");
  const [selectedPregunta2, setSelectedPregunta2] = useState([]);
  const [selectedPregunta3, setSelectedPregunta3] = useState([]);
  const [selectedPregunta4, setSelectedPregunta4] = useState("");
  const [selectedPregunta5, setSelectedPregunta5] = useState([]);
  const [selectedPregunta6, setSelectedPregunta6] = useState("");
  const [selectedPregunta7, setSelectedPregunta7] = useState([]);
  const [nivelRiesgo, setNivelRiesgo] = useState(null);
  const [direction, setDirection] = useState(0); // -1 = atrás, 1 = adelante
  const [totalScore, setTotalScore] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const totalSteps = 8;
  const [setIdTest] = useState(null);

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

  const opcionesPregunta1 = [
    { value: "p1s1", label: "No lo sé / No lo recuerdo" },
    { value: "p1s2", label: "De repente" },
    { value: "p1s3", label: "Al principio fue leve, pero ha ido más" },
    { value: "p1s4", label: "Hice algo y se enfadaron conmigo" },
    { value: "p1s5", label: "Desde siempre" },
  ];

  const opcionesPregunta2 = [
    { value: "p2s1", label: "En clase" },
    { value: "p2s2", label: "En el patio o pasillo" },
    { value: "p2s3", label: "En redes sociales" },
    { value: "p2s4", label: "Fuera del colegio" },
    { value: "p2s5", label: "Con personas que no son de mi clase" },
  ];

  const opcionesPregunta3 = [
    { value: "p3s1", label: "Me insultan o se burlan del mí" },
    { value: "p3s2", label: "Me ignoran o aíslan" },
    { value: "p3s3", label: "Me pegan o empujan" },
    { value: "p3s4", label: "Me amenazan" },
    { value: "p3s5", label: "Me obligan a hacer cosas que no quiero" },
  ];

  const opcionesPregunta4 = [
    { value: "p4s1", label: "Todos los días" },
    { value: "p4s2", label: "Casi todos los días" },
    { value: "p4s3", label: "Cada semana" },
    { value: "p4s4", label: "Pocas veces" },
    { value: "p4s5", label: "Solo pasó una vez" },
  ];

  const opcionesPregunta5 = [
    { value: "p5s1", label: "Se ríen o lo apoyan" },
    { value: "p5s2", label: "Se ríen, pero no participan" },
    { value: "p5s3", label: "No hacen nada" },
    { value: "p5s4", label: "Intentan ayudarme" },
    { value: "p5s5", label: "No hay nadie más cuando pasa" },
  ];

  const opcionesPregunta6 = [
    { value: "p6s1", label: "Sí, pero no lo han parado" },
    { value: "p6s2", label: "No lo he dicho porque tengo miedo" },
    { value: "p6s3", label: "No se lo he dicho a un adulto, pero sí a un amigo" },
    { value: "p6s4", label: "No lo he dicho, pero creo que lo harían igual" },
    { value: "p6s5", label: "No, dejaron de hacerlo" },
  ];

  const opcionesPregunta7 = [
    { value: "p7s1", label: "Triste o con ganas de llorar" },
    { value: "p7s2", label: "Con miedo de ir a clase" },
    { value: "p7s3", label: "Ansioso o nervioso constantemente" },
    { value: "p7s4", label: "Sin confianza en mí mismo" },
    { value: "p7s5", label: "He tenido pensamientos negativos sobre mí mismo" },
    { value: "p7s6", label: "No me afecta mucho" },
  ];

  const getLabelFromValue = (value, opciones) =>
    opciones.find((op) => op.value === value)?.label || value;

  const labelP1 = getLabelFromValue(selectedPregunta1, opcionesPregunta1);
  const labelsP2 = selectedPregunta2.map((value) => getLabelFromValue(value, opcionesPregunta2));
  const labelsP3 = selectedPregunta3.map((value) => getLabelFromValue(value, opcionesPregunta3));
  const labelP4 = getLabelFromValue(selectedPregunta4, opcionesPregunta4);
  const labelsP5 = selectedPregunta5.map((value) => getLabelFromValue(value, opcionesPregunta5));
  const labelP6 = getLabelFromValue(selectedPregunta6, opcionesPregunta6);
  const labelsP7 = selectedPregunta7.map((value) => getLabelFromValue(value, opcionesPregunta7));

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
    const fixedScore = score.toFixed(2);
    setTotalScore(parseInt(fixedScore));
    const nivel = calcularNivelRiesgo(score);
    setNivelRiesgo(nivel); // Guardar el nivel de riesgo en el estado
  };

  // Usamos useEffect para recalcular el puntaje cada vez que cambian las respuestas
  useEffect(() => {
    calculateTotalScore(); // Recalcular puntaje cuando cambian las respuestas

    if (step === 8) {
      const resumenPlano = {
        "¿Cómo empezó la situación que estás viviendo?": labelP1,
        "¿Dónde suele ocurrir lo que está pasando?": Array.isArray(labelsP2)
          ? labelsP2.join(", ")
          : labelsP2,
        "¿Qué tipo de cosas hacen esas personas?": Array.isArray(labelsP3)
          ? labelsP3.join(", ")
          : labelsP3,
        "¿Con qué frecuencia ocurre lo que está pasando?": labelP4,
        "¿Cómo reaccionan los demás compañeros cuando ocurre?": Array.isArray(labelsP5)
          ? labelsP5.join(", ")
          : labelsP5,
        "¿Has intentado pedir que se detuviera la situación?": labelP6,
        "¿Cómo te sientes por lo que está pasando?": Array.isArray(labelsP7)
          ? labelsP7.join(", ")
          : labelsP7,
      };

      const resumenString = JSON.stringify(resumenPlano);
      const nivelRiesgo = calcularNivelRiesgo(totalScore);
      const token = Cookies.get("token");

      const guardarDatos = async () => {
        const response = await guardarTest(token, resumenString, nivelRiesgo.toString());
        const idTest = response.id_test;
        setIdTest(idTest);
        console.log("Solo el ID:", idTest);
      };

      guardarDatos();
    }
  }, [
    selectedPregunta1,
    selectedPregunta2,
    selectedPregunta3,
    selectedPregunta4,
    selectedPregunta5,
    selectedPregunta6,
    selectedPregunta7,
    step,
  ]);

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
      minHeight="70vh"
      mx="auto"
      position="relative"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" flex={1} alignItems="center" position="relative">
        {/* Botón Back: solo visible si no estás en paso 1 ni en paso final, y ya comenzó */}
        {step !== 1 && step !== totalSteps && started && (
          <IconButton
            onClick={back}
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
            <ArrowBackIcon sx={{ fontSize: 48 }} />
          </IconButton>
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
                  {step === 8 && (
                    <>
                      <Total
                        totalScore={totalScore.toString()}
                        nivelRiesgo={nivelRiesgo}
                        onDenunciaClick={() => setMostrarDenuncia(true)}
                      />
                      {(() => {})()}
                    </>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* ✅ Botón Next: visible solo si no estás en paso final, y ya comenzó */}
        {step !== totalSteps && started && (
          <IconButton
            onClick={next}
            disabled={!isCurrentStepValid()}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: isCurrentStepValid() ? "#eee" : "#f5f5f5",
              "&:hover": {
                backgroundColor: isCurrentStepValid() ? "#ddd" : "#f5f5f5",
              },
            }}
          >
            <ArrowForwardIcon
              sx={{
                fontSize: 48,
                color: isCurrentStepValid() ? "#0d315a" : "#ccc",
              }}
            />
          </IconButton>
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

WizardTest.propTypes = {
  setMostrarDenuncia: PropTypes.func.isRequired,
};

export default WizardTest;
