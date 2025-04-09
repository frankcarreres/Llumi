import { useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/inici2.jpg";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        light
        brand="Llumí"
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      fullWidth
                      placeholder="Usuari"
                      variant="outlined"
                      InputProps={{
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "32px",
                            "& fieldset": {
                              borderColor: "gray", // color por defecto
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgba(221, 90, 27, 0.7)", // color cuando está activo
                            },
                          },
                        },
                      }}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      fullWidth
                      placeholder="Contrasenya"
                      variant="outlined"
                      InputLabelProps={{ shrink: false }}
                      InputProps={{
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "32px",
                          },
                        },
                      }}
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Recorda-m&apos;ho
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      fullWidth
                      sx={{
                        backgroundColor: "rgba(221, 90, 27, 0.8)",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "rgba(221, 90, 27, 0.9)", // color al hacer hover
                        },
                      }}
                    >
                      accedir
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      No tens un conter?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        fontWeight="medium"
                        textGradient={false} // Desactivamos textGradient para que no sobrescriba el color
                        sx={{
                          color: "rgba(221, 90, 27, 0.7)",
                          textDecoration: "none", // por si no quieres subrayado
                          "&:hover": {
                            color: "rgba(221, 90, 27, 1)", // un poco más fuerte al hacer hover
                          },
                        }}
                      >
                        Registrat
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;
