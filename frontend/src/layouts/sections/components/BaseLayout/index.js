/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CenteredFooter from "examples/Footers/CenteredFooter";
import Breadcrumbs from "examples/Breadcrumbs";

// Routes
import Icon from "@mui/material/Icon";

const navbarRoutes = [
  {
    name: "Recursos",
    key: "recursos",
    icon: <Icon>menu_book</Icon>,
    route: "/sections/recursos/inici",
    collapse: [
      {
        name: "Informatius",
        key: "rec-info",
        icon: <Icon>chrome_reader_mode</Icon>,
        route: "/sections/recursos/info",
      },
      {
        name: "Multimèdia",
        key: "rec-multi",
        icon: <Icon>video_library</Icon>,
        route: "/sections/recursos/multimedia",
      },
      {
        name: "Centre",
        key: "rec-centre",
        icon: <Icon>school</Icon>,
        route: "/sections/recursos/centre",
      },
    ],
  },
  {
    name: "Denúncia",
    key: "denuncia",
    icon: <Icon>report</Icon>,
    route: "/sections/denuncia",
  },
  {
    name: "Mi cuenta",
    key: "cuenta",
    icon: <Icon>person</Icon>,
    collapse: [],
  },
];
function BaseLayout({ breadcrumb, title, children }) {
  return (
    <MKBox display="flex" flexDirection="column" bgColor="white" minHeight="100vh">
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          brand="Llumí"
          routes={navbarRoutes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "free download",
            color: "info",
          }}
          transparent
          relative
        />
      </MKBox>
      <Container sx={{ mt: 6 }}>
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
  breadcrumb: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
