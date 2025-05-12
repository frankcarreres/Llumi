import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, loginCentro } from "../../Presentation/components/chat/services/api";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Layout routes
import { useNavigate } from "react-router-dom";

// Imagenes
import bgImage from "assets/images/inici2.jpg";
import InputAnimado from "./components/InputAnimado";
import BotonLuminoso from "./components/BotonLuminoso";
import Cookies from "js-cookie";
import Icon from "@mui/material/Icon";
import SignIn from "../../../pages/LandingPages/SignIn";

// Importación del componente InputAnimado

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();
  const navbarRoutes = [
    {
      name: "Recursos",
      key: "recursos",

      route: "/sections/recursos/inici",
      collapse: [
        {
          name: "Informatius",
          key: "rec-info",

          route: "/sections/recursos/info",
        },
        {
          name: "Multimèdia",
          key: "rec-multi",

          route: "/sections/recursos/multimedia",
        },
        {
          name: "Centre",
          key: "rec-centre",

          route: "/sections/recursos/centre",
        },
      ],
    },
    {
      name: "Denúncia",
      key: "denuncia",

      route: "/sections/denuncia",
    },
    {
      name: "Mi cuenta",
      key: "cuenta",
      icon: <Icon>person</Icon>,
      collapse: [
        {
          name: "Iniciar sessió",
          key: "login",
          route: "/pages/authentication/sign-in",
          component: <SignIn />,
        },
      ],
    },
  ];
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleLogin = async (e) => {
    e.preventDefault();

    const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    try {
      let data;

      if (esEmail) {
        // Login como usuario normal
        data = await login(email, contrasena);
      } else {
        // Login como centro
        data = await loginCentro(email, contrasena);
      }

      console.log("Login exitoso:", data);

      const tipo = esEmail ? "usuario" : "centro";
      const nombre = data.usuario?.nombre || data.nombre || "Centro";

      Cookies.set("token", data.token);
      sessionStorage.setItem(
        "sesion",
        JSON.stringify({
          tipo,
          nombre,
        })
      );
      console.log(data);
      console.log(tipo);
      if (tipo === "centro") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login visual fallido:", error);
      alert(error.message || "Error de connexió");
    }
  };

  return (
    <>
      <DefaultNavbar
        routes={navbarRoutes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        sticky
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
                    <InputAnimado
                      type="text"
                      placeholder="Usuari"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <InputAnimado
                      type="password"
                      placeholder="Contrasenya"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch
                      checked={rememberMe}
                      onChange={handleSetRememberMe}
                      sx={{ ml: "32px" }} // Agrega margin-left de 16px
                    />
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
                    <BotonLuminoso onClick={handleLogin} />
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      No tens un conter?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        fontWeight="medium"
                        textGradient={false}
                        sx={{
                          color: "rgba(221, 90, 27, 0.7)",
                          textDecoration: "none",
                          "&:hover": {
                            color: "rgba(221, 90, 27, 1)",
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
