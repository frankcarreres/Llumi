// src/views/Profile/OverviewProfile.jsx
import { useState, useEffect } from "react";
import { getSession } from "admin/utils/session";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MDBox from "admin/components/MDBox";
import Divider from "@mui/material/Divider";

// Material Dashboard layout
import DashboardLayout from "admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/examples/Navbars/DashboardNavbar";
import Footer from "admin/examples/Footer";
import LoadingComponent from "admin/components/LoadingComponent";
import Header from "admin/layouts/profile/components/Header";
// eslint-disable-next-line no-unused-vars

export default function OverviewProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session?.data) {
      setProfile(session.data);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const session = getSession();
    if (session?.data) {
      setProfile(session.data);
    }
  }, []);

  if (!profile) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <LoadingComponent open={loading} label="Cargando perfil…" />
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const { nombre, direccion, telefono, localidad, regimen } = profile;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <MDBox p={3}>
            <Card>
              <MDBox p={2}>
                <Typography variant="h5">Perfil del Centro</Typography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} xl={4}>
                    <Typography>
                      <strong>Nombre:</strong> {nombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <strong>Dirección:</strong> {direccion}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <strong>Teléfono:</strong> {telefono}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <strong>Régimen:</strong> {regimen}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      <strong>Localidad:</strong> {localidad}
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}
