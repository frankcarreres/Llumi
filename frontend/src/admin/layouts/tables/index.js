// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// data
import authorsTableData from "./data/casosActivosTable";
// Material componentes
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";

// Meterial widgets
import Footer from "admin/widgets/Footer";
import DataTable from "admin/widgets/Tables/DataTable";
import DashboardNavbar from "admin/widgets/Navbars/DashboardNavbar";
import DashboardLayout from "admin/widgets/LayoutContainers/DashboardLayout";

function Tables() {
  const { columns, rows } = authorsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Casos Activos
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
