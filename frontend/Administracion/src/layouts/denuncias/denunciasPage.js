// src/layouts/denuncias/DenunciaPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import DenunciaDetail from "components/MDDenuncia/DenunciaDetail";
import useDenunciasTable from "hook/useDenunciasTable";
import MDBox from "components/MDBox";
import CircularProgress from "@mui/material/CircularProgress";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Footer from "examples/Footer";

export default function DenunciaPage() {
  const { id_denuncia } = useParams();
  const { rowsData, loading } = useDenunciasTable({
    idDenuncia: Number(id_denuncia),
    withEdit: false,
  });

  // Declaramos denuncia antes de cualquier render
  const denuncia = rowsData[0] || null;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          {loading ? (
            <MDBox display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </MDBox>
          ) : !denuncia ? (
            <MDBox display="flex" justifyContent="center" py={5}>
              <MDTypography color="error">Denuncia no encontrada.</MDTypography>
            </MDBox>
          ) : (
            <DenunciaDetail denuncia={denuncia} />
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
