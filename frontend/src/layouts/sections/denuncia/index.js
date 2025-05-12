import { useState } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/inici2.jpg";

// Wizards y botón
import WizardTest from "./components/wizardTest/wizardTest";
import WizardDenuncia from "./components/wizardDenuncia/wizardDenuncia";
import BotoDenuncia from "./components/wizardTest/components/botoDenuncia";

function AboutUs() {
  const location = useLocation();
  const [mostrarDenuncia, setMostrarDenuncia] = useState(false);

  // Determinar qué wizard mostrar
  const mostrar =
    location.pathname.includes("wizardDenuncia") || mostrarDenuncia ? (
      <WizardDenuncia />
    ) : (
      <WizardTest />
    );

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "default",
        }}
        transparent
        light
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Realitza la teua denúncia{" "}
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Si estes patint assetjament o saps d&apos;algun cas no dubtes
            </MKTypography>
            <BotoDenuncia onClick={() => setMostrarDenuncia(true)}>DENÚNCIA</BotoDenuncia>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 4,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          minHeight: "70vh",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {mostrar}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default AboutUs;
