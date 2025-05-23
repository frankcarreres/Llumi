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
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/bg.webp";
import Index from "./components/chat/SimuladorFlow";
import publicRoutes from "../../routes/publicRoutes";
import { getSession } from "utils/session";
import { useNavigate } from "react-router-dom";
import { clearHistory } from "utils/chatStorage";

function Presentation() {
  const sesion = getSession("token");
  const navigate = useNavigate();
  if (sesion?.data.rol === "centro" && sesion?.token) {
    clearHistory();
    navigate("/admin/dashboard", { replace: true });
  }
  return (
    <>
      <DefaultNavbar brand="Llumí" routes={publicRoutes} sticky />
      <MKBox
        minHeight="140vh"
        width="100%"
        sx={{
          position: "relative",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "flex",
          alignItems: "flex-start", // Esto los sube hacia arriba
          justifyContent: "center",
          overflow: "hidden",
          pt: { xs: 12, md: 25 }, //  Ajusta cuánto los subes con padding
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mb={1}
              sx={{
                fontSize: {
                  xs: "2xl",
                  sm: "3xl",
                  md: "4xl",
                },
              }}
            >
              Llumí
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              No estás solo,&nbsp;&nbsp;juntos somos la luz que guía el camino
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Card
        sx={{
          position: "relative",
          zIndex: 10,
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -68,
          mb: 4,
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <Index />
      </Card>

      <MKBox pt={4} px={1} mt={2}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
