import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export default function LoadingComponent({ open = false, label = "Cargando…" }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }} open={open}>
      <Box textAlign="center">
        <CircularProgress color="inherit" size={48} />
        {label && (
          <Typography mt={2} fontWeight={500}>
            {label}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
}

LoadingComponent.propTypes = {
  open: PropTypes.bool,
  label: PropTypes.string,
};
