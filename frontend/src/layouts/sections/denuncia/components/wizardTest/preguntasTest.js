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

export const Pregunta4 = ({ selected, setSelected }) => {
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

export const Pregunta6 = ({ selected, setSelected }) => {
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
