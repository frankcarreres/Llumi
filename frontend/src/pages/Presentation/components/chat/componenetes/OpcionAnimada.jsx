import { motion } from "framer-motion";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

function OptionAnimada({ texto, onClick, variant = "contained", selected = false, sx = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Button
        variant={variant}
        onClick={onClick}
        sx={{
          mb: 1,
          background: selected
            ? "rgba(228, 228, 228, 1.0)" // Mercury normal cuando está seleccionado
            : "rgba(200, 200, 200, 1.0)", // Mercury oscuro por defecto
          color: "rgba(58, 58, 58, 1.0)", // Mine Shaft para todos
          border: selected ? "2px solid #fff" : "1px solid transparent",
          opacity: selected ? 1 : 0.95,
          textTransform: "none",
          "&:hover": {
            background: selected
              ? "rgba(214, 214, 214, 1.0)" // Hover sutilmente más cálido para seleccionados
              : "rgba(214, 214, 200, 1.0)", // Hover sutil para no seleccionados
          },
          "&:active": {
            background: selected ? "rgba(214, 214, 214, 1.0)" : "rgba(220, 220, 220, 1.0)", // Sutil presión visual
          },
          "&:focus": {
            outline: "none !important", // quita el contorno azul
            boxShadow: "none !important", // quita sombra azul de MUI
          },
          "&:focus-visible": {
            outline: "none !important",
            boxShadow: "none !important",
          },
          ...sx,
        }}
      >
        {texto}
      </Button>
    </motion.div>
  );
}

OptionAnimada.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  selected: PropTypes.bool,
  sx: PropTypes.object,
};

export default OptionAnimada;
