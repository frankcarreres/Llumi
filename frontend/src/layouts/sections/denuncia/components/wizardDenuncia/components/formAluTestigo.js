import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  Box,
} from "@mui/material";
import BotoDenuncia from "../../wizardTest/components/botoDenuncia";
import PropTypes from "prop-types";

function FormDenunciaAluTestigo({ onDenunciar }) {
  const [descripcion, setDescripcion] = useState("");
  const [tiposAcoso, setTiposAcoso] = useState([]);
  const [acosado, setAcosado] = useState("");
  const [relacionAcosado, setRelacionAcosado] = useState("");
  const [hayTestigos, setHayTestigos] = useState("");
  const [quienTestigo, setQuienTestigo] = useState("");
  const [intervinoDocente, setIntervinoDocente] = useState("");
  const [quienDocente, setQuienDocente] = useState("");

  const handleTipoAcosoChange = (event) => {
    const value = event.target.name;
    setTiposAcoso((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ maxWidth: 800, margin: "0 auto", padding: "24px" }}
    >
      {/* TÍTULO */}
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        fontWeight={500}
        gutterBottom
        sx={{ letterSpacing: 2, marginBottom: 6 }}
      >
        Formulario de denuncia (Testigo)
      </Typography>

      <TextField
        label="¿Puedes contarnos qué ha ocurrido?"
        multiline
        rows={4}
        fullWidth
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ marginBottom: 30 }}
      />

      <FormControl component="fieldset" fullWidth style={{ marginBottom: 30 }}>
        <FormLabel component="legend" sx={{ fontSize: "1rem", color: "#333", fontWeight: 400 }}>
          ¿Qué tipo de acoso has presenciado?
        </FormLabel>
        <FormGroup>
          {["Físico", "Verbal", "Social", "Cibernético", "Sexual"].map((tipo) => (
            <FormControlLabel
              key={tipo}
              control={
                <Checkbox
                  checked={tiposAcoso.includes(tipo)}
                  onChange={handleTipoAcosoChange}
                  name={tipo}
                  sx={{ color: "lightgrey", "&.Mui-checked": { color: "#333" } }}
                />
              }
              label={tipo}
            />
          ))}
        </FormGroup>
      </FormControl>

      <TextField
        label="¿Quién está siendo acosado/a?"
        fullWidth
        value={acosado}
        onChange={(e) => setAcosado(e.target.value)}
        style={{ marginBottom: 30 }}
      />

      <TextField
        label="¿Cuál es tu relación con la persona acosada?"
        fullWidth
        value={relacionAcosado}
        onChange={(e) => setRelacionAcosado(e.target.value)}
        style={{ marginBottom: 30 }}
      />

      <FormControl component="fieldset" fullWidth style={{ marginBottom: 30 }}>
        <FormLabel sx={{ fontSize: "1rem", color: "#333", fontWeight: 400 }}>
          ¿Alguien más ha presenciado lo ocurrido?
        </FormLabel>
        <RadioGroup row value={hayTestigos} onChange={(e) => setHayTestigos(e.target.value)}>
          <FormControlLabel value="si" control={<Radio />} label="Sí" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {hayTestigos === "si" && (
        <TextField
          label="¿Nos puedes decir qué otras personas lo han presenciado?"
          fullWidth
          value={quienTestigo}
          onChange={(e) => setQuienTestigo(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      )}

      <FormControl component="fieldset" fullWidth style={{ marginBottom: 6 }}>
        <FormLabel sx={{ fontSize: "1rem", color: "#333", fontWeight: 400 }}>
          ¿Algún docente intervino en la situación?
        </FormLabel>
        <RadioGroup
          row
          value={intervinoDocente}
          onChange={(e) => setIntervinoDocente(e.target.value)}
        >
          <FormControlLabel value="si" control={<Radio />} label="Sí" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {intervinoDocente === "si" && (
        <TextField
          label="¿Nos puedes decir quién?"
          fullWidth
          value={quienDocente}
          onChange={(e) => setQuienDocente(e.target.value)}
          style={{ marginBottom: 6 }}
        />
      )}

      {/* Botón centrado */}
      <Box display="flex" justifyContent="center" mt={4}>
        <BotoDenuncia
          onClick={() => {
            const datos = {
              descripcion: descripcion,
              tipo_acoso: tiposAcoso,
              nombre_victima: acosado,
              relacion_victima: relacionAcosado,
              es_testigo: true,
              testigos: hayTestigos === "si",
              nombre_testigo_extra: quienTestigo,
              intervencion_docente: intervinoDocente === "si",
              nombre_docente: quienDocente,
            };
            onDenunciar(datos);
          }}
        >
          DENÚNCIA
        </BotoDenuncia>
      </Box>
    </form>
  );
}

FormDenunciaAluTestigo.propTypes = {
  onDenunciar: PropTypes.func.isRequired,
};

export default FormDenunciaAluTestigo;
