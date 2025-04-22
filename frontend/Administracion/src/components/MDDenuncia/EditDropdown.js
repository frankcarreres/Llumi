import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function EditDropdown({ row, setRowsData, updateData }) {
  const [value, setValue] = useState(row.estado);

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    if (newStatus.toLowerCase() === row.estado.toLowerCase()) return;

    setValue(newStatus);

    // Actualizamos en el estado local
    setRowsData((prevRows) =>
      prevRows.map((item) =>
        item.id_denuncia === row.id_denuncia ? { ...item, estado: newStatus } : item
      )
    );

    // Actualizamos en el backend
    await updateData(row.id_denuncia, newStatus);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <Select value={value} onChange={handleChange} disableUnderline>
        <MenuItem value="resuelta">Resuelta</MenuItem>
        <MenuItem value="en_progreso">En progreso</MenuItem>
        <MenuItem value="pendiente">Pendiente</MenuItem>
        <MenuItem value="rechazada">Rechazada</MenuItem>
      </Select>
    </FormControl>
  );
}

EditDropdown.propTypes = {
  row: PropTypes.shape({
    id_denuncia: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
  setRowsData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};
