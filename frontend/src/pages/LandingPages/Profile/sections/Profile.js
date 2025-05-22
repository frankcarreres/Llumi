// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";

// Images
import profilePicture from "assets/images/img_perfil.png";
import { obtenerTests, obtenerUsuario } from "services/api";
import { getSession } from "admin/utils/session";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function colorPorRiesgo(riesgo) {
  switch (riesgo.toLowerCase()) {
    case "sin riesgo":
      return "rgba(76, 175,  80, 0.4)";
    case "riesgo medio":
      return "rgba(255, 193,   7, 0.4)";
    case "riesgo alto":
      return "rgba(255, 152,   0, 0.4)";
    case "riesgo muy alto":
      return "rgba(244,  67,  54, 0.4)";
    case "riesgo critico":
      return "rgba(194,   0,   0, 0.4)";
  }
}

function Profile() {
  const sesion = getSession("token");
  const [usuario, setUsuario] = useState(null);
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Definimos una función async dentro del useEffect
    async function fetchData() {
      if (!sesion?.token) {
        navigate("/pages/authentication/sign-in", { replace: true });
        return;
      }
      try {
        // 1) Cargar usuario
        const u = await obtenerUsuario(sesion?.token);
        setUsuario(u);

        // 2) Cargar tests (puedes incluso pasar algún dato de usuario si hace falta)
        const t = await obtenerTests(sesion?.token);
        setTests(t);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sesion?.token]);

  if (loading) {
    return (
      <MKBox component="section" py={{ xs: 6, sm: 12 }}>
        <Container>
          <MKTypography align="center">Cargando perfil…</MKTypography>
        </Container>
      </MKBox>
    );
  }

  if (error) {
    return (
      <MKBox component="section" py={{ xs: 6, sm: 12 }}>
        <Container>
          <MKTypography color="error" align="center">
            {error}
          </MKTypography>
        </Container>
      </MKBox>
    );
  }

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        {/* --- Perfil --- */}
        <Grid container justifyContent="center">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar
              src={profilePicture}
              alt={`${usuario.nombre} ${usuario.apellido}`}
              size="xxl"
              shadow="xl"
            />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7}>
              <MKTypography variant="h3" mb={2}>
                {`${usuario.nombre} ${usuario.apellido}`}
              </MKTypography>
              <MKTypography variant="body1" fontWeight="light" color="text" mb={1}>
                <strong>Curso:</strong> {usuario.curso} – <strong>Centro:</strong> {usuario.centro}
              </MKTypography>
              <MKTypography variant="body1" fontWeight="light" color="text">
                <strong>Email:</strong> {usuario.email}
              </MKTypography>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* --- Tests del usuario --- */}
      <Container sx={{ mt: 4 }}>
        <MKTypography variant="h4" mb={2} align="center">
          Mis Tests
        </MKTypography>

        {tests.length > 0 ? (
          <Grid container spacing={2}>
            {tests.map((test) => {
              const color = colorPorRiesgo(test.resultado);
              // Desestructuramos renombrando para claridad:
              const { id_test, resultado: riesgo, fecha_realizacion, Denuncia: id_denuncia } = test;

              return (
                <Grid item xs={12} md={6} key={id_test}>
                  <Card
                    sx={{
                      backgroundColor: color,
                    }}
                  >
                    <CardContent>
                      <MKTypography variant="h6">{riesgo}</MKTypography>
                      <MKTypography variant="body2">
                        Fecha:{" "}
                        {new Date(fecha_realizacion).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </MKTypography>
                      <MKTypography variant="body2">Denuncia vinculada: {id_denuncia}</MKTypography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <MKTypography variant="body1" color="text">
            No tienes tests registrados.
          </MKTypography>
        )}
      </Container>
    </MKBox>
  );
}

export default Profile;
