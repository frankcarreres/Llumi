import { motion } from "framer-motion";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

function OpcionAnimada({ texto, onClick, variant = "contained", sx = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Button variant={variant} onClick={onClick} sx={{ mb: 1, ...sx }}>
        {texto}
      </Button>
    </motion.div>
  );
}

OpcionAnimada.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  sx: PropTypes.object,
};

export default OpcionAnimada;
