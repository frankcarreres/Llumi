// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Footer from "../../examples/Footer";
import MDBox from "../../components/MDBox";
import Header from "./components/Header";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}></Grid>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}></Grid>
            <Grid item xs={12} xl={4}></Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
