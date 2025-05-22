import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MDTypography from "admin/components/MDTypography";

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
      <Select
        value={value}
        onChange={handleChange}
        disableUnderline
        sx={{ "& .MuiSelect-select": { typography: "body2" } }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: "background.paper",
              boxShadow: 1,
              mt: 1,
            },
          },
          MenuListProps: {
            sx: {
              "& .MuiMenuItem-root": {
                typography: "body2",
                px: 3,
              },
            },
          },
        }}
      >
        <MenuItem value="resuelta">
          <MDTypography variant="body2">Resuelta</MDTypography>
        </MenuItem>
        <MenuItem value="en_progreso">
          <MDTypography variant="body2">En progreso</MDTypography>
        </MenuItem>
        <MenuItem value="en_observacion">
          <MDTypography variant="body2">En Observación</MDTypography>
        </MenuItem>
        <MenuItem value="pendiente">
          <MDTypography variant="body2">Pendiente</MDTypography>
        </MenuItem>
        <MenuItem value="rechazada">
          <MDTypography variant="body2">Rechazada</MDTypography>
        </MenuItem>
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
