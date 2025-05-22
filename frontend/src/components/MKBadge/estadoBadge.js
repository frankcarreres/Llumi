// EstadoCell.js
import React from "react";
import PropTypes from "prop-types";
import MKBadge from "components/MKBadge"; // ojo: importas MKBadge, no MDBadge
import MKBox from "components/MKBox";

// tu paleta
const colors = {
  pendiente: "#f1c40f",
  en_progreso: "#2980b9",
  en_observacion: "#1B5883",
  resuelta: "#27ae60",
  gris: "#ccc",
};

export default function EstadoCell({ estado }) {
  const key = estado.toLowerCase();
  const badgeColor = colors[key] || colors.gris;

  return (
    <MKBox ml={-1}>
      <MKBadge
        badgeContent={estado}
        variant="contained"
        size="sm"
        sx={{
          // targeteamos el badge interno de MUI:
          "& .MuiBadge-badge": {
            backgroundColor: badgeColor,
            color: "#fff",
          },
        }}
      />
    </MKBox>
  );
}

EstadoCell.propTypes = {
  estado: PropTypes.string.isRequired,
};
