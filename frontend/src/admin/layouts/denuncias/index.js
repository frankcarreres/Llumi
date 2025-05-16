import denunciasPeticiones from "admin/hooks/denunciasPeticiones";
import { useParams } from "react-router-dom";
import Footer from "admin/widgets/Footer";
import DenunciaDetail from "admin/components/MDDenuncia/DenunciaDetail";
import MDTypography from "admin/components/MDTypography";
import MDBox from "admin/components/MDBox";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardNavbar from "admin/widgets/Navbars/DashboardNavbar";
import DashboardLayout from "admin/widgets/LayoutContainers/DashboardLayout";

export default function DenunciaPage() {
  const { id_denuncia } = useParams();
  const { rowsData, loading } = denunciasPeticiones({
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
