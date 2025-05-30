import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import bgImage from "assets/bg.gif";
import BotoDenuncia from "components/DenunciaComponents/botoDenuncia";

import publicRoutes from "../../../routes/publicRoutes";
import { getDenunciaPorId } from "services/api";
import { getSession } from "utils/session";

import { WizardDenunciaSol } from "../denuncia/wizardDenuncia/wizardDenunciaSol";
import WizardDenuncia from "../denuncia/wizardDenuncia/wizardDenuncia";
import { WizardTestSol } from "../denuncia/wizardTest/wizardTestSol";
import WizardTest from "../denuncia/wizardTest/wizardTest";

function DenunciaUsuari() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mostrarDenuncia, setMostrarDenuncia] = useState(false); // Controla si se muestra el wizard de denuncia
  const [resultadoTest, setResultadoTest] = useState(null); // Guarda el resultado del test obtenido desde la API
  const [denunciaPendiente, setDenunciaPendiente] = useState(false); // Indica si existe una denuncia pendiente
  const [denunciaEnObservacion, setDenunciaEnObservacion] = useState(false); // Indica si hay una denuncia en observación
  const [idTest, setIdTest] = useState(null);

  useEffect(() => {
    const session = getSession("token");

    if (!session?.token) {
      navigate("/pages/authentication/sign-in");
      return;
    }

    // Función asíncrona para obtener resultado del test y estado de denuncias
    const fetchData = async () => {
      try {
        // Solicitud para obtener el resultado del test desde el endpoint
        const responseTest = await fetch("http://13.216.39.33:3001/denuncias/resultadoTest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
        });
        const result = await responseTest.json();
        setResultadoTest(result);

        // Se obtienen las denuncias asociadas al usuario usando el token
        const data = await getDenunciaPorId(session?.token);
        // Se verifica si alguna denuncia está en estado pendiente, en progreso o en observación
        const tienePendiente = data.denuncias.some((d) =>
          ["pendiente", "en_progreso", "en_observacion"].includes(d.estado)
        );
        setDenunciaPendiente(tienePendiente);

        // Se comprueba si existe una denuncia con estado "en_observacion"
        const enObservacion = data.denuncias.some(
          (d) => d.estado.toLowerCase() === "en_observacion"
        );
        setDenunciaEnObservacion(enObservacion);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchData();
  }, [navigate]);

  // Lógica para determinar qué componente mostrar dependiendo de la URL y estados
  const mostrar =
    // Si la ruta actual incluye "wizardDenuncia" o si se ha indicado mostrar la denuncia:
    location.pathname.includes("wizardDenuncia") || mostrarDenuncia ? (
      // Si hay denuncia pendiente, muestra el seguimiento de la denuncia
      denunciaPendiente ? (
        <WizardDenunciaSol idTest={idTest} />
      ) : (
        // Si no hay denuncia pendiente, muestra el wizard normal de denuncia
        <WizardDenuncia idTest={idTest} />
      )
    ) : // Si no se cumple la condición anterior y existe un resultado del test:
    resultadoTest && resultadoTest.resultado ? (
      // Se verifica si la denuncia está en observación, en cuyo caso se muestra el wizard de test
      denunciaEnObservacion ? (
        <WizardTest setMostrarDenuncia={setMostrarDenuncia} setIdTest={setIdTest} />
      ) : (
        // De lo contrario, se muestra de nuevo el resultado del test
        <WizardTestSol
          resultadoTest={resultadoTest.resultado}
          setMostrarDenuncia={setMostrarDenuncia}
          setIdTest={setIdTest}
        />
      )
    ) : (
      // Por defecto, se muestra el wizard de test
      <WizardTest setMostrarDenuncia={setMostrarDenuncia} setIdTest={setIdTest} />
    );

  // Se define si se debe mostrar el botón de denuncia. Se oculta en la ruta "wizardDenuncia" o cuando ya se muestra la denuncia
  const mostrarBotonDenuncia = !location.pathname.includes("wizardDenuncia") && !mostrarDenuncia;

  return (
    <>
      <DefaultNavbar routes={publicRoutes} sticky />

      <MKBox
        minHeight="80vh"
        width="100%"
        sx={{
          position: "relative",
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
            backgroundColor: "rgba(0, 0, 0, 0.3)",
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
              Realiza tu denuncia{" "}
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Si estas sufriendo acoso o sabes de algún caso no dudes
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
