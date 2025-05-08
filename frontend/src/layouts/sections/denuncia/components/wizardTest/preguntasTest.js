import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Typography,
} from "@mui/material";

export const Pregunta1 = ({ selected, setSelected }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Com va començar la situació?
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
            { value: "p1s1", label: "No ho sé / No ho recorde" },
            { value: "p1s2", label: "De sobte" },
            { value: "p1s3", label: "Al principi va ser lleu, però ha anat a més" },
            { value: "p1s4", label: "Vaig fer alguna cosa i es van enfadar amb mi" },
            { value: "p1s5", label: "Des de sempre" },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Radio
                  sx={{
                    transform: "scale(0.8)",
                    color: "#d7712e",
                  }}
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
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

Pregunta1.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export const Pregunta2 = ({ selected, setSelected }) => {
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
        En quines situacions ocorre?
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
            { value: "p2s1", label: "En classe" },
            { value: "p2s2", label: "Al pati o passadís" },
            { value: "p2s3", label: "En xarxes socials" },
            { value: "p2s4", label: "Fora del col·legi" },
            { value: "p2s5", label: "Amb persones que no són de la meua classe" },
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

export const Pregunta3 = ({ selected, setSelected }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Que tipus de coses fan?
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
            { value: "p3s1", label: "M'insulten o es burlen del mi" },
            { value: "p3s2", label: "M'ignoren o aïllen" },
            { value: "p3s3", label: "Em peguen o espenten" },
            { value: "p3s4", label: "M'amenacen" },
            { value: "p3s5", label: "M'obliguen a fer coses que no vull" },
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

export const Pregunta4 = ({ selected, setSelected }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Amb quina freqüència?{" "}
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
            { value: "p4s1", label: "Tots els dies" },
            { value: "p4s2", label: "Quasi tots els dies" },
            { value: "p4s3", label: "Cada setmana" },
            { value: "p4s4", label: "Poques vegades" },
            { value: "p4s5", label: "Només va passar una vegada" },
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

export const Pregunta5 = ({ selected, setSelected }) => {
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
        Com reaccionen altres companys?
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
            { value: "p5s1", label: "Es riuen o secunden" },
            { value: "p5s2", label: "Es riuen, però no participen" },
            { value: "p5s3", label: "No fan res" },
            { value: "p5s4", label: "Intenten ajudar-me" },
            { value: "p5s5", label: "No hi ha ningú més quan passa" },
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

export const Pregunta6 = ({ selected, setSelected }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Has intentat demanar que paren?
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
            { value: "p6s1", label: "Sí, però no han parat" },
            { value: "p6s2", label: "No ho he dit perquè tinc por" },
            { value: "p6s3", label: "No li ho he dit a un adult, però a un amic si" },
            { value: "p6s4", label: "No ho he dit, però crec que ho farien igual" },
            { value: "p6s5", label: "No, van deixar de fer-ho" },
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

export const Pregunta7 = ({ selected, setSelected }) => {
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
        Com et sents per esta situació?
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
            { value: "p7s1", label: "Trist o amb ganes de plorar" },
            { value: "p7s2", label: "Amb por d'anar a classe" },
            { value: "p7s3", label: "Ansiós o nerviós constantment" },
            { value: "p7s4", label: "Sense confiança en mi mateix" },
            { value: "p7s5", label: "He tingut pensaments negatius sobre mi mateix" },
            { value: "p7s6", label: "No m'afecta molt" },
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
