import React, { useState } from "react";
import { login, loginCentro } from "services/api";

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
import bgImage from "assets/bg.gif";
import InputAnimado from "./components/InputAnimado";
import BotonLuminoso from "./components/BotonLuminoso";

import publicRoutes from "../../../routes/publicRoutes";
import { isCentro, isUsuario, saveSession } from "utils/session";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Importación del componente InputAnimado

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleLogin = async (e) => {
    e.preventDefault();
    // Resetear errores
    setErrorEmail("");
    setErrorContrasena("");

    // Detectar tipo de identificador
    const esUsuario = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const esCentro = /^\d+$/.test(email);
    // Validaciones locales
    if (!email) {
      setErrorEmail("El campo ‘Usuario’ es obligatorio.");
      return;
    }
    if (!esUsuario && !esCentro) {
      setErrorEmail("El identificador debe ser un email o un ID numérico.");
      return;
    }
    if (!contrasena) {
      setErrorContrasena("La contraseña es obligatoria.");
      return;
    }

    // Intentar login
    try {
      const response = esUsuario
        ? await login(email, contrasena)
        : await loginCentro(email, contrasena);

      console.log(response);

      const { token, usuario, centro } = response;
      if (centro) centro.rol = "centro";
      const baseData = usuario ?? centro;
      const sessionData = {
        ...baseData,
        loginWeb: true, // ¡aquí lo ajustas!
      };
      saveSession({ token, data: sessionData }, rememberMe);

      if (isUsuario()) {
        navigate("/");
      } else if (isCentro()) {
        navigate("/admin/panel");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login fallido:", err);
      if (err.message === "CAMBIO_OBLIGATORIO") {
        return navigate("/pages/authentication/reset-password");
      }

      const msg = err.message || "Error de conexión";
      if (msg.toLowerCase().includes("no existe")) {
        setErrorEmail(msg);
      } else {
        setErrorContrasena(msg);
      }
    }
  };

  return (
    <>
      <DefaultNavbar routes={publicRoutes} sticky brand="Llumí" />
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
                      placeholder="Usuario"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorEmail && (
                      <MKTypography
                        variant="caption"
                        color="error"
                        sx={{
                          display: "block",
                          width: "100%",
                          mt: 0.5,
                          pl: 2,
                          fontSize: "0.9375rem",
                          textAlign: "left",
                          lineHeight: 1.2,
                        }}
                      >
                        {errorEmail}
                      </MKTypography>
                    )}
                  </MKBox>
                  <MKBox mb={2} sx={{ width: "100%" }}>
                    {/* 1) Wrapper solo para input + ojo */}
                    <MKBox sx={{ position: "relative" }}>
                      <InputAnimado
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                      />
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        size="small"
                        sx={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          padding: "8px",
                          color: "#555",
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffRounded fontSize="small" />
                        ) : (
                          <VisibilityRounded fontSize="small" />
                        )}
                      </IconButton>
                    </MKBox>
                    {errorContrasena && (
                      <MKTypography
                        variant="caption"
                        color="error"
                        sx={{
                          display: "block",
                          fontSize: "0.9375rem",
                          pl: 5,
                          textAlign: "left",
                          lineHeight: 1.2,
                        }}
                      >
                        {errorContrasena}
                      </MKTypography>
                    )}
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
                    <BotonLuminoso onClick={handleLogin} text="Accedir" />
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Has olvidado tu contraseña?
                      <MKTypography
                        component="button"
                        onClick={() => navigate("/pages/authentication/reset-password")}
                        variant="button"
                        fontWeight="medium"
                        textGradient={false}
                        sx={{
                          background: "none",
                          border: "none",
                          p: 0,
                          ml: 1,
                          color: "rgba(221, 90, 27, 0.7)",
                          cursor: "pointer",
                          textDecoration: "none",
                          "&:hover": {
                            color: "rgba(221, 90, 27, 1)",
                          },
                        }}
                      >
                        Cambiarla{" "}
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
