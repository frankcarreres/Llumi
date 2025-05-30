// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import Breadcrumbs from "components/Breadcrumbs";

// Routes
import publicRoutes from "../../../../routes/publicRoutes";
import CenteredFooter from "components/Footers/CenteredFooter";

function BaseLayout({ breadcrumb, title, children }) {
  return (
    <MKBox display="flex" flexDirection="column" bgColor="#f0f2f5" minHeight="100vh">
      {/* Navbar fija */}
      <MKBox
        bgColor="white"
        py={0.25}
        sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <DefaultNavbar
          brand="Llumí"
          routes={publicRoutes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "free download",
            color: "info",
          }}
          sticky
        />
      </MKBox>

      {/* Contenido */}
      <Container sx={{ mt: 10 }}>
        <MKBox mt={4} />
        {/* Ajusta el margen superior */}
        <Grid container item xs={12} flexDirection="column" justifyContent="center" mx="auto">
          <MKBox width={{ xs: "100%", md: "50%", lg: "25%" }} mb={3}>
            <Breadcrumbs routes={breadcrumb} />
          </MKBox>
          <MKTypography variant="h3" mb={1}>
            {title}
          </MKTypography>
          {children}
        </Grid>
      </Container>

      <MKBox mt="auto">
        <CenteredFooter />
      </MKBox>
    </MKBox>
  );
}

// Typechecking props for the BaseLayout
BaseLayout.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  title: PropTypes.string,
  children: PropTypes.node,
};

BaseLayout.defaultProps = {
  children: null,
  title: "",
  breadcrumb: [],
};

export default BaseLayout;
