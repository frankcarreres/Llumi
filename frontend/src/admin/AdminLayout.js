import { useState, useEffect } from "react";

// react-router components
import { useLocation, Outlet } from "react-router-dom";
import adminRoutes from "routes/adminRoutes";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 components
import MDBox from "admin/components/MDBox";

// Material Dashboard 2 examples
import Configurator from "admin/examples/Configurator";
import Sidenav from "admin/examples/Sidenav";

// Material Dashboard 2 React themes
import theme from "admin/assets/theme";
// import theme from "assets/theme";
import themeDark from "admin/assets/theme-dark";

import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "admin/context";

// Images
import brandWhite from "admin/assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

export default function AdminLayout() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Toggle configurator
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", "ltr");
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <>
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Llumi Admin"
          routes={adminRoutes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        {openConfigurator && <Configurator />}
        {configsButton}
      </>
      {layout === "vr" && <Configurator />}
      <Outlet />
    </ThemeProvider>
  );
}
