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
import { getSession } from "admin/utils/session";

function FormDenunciaAluVictima({ onDenunciar }) {
  const [descripcion, setDescripcion] = useState("");
  const [tiposAcoso, setTiposAcoso] = useState([]);
  const [acosador, setAcosador] = useState("");
  const [hayTestigos, setHayTestigos] = useState(null); // Usar null en lugar de ""
  const [quienTestigo, setQuienTestigo] = useState("");
  const [intervinoDocente, setIntervinoDocente] = useState("");
  const [quienDocente, setQuienDocente] = useState("");
  const session = getSession("token");

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
        Formulario de denuncia
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
          ¿Qué tipo de acoso has vivido?
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
                  sx={{ color: "lightgrey", "&.Mui-checked": { color: "#333" } }} // Cambiar color de texto a light
                />
              }
              label={tipo}
            />
          ))}
        </FormGroup>
      </FormControl>

      <TextField
        label="¿Quién te está acosando?"
        fullWidth
        value={acosador}
        onChange={(e) => setAcosador(e.target.value)}
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
          label="¿Nos puedes decir quién?"
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
              tipo_acoso: tiposAcoso.join(", "),
              nombre_victima: session?.data.nombre,
              nombre_acosador: acosador,
              es_testigo: "no",
              testigos: hayTestigos,
              nombre_testigo_extra: quienTestigo,
              intervencion_docente: intervinoDocente,
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

FormDenunciaAluVictima.propTypes = {
  onDenunciar: PropTypes.func.isRequired,
};

export default FormDenunciaAluVictima;
