import React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function DenunciaCell({ id_denuncia, descripcion }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`Denuncia #${id_denuncia}`}
        </MDTypography>
        <MDTypography variant="caption">{descripcion}</MDTypography>
      </MDBox>
    </MDBox>
  );
}

DenunciaCell.propTypes = {
  id_denuncia: PropTypes.number.isRequired,
  descripcion: PropTypes.string.isRequired,
};
