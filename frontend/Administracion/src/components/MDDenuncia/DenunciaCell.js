import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function DenunciaCell({ id_denuncia, descripcion }) {
  return (
    <Link to={`/denuncias/${id_denuncia}`} style={{ textDecoration: "none", color: "inherit" }}>
      <MDBox display="flex" alignItems="center" lineHeight={1} sx={{ cursor: "pointer" }}>
        <MDBox>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`Denuncia #${id_denuncia}`}
          </MDTypography>
          <MDTypography variant="caption">{descripcion}</MDTypography>
        </MDBox>
      </MDBox>
    </Link>
  );
}

DenunciaCell.propTypes = {
  id_denuncia: PropTypes.number.isRequired,
  descripcion: PropTypes.string.isRequired,
};
