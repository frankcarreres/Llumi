// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function Footer() {
  return (
    <MKBox component="footer" py={6}>
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            textAlign={{ xs: "center", lg: "left" }}
            mr="auto"
            mb={{ xs: 3, lg: 0 }}
          >
            <MKTypography variant="h6" textTransform="uppercase" mb={{ xs: 2, lg: 3 }}>
              Llumí
            </MKTypography>
            <MKTypography variant="button" opacity={0.8}>
              Copyright © {new Date().getFullYear()} Llumí. Todos los derechos reservados.
            </MKTypography>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Footer;
