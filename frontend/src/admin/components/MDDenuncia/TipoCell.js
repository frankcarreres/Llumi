import React from "react";
import PropTypes from "prop-types";
import MDTypography from "../MDTypography";
import MDBox from "../MDBox";

export default function TipoCell({ title }) {
  return (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );
}

TipoCell.propTypes = {
  title: PropTypes.string.isRequired,
};
