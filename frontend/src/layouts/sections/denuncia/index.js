import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import bgImage from "assets/bg.gif";
import WizardTest from "./components/wizardTest/wizardTest";
import WizardDenuncia from "./components/wizardDenuncia/wizardDenuncia";
import BotoDenuncia from "./components/wizardTest/components/botoDenuncia";
import { WizardTestSol } from "./components/wizardTest/wizardTestSol";
import publicRoutes from "../../../routes/publicRoutes";
import { getDenunciaPorUsuario } from "pages/Presentation/components/chat/services/api";
import { WizardDenunciaSol } from "./components/wizardDenuncia/wizardDenunciaSol";
import { getSession } from "admin/utils/session";

function DenunciaUsuari() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mostrarDenuncia, setMostrarDenuncia] = useState(false);
  const [resultadoTest, setResultadoTest] = useState(null);
  const [denunciaPendiente, setDenunciaPendiente] = useState(false);

  useEffect(() => {
    const session = getSession("token");

    if (!session?.token) {
      navigate("/pages/authentication/sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        // Obtener resultado del test
        const responseTest = await fetch("http://13.216.39.33:3001/denuncias/resultadoTest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
        });
        const result = await responseTest.json();
        setResultadoTest(result);

        // Obtener denuncias y verificar si hay alguna pendiente
        const data = await getDenunciaPorUsuario(session?.token);
        const tienePendiente = data.denuncias.some((d) => d.estado === "pendiente");
        setDenunciaPendiente(tienePendiente);
        console.log(denunciaPendiente);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const mostrar =
    location.pathname.includes("wizardDenuncia") || mostrarDenuncia ? (
      denunciaPendiente ? (
        <WizardDenunciaSol />
      ) : (
        <WizardDenuncia />
      )
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
        minHeight="80vh"
        width="100%"
        sx={{
          position: "relative", // necesario para el pseudo-elemento absoluto
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)", // filtro negro semitransparente
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
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
          position: "relative",
          zIndex: 10,
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
