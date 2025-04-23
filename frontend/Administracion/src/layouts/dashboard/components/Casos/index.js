import { useState, useMemo } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "./data/casosTable";

function Casos() {
  // Estado para valores en el menú (no aplicados aún)
  const [menuFilters, setMenuFilters] = useState({
    tipo: "",
    estado: "",
    fecha: "",
  });
  // Estado para filtros ya aplicados a la tabla
  const [filters, setFilters] = useState({
    tipo: "",
    estado: "",
    fecha: "",
  });

  const { columns, rows: originalRows } = data({
    filters: filters || { tipo: "", estado: "", fecha: "" },
  });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const openMenu = ({ currentTarget }) => setMenuAnchor(currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  // Cambian SOLO los valores en el menú
  const handleMenuChange = (field) => (e) => {
    setMenuFilters((m) => ({ ...m, [field]: e.target.value }));
  };

  // Al pulsar “Aplicar filtros” trasladamos menuFilters a filters
  const applyFilters = () => {
    setFilters(menuFilters);
    closeMenu();
  };

  // “Limpiar” resetea AMBOS estados
  const clearFilters = () => {
    setMenuFilters({ tipo: "", estado: "", fecha: "" });
    setFilters({ tipo: "", estado: "", fecha: "" });
    closeMenu();
  };
  const renderMenu = (
    <Menu
      id="filter-menu"
      anchorEl={menuAnchor}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(menuAnchor)}
      onClose={closeMenu}
    >
      <MenuItem dense>
        <FormControl fullWidth variant="outlined" size="small" margin="dense">
          <InputLabel>Tipo de acoso</InputLabel>
          <Select
            label="Tipo de acoso"
            value={menuFilters.tipo}
            onChange={handleMenuChange("tipo")}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { top: 0 }, height: 40 }}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value="físico">Físico</MenuItem>
            <MenuItem value="verbal">Verbal</MenuItem>
            <MenuItem value="psicológico">Psicológico</MenuItem>
            <MenuItem value="ciberbullying">Ciberbullying</MenuItem>
            <MenuItem value="social">Social</MenuItem>
            <MenuItem value="otros">Otros</MenuItem>
          </Select>
        </FormControl>
      </MenuItem>

      <MenuItem dense>
        <FormControl fullWidth variant="outlined" size="small" margin="dense">
          <InputLabel>Estado</InputLabel>
          <Select
            label="Estado"
            value={menuFilters.estado}
            onChange={handleMenuChange("estado")}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { top: 0 }, height: 40 }}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="en_progreso">En progreso</MenuItem>
            <MenuItem value="resuelta">Resuelta</MenuItem>
            <MenuItem value="rechazada">Rechazada</MenuItem>
          </Select>
        </FormControl>
      </MenuItem>

      <MenuItem dense>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          label="Fecha de incidencia"
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { top: 0 },
            height: 40,
            "& .MuiOutlinedInput-input": { padding: "10px 14px" },
          }}
          value={menuFilters.fecha}
          onChange={handleMenuChange("fecha")}
        />
      </MenuItem>

      <MenuItem>
        <Button onClick={applyFilters} variant="contained" fullWidth size="small">
          Aplicar filtros
        </Button>
      </MenuItem>
      <MenuItem>
        <Button onClick={clearFilters} variant="outlined" fullWidth size="small">
          Limpiar filtros
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Casos
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{originalRows.length}</strong> en este mes
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            filter_alt
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows: originalRows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Casos;
