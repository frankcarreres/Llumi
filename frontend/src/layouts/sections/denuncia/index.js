import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ AÑADIDO useNavigate
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/inici2.jpg";
import WizardTest from "./components/wizardTest/wizardTest";
import WizardDenuncia from "./components/wizardDenuncia/wizardDenuncia";
import BotoDenuncia from "./components/wizardTest/components/botoDenuncia";
import { WizardTestSol } from "./components/wizardTest/wizardTestSol";
import Cookies from "js-cookie";
import publicRoutes from "../../../routes/publicRoutes";

function DenunciaUsuari() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ useNavigate para redireccionar
  const [mostrarDenuncia, setMostrarDenuncia] = useState(false);
  const [resultadoTest, setResultadoTest] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      // ✅ Si no hay token, redirigimos al login
      navigate("/pages/authentication/sign-in");
      return;
    }

    const fetchResultadoTest = async () => {
      try {
        const response = await fetch("http://13.216.39.33:3001/denuncias/resultadoTest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setResultadoTest(result);
      } catch (error) {
        console.error("Error al obtener el resultado del test:", error);
      }
    };

    fetchResultadoTest();
  }, [navigate]); // ✅ Dependencia de navigate

  const mostrar =
    location.pathname.includes("wizardDenuncia") || mostrarDenuncia ? (
      <WizardDenuncia />
    ) : resultadoTest && resultadoTest.resultado ? (
      <WizardTestSol
        resultadoTest={resultadoTest.resultado}
        setMostrarDenuncia={setMostrarDenuncia}
      />
    ) : (
      <WizardTest setMostrarDenuncia={setMostrarDenuncia} />
    );

  const mostrarBotonDenuncia = !location.pathname.includes("wizardDenuncia") && !mostrarDenuncia;

  return (
    <>
      <DefaultNavbar
        routes={publicRoutes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "default",
        }}
        sticky
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
            {mostrarBotonDenuncia && (
              <BotoDenuncia onClick={() => setMostrarDenuncia(true)}>DENÚNCIA</BotoDenuncia>
            )}
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

export default DenunciaUsuari;
