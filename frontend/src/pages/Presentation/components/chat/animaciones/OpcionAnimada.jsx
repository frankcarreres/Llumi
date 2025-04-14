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
            ? "linear-gradient(to right, rgba(255, 170, 100, 1), rgba(240, 130, 60, 1))"
            : "linear-gradient(to right, rgba(255, 210, 133, 0.9), rgba(254, 179, 77, 0.9))",
          color: selected ? "#fff" : "#1f1f1f",
          border: selected ? "2px solid #fff" : "1px solid transparent",
          opacity: selected ? 1 : 0.95,
          textTransform: "none",
          "&:hover": {
            background: selected
              ? "linear-gradient(to right, rgba(180, 80, 25, 1), rgba(150, 60, 15, 1))"
              : "linear-gradient(to right, rgba(255, 200, 120, 1), rgba(254, 179, 77, 1))",
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
