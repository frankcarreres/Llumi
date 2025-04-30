import React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

export default function EstadoCell({ estado }) {
  let badgeColor = "error";
  if (estado.toLowerCase() === "resuelta") badgeColor = "success";
  else if (estado.toLowerCase() === "en_progreso") badgeColor = "info";
  else if (estado.toLowerCase() === "pendiente") badgeColor = "warning";
  else if (estado.toLowerCase() === "rechazada") badgeColor = "error";

  return (
    <MDBox ml={-1}>
      <MDBadge badgeContent={estado} color={badgeColor} variant="gradient" size="sm" />
    </MDBox>
  );
}

EstadoCell.propTypes = {
  estado: PropTypes.string.isRequired,
};
