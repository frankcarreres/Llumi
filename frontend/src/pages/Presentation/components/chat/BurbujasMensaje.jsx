import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function BurbujaMensaje({ texto, autor }) {
  const isUser = autor === "user";
  const align = isUser ? "flex-end" : "flex-start";
  const bg = isUser ? "#DCF8C6" : "#F0F0F0";

  return (
    <Box display="flex" justifyContent={align} width="100%">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ maxWidth: "70%" }}
      >
        <Box
          bgcolor={bg}
          px={2}
          py={1}
          borderRadius={3}
          mb={1}
          sx={{
            whiteSpace: "pre-wrap",
            borderTopLeftRadius: isUser ? 12 : 0,
            borderTopRightRadius: isUser ? 0 : 12,
          }}
        >
          {texto}
        </Box>
      </motion.div>
    </Box>
  );
}

BurbujaMensaje.propTypes = {
  texto: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
};

export default BurbujaMensaje;
