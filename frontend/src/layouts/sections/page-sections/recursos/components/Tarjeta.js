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
    <MKBox component="header" position="relative" height="100%">
      <MKBox
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="500px"
        height="100%"
        sx={{
          backgroundImage: `url(${imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <MKBox
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
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
            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
              {descripcion}
            </MKTypography>
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
