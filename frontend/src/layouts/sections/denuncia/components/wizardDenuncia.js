import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const WizardDenuncia = () => {
  const [step, setStep] = useState(1);
  const [selectedPregunta1, setSelectedPregunta1] = useState("");
  const [selectedPregunta2, setSelectedPregunta2] = useState([]);
  const [selectedPregunta3, setSelectedPregunta3] = useState([]);
  const [selectedPregunta4, setSelectedPregunta4] = useState("");
  const [selectedPregunta5, setSelectedPregunta5] = useState([]);
  const [selectedPregunta6, setSelectedPregunta6] = useState("");
  const [selectedPregunta7, setSelectedPregunta7] = useState("");
  const [direction, setDirection] = useState(0); // -1 = atrás, 1 = adelante
  const [totalScore, setTotalScore] = useState(0);
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

  //Función para bloquear las flechas si no se selecciona nada
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
    }
  };

  const back = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
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
        <Box position="absolute" left={0}>
          <IconButton onClick={back} disabled={step === 1}>
            <ArrowBackIcon sx={{ fontSize: 48 }} />
          </IconButton>
        </Box>

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
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box position="absolute" right={0}>
          {step < totalSteps ? (
            <IconButton color="primary" onClick={next} disabled={!isCurrentStepValid()}>
              <ArrowForwardIcon sx={{ fontSize: 100, color: "#ea8917" }} />{" "}
              {/* Azul personalizado */}
            </IconButton>
          ) : (
            <Button variant="contained" color="success" onClick={() => alert("Denuncia enviada")}>
              Enviar
            </Button>
          )}
        </Box>
      </Box>

      <Box mt={4} display="flex" justifyContent="center" gap={1}>
        {[...Array(totalSteps)].map((_, index) => (
          <Box
            key={index}
            width={6}
            height={6}
            borderRadius="50%"
            bgcolor={index + 1 <= step ? "#ea8917" : "#ccc"}
          />
        ))}
      </Box>
    </Box>
  );
};

const Pregunta1 = ({ selected, setSelected }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿Cómo empezó la situación?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p1s1", label: "No lo sé / No lo recuerdo" },
            { value: "p1s2", label: "De repente" },
            { value: "p1s3", label: "Al principio fue leve, pero ha ido a más" },
            { value: "p1s4", label: "Hice algo y se enfadaron conmigo" },
            { value: "p1s5", label: "Desde siempre" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={{ transform: "scale(0.8)" }} />}
              label={item.label}
              sx={{
                width: "350px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

Pregunta1.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Pregunta2 = ({ selected, setSelected }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Si ya está seleccionado, se deselecciona
          : [...prev, value] // Si no está seleccionado, se añade
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿En qué situaciones ocurre?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p2s1", label: "En clase" },
            { value: "p2s2", label: "En el patio o pasillo" },
            { value: "p2s3", label: "En redes sociales" },
            { value: "p2s4", label: "Fuera del colegio" },
            { value: "p2s5", label: "Con personas que no son de mi clase" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)}
                  onChange={handleChange}
                  value={item.value}
                  sx={{ transform: "scale(0.8)" }}
                />
              }
              label={item.label}
              sx={{
                width: "350px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

Pregunta2.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Pregunta3 = ({ selected, setSelected }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿Que tipo de cosas hacen?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p3s1", label: "Me insultan o se burlan de mi" },
            { value: "p3s2", label: "Me ignoran o aíslan" },
            { value: "p3s3", label: "Me golpean o empujan" },
            { value: "p3s4", label: "Me amenazan" },
            { value: "p3s5", label: "Me obligan a hacer cosas que no quiero" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)}
                  onChange={handleChange}
                  value={item.value}
                  sx={{ transform: "scale(0.8)" }}
                />
              }
              label={item.label}
              sx={{
                width: "350px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

Pregunta3.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Pregunta4 = ({ selected, setSelected }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿Con que frecuencia?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p4s1", label: "Todos los días" },
            { value: "p4s2", label: "Casi todos los días" },
            { value: "p4s3", label: "Cada semana" },
            { value: "p4s4", label: "Pocas veces" },
            { value: "p4s5", label: "Solo pasó una vez" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={{ transform: "scale(0.8)" }} />}
              label={item.label}
              sx={{
                width: "350px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

Pregunta4.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Pregunta5 = ({ selected, setSelected }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Si ya está seleccionado, se deselecciona
          : [...prev, value] // Si no está seleccionado, se añade
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿Como reaccionan otros compañeros?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p5s1", label: "Se ríen o apoyan" },
            { value: "p5s2", label: "Se ríen, pero no participan" },
            { value: "p5s3", label: "No hacen nada" },
            { value: "p5s4", label: "Intentan ayudarme" },
            { value: "p5s5", label: "No hay nadie más cuando pasa" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)}
                  onChange={handleChange}
                  value={item.value}
                  sx={{ transform: "scale(0.8)" }}
                />
              }
              label={item.label}
              sx={{
                width: "450px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

Pregunta5.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Pregunta6 = ({ selected, setSelected }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿Has intentado pedir que paren?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p6s1", label: "Sí, pero no han parado" },
            { value: "p6s2", label: "No lo he dicho porque tengo miedo" },
            { value: "p6s3", label: "No se lo he dicho a un adulto, pero a un amigo si" },
            { value: "p6s4", label: "No lo he dicho, pero creo que lo harían igual" },
            { value: "p6s5", label: "No, dejaron de hacerlo" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={{ transform: "scale(0.8)" }} />}
              label={item.label}
              sx={{
                width: "400px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

Pregunta6.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Pregunta7 = ({ selected, setSelected }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Si ya está seleccionado, se deselecciona
          : [...prev, value] // Si no está seleccionado, se añade
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        ¿Como te sientes por esta situación?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {[
            { value: "p7s1", label: "Triste o con ganas de llorar" },
            { value: "p7s2", label: "Con miedo de ir a clase" },
            { value: "p7s3", label: "Ansioso o nervioso constantemente" },
            { value: "p7s4", label: "Sin confianza en mí mismo" },
            { value: "p7s5", label: "He tenido pensamientos negativos sobre mí mismo" },
            { value: "p7s6", label: "No me afecta mucho" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)}
                  onChange={handleChange}
                  value={item.value}
                  sx={{ transform: "scale(0.8)" }}
                />
              }
              label={item.label}
              sx={{
                width: "450px",
                alignItems: "center",
                justifyContent: "flex-start",
                margin: 0,
                ".MuiTypography-root": {
                  fontWeight: "normal",
                  fontSize: "1rem",
                  textAlign: "left",
                  whiteSpace: "normal",
                },
              }}
            />
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

Pregunta7.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const Total = ({ totalScore }) => (
  <Box textAlign="center">
    <Typography>Confirmar datos</Typography>
    <Typography variant="h6" mt={2}>
      Puntaje total: {totalScore}
    </Typography>
  </Box>
);

Total.propTypes = {
  totalScore: PropTypes.string.isRequired,
};

export default WizardDenuncia;
