// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "../../../../../components/MKBox";
import MKButton from "../../../../../components/MKButton";
import MKTypography from "../../../../../components/MKTypography";

import PropTypes from "prop-types";

function TarjetaRecurs({ titulo, descripcion, imagen }) {
  return (
    <MKBox component="header" position="relative" height="300px">
      {/* Contenedor de la imagen de fondo */}
      <MKBox
        display="flex"
        alignItems="center"
        justifyContent="flex-start" // Asegura que el contenido esté alineado a la izquierda
        minHeight="100%" // Asegura que la imagen cubra toda el área
        sx={{
          backgroundImage: `url(${imagen})`, // Usar imagen como fondo
          backgroundSize: "cover", // Asegura que la imagen cubra toda el área
          backgroundPosition: "center", // Centra la imagen de fondo
          position: "relative", // Asegura que el contenido esté sobre la imagen
        }}
      >
        {/* Superposición oscura para mejorar la legibilidad */}
        <MKBox
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro para mejorar contraste
            zIndex: 1, // Asegura que la superposición esté sobre la imagen
          }}
        />
        {/* Contenedor de contenido dentro de la imagen */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
            {/* Título */}
            <MKTypography
              variant="h1"
              color="white"
              mb={3}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              {titulo}
            </MKTypography>
            {/* Descripción */}
            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
              {descripcion}
            </MKTypography>
            {/* Botón */}
            <Stack direction="row" spacing={1} mt={3}>
              <MKButton color="white">Ver más</MKButton>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

TarjetaRecurs.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
};

export default TarjetaRecurs;
