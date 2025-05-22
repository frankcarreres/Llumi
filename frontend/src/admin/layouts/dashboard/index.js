// @mui material components
import Grid from "@mui/material/Grid";

import denunciasPeticiones from "hooks/denunciasPeticiones";
import { useMemo } from "react";
//data
import casosResueltos from "./data/casoResueltos";
import casosPorTiempo from "./data/casosPorTiempo";
import casosActivosPorMes from "./data/casosActivoPorMes";
import DashboardLayout from "admin/widgets/LayoutContainers/DashboardLayout";
import MDBox from "admin/components/MDBox";
import ReportsBarChart from "admin/widgets/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "admin/widgets/Charts/LineCharts/ReportsLineChart";
import DashboardNavbar from "admin/widgets/Navbars/DashboardNavbar";
import Casos from "./components/Casos";
import Footer from "admin/widgets/Footer";

function Dashboard() {
  const { rowsData, loading } = denunciasPeticiones({ withEdit: false });
  //ignore
  const casos_por_tiempo = useMemo(() => {
    if (loading) return { year: { labels: [], datasets: {} } };
    return casosPorTiempo(rowsData);
  }, [rowsData, loading]);

  const cResueltos = useMemo(() => {
    if (loading) return { cResueltos: { labels: [], datasets: {} } };
    return casosResueltos(rowsData);
  }, [rowsData, loading]);

  const cActivos = useMemo(() => {
    if (loading) return { cResueltos: { labels: [], datasets: {} } };
    return casosActivosPorMes(rowsData);
  }, [rowsData, loading]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart color="info" title="Casos por año" chart={casos_por_tiempo}  date={}/>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart color="warning" title="Casos" date="" chart={cActivos} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart color="success" title="Casos resueltos" chart={cResueltos}  date={}/>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Casos />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
