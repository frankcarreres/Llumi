import React from "react";
import PropTypes from "prop-types";
import MKBox from "../../../../../components/MKBox";
import MKTypography from "../../../../../components/MKTypography";
import MKButton from "../../../../../components/MKButton";

function TarjetaNoticia({ titulo, imagen, url }) {
  // Función para truncar el texto del título
  const truncateText = (text, limit) =>
    text.length > limit ? `${text.substring(0, limit)}...` : text;

  // Función que abre el enlace en una nueva pestaña sin redireccionar en la pestaña actual
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <MKBox component="header" position="relative" height="100%">
      <MKBox
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        minHeight="300px"
        height="100%"
        sx={{
          width: "98%",
          margin: "0 auto",
          backgroundImage: `url(${imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        {/* Overlay para oscurecer la imagen */}
        <MKBox
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1,
            borderRadius: "inherit",
          }}
        />

        <MKBox
          zIndex={2}
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ gap: 2 }}
        >
          <MKTypography variant="h6" color="white">
            {truncateText(titulo, 80)}
          </MKTypography>
          <MKButton color="white" onClick={handleClick}>
            Ver más
          </MKButton>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

TarjetaNoticia.propTypes = {
  titulo: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default TarjetaNoticia;
