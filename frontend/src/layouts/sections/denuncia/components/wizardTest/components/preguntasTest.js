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

const opcionesPregunta1 = [
  { value: "p1s1", label: "No ho sé / No ho recorde" },
  { value: "p1s2", label: "De sobte" },
  { value: "p1s3", label: "Al principi va ser lleu, però ha anat a més" },
  { value: "p1s4", label: "Vaig fer alguna cosa i es van enfadar amb mi" },
  { value: "p1s5", label: "Des de sempre" },
];

const opcionesPregunta2 = [
  { value: "p2s1", label: "En classe" },
  { value: "p2s2", label: "Al pati o passadís" },
  { value: "p2s3", label: "En xarxes socials" },
  { value: "p2s4", label: "Fora del col·legi" },
  { value: "p2s5", label: "Amb persones que no són de la meua classe" },
];

const opcionesPregunta3 = [
  { value: "p3s1", label: "M'insulten o es burlen del mi" },
  { value: "p3s2", label: "M'ignoren o aïllen" },
  { value: "p3s3", label: "Em peguen o espenten" },
  { value: "p3s4", label: "M'amenacen" },
  { value: "p3s5", label: "M'obliguen a fer coses que no vull" },
];

const opcionesPregunta4 = [
  { value: "p4s1", label: "Tots els dies" },
  { value: "p4s2", label: "Quasi tots els dies" },
  { value: "p4s3", label: "Cada setmana" },
  { value: "p4s4", label: "Poques vegades" },
  { value: "p4s5", label: "Només va passar una vegada" },
];

const opcionesPregunta5 = [
  { value: "p5s1", label: "Es riuen o secunden" },
  { value: "p5s2", label: "Es riuen, però no participen" },
  { value: "p5s3", label: "No fan res" },
  { value: "p5s4", label: "Intenten ajudar-me" },
  { value: "p5s5", label: "No hi ha ningú més quan passa" },
];

const opcionesPregunta6 = [
  { value: "p6s1", label: "Sí, però no han parat" },
  { value: "p6s2", label: "No ho he dit perquè tinc por" },
  { value: "p6s3", label: "No li ho he dit a un adult, però a un amic si" },
  { value: "p6s4", label: "No ho he dit, però crec que ho farien igual" },
  { value: "p6s5", label: "No, van deixar de fer-ho" },
];

const opcionesPregunta7 = [
  { value: "p7s1", label: "Trist o amb ganes de plorar" },
  { value: "p7s2", label: "Amb por d'anar a classe" },
  { value: "p7s3", label: "Ansiós o nerviós constantment" },
  { value: "p7s4", label: "Sense confiança en mi mateix" },
  { value: "p7s5", label: "He tingut pensaments negatius sobre mi mateix" },
  { value: "p7s6", label: "No m'afecta molt" },
];

export const Pregunta1 = ({ selected, setSelected }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelected(selectedValue); // ✅ Guardamos el value directamente
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
        Com va començar la situació?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected} // ✅ Ahora usamos directamente el value guardado
          onChange={handleChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {opcionesPregunta1.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Radio
                  sx={{
                    transform: "scale(0.8)",
                    color: "#d7712e",
                    "&.Mui-checked": {
                      color: "#d7712e",
                    },
                  }}
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
    const option = opcionesPregunta2.find((item) => item.value === value);
    if (!option) return;

    setSelected((prev) => {
      const isSelected = prev.includes(value); // Cambiar 'option.label' a 'value'
      if (isSelected) {
        return prev.filter((item) => item !== value); // Filtrar por 'value'
      } else {
        return [...prev, value]; // Añadir 'value' al estado
      }
    });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
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
          {opcionesPregunta2.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)} // Comprobar con 'value'
                  onChange={handleChange}
                  value={item.value}
                  sx={{ transform: "scale(0.8)", color: "#d7712e" }}
                />
              }
              label={item.label}
              sx={{
                width: "430px",
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

    setSelected((prev) => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
        Què tipus de coses fan?
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
          {opcionesPregunta3.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)} // Ahora se compara con el value
                  onChange={handleChange}
                  value={item.value}
                  sx={{ transform: "scale(0.8)", color: "#d7712e" }}
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
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelected(selectedValue); // Guardamos solo el value
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
        Amb quina freqüència?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected} // Ahora usamos directamente el value
          onChange={handleChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {opcionesPregunta4.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value} // El value se pasa directamente
              control={
                <Radio
                  sx={{
                    transform: "scale(0.8)",
                    color: "#d7712e",
                    "&.Mui-checked": {
                      color: "#d7712e",
                    },
                  }}
                />
              }
              label={item.label} // Aquí seguimos pasando el label para que se muestre en la UI
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
    const option = opcionesPregunta5.find((item) => item.value === value);
    if (!option) return;

    setSelected(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Usamos el value para filtrar
          : [...prev, value] // Usamos el value para agregar
    );
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
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
          {opcionesPregunta5.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)} // Verificamos si el value está en el array selected
                  onChange={handleChange}
                  value={item.value} // Usamos el value
                  sx={{ transform: "scale(0.8)" }}
                />
              }
              label={item.label} // El label sigue mostrando en la interfaz
              sx={{
                width: "510px",
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
  const handleChange = (event) => {
    const value = event.target.value;
    const option = opcionesPregunta6.find((item) => item.value === value);
    if (option) {
      setSelected(value); // Aquí solo se pasa el value
    }
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
        Has intentat demanar que paren?
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={selected} // Aquí usamos el value directamente
          onChange={handleChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {opcionesPregunta6.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value} // Usamos el value para cada opción
              control={<Radio sx={{ transform: "scale(0.8)" }} />}
              label={item.label}
              sx={{
                width: "500px",
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
    // Encontramos la opción con el value seleccionado
    const option = opcionesPregunta7.find((item) => item.value === value);
    if (option) {
      setSelected(
        (prev) =>
          prev.includes(value) // Usamos el value en vez del label
            ? prev.filter((item) => item !== value) // Filtramos por el value
            : [...prev, value] // Añadimos el value
      );
    }
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
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
          {opcionesPregunta7.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={
                <Checkbox
                  checked={selected.includes(item.value)} // Comprobamos si el value está seleccionado
                  onChange={handleChange}
                  value={item.value} // Pasamos el value
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
