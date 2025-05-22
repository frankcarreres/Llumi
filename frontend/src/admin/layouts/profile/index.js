// src/views/Profile/OverviewProfile.jsx
import React, { useState, useEffect } from "react";
import { clearSession, getSession } from "utils/session";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MDBox from "admin/components/MDBox";
import Divider from "@mui/material/Divider";

// Material Dashboard layout
import DashboardLayout from "admin/widgets/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/widgets/Navbars/DashboardNavbar";
import Footer from "admin/widgets/Footer";
import LoadingComponent from "admin/components/LoadingComponent";
import Header from "admin/layouts/profile/components/Header";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars

export default function OverviewProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

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
        <MDBox p={3}>
          <MDBox p={2} borderBottom="1px solid #e0e0e0">
            <Typography variant="h5">Perfil del Centro</Typography>
          </MDBox>
          <MDBox p={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={6}>
                <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
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
            </Grid>
          </MDBox>
        </MDBox>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            component="label"
            variant="contained"
            onClick={handleLogout}
            startIcon={<Icon> logout_24 </Icon>}
            color="error"
          >
            <Typography component="span" variant="body2" sx={{ color: "#000" }}>
              Cerrar Sessión
            </Typography>
          </Button>
        </Grid>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}
