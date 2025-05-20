import React, { useState } from "react";
import { resetPassword } from "../../Presentation/components/chat/services/api";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import BotonLuminoso from "pages/LandingPages/SignIn/components/BotonLuminoso";
import InputAnimado from "pages/LandingPages/SignIn/components/InputAnimado";
import publicRoutes from "routes/publicRoutes";
import { useNavigate } from "react-router-dom";
import bgImage from "assets/images/inici2.jpg";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorNew, setErrorNew] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorNew("");
    setErrorConfirm("");

    if (!email) {
      setErrorEmail("El campo ‘Usuario’ es obligatorio.");
      return;
    }

    if (!newPassword) {
      setErrorNew("La nueva contraseña es obligatoria.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorNew("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorConfirm("Las contraseñas no coinciden.");
      return;
    }

    try {
      await resetPassword(email, newPassword, confirmPassword);
      navigate("/", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || "Error de actualización";
      setErrorNew(msg);
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
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox pt={4} pb={3} px={3} component="form" onSubmit={handleSubmit}>
                <MKTypography variant="h5" mb={2} textAlign="center">
                  Cambiar su contraseña
                </MKTypography>
                <MKBox mb={2}>
                  <InputAnimado
                    type="text"
                    placeholder="Email"
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
                <MKBox mb={2}>
                  <InputAnimado
                    type={showPassword ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {errorNew && (
                    <MKTypography
                      variant="caption"
                      color="error"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {errorNew}
                    </MKTypography>
                  )}
                </MKBox>
                <MKBox mb={2} sx={{ position: "relative" }}>
                  <InputAnimado
                    type={showPassword ? "text" : "password"}
                    placeholder="Repetir contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar" : "Mostrar"}
                    size="small"
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                  </IconButton>
                  {errorConfirm && (
                    <MKTypography
                      variant="caption"
                      color="error"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {errorConfirm}
                    </MKTypography>
                  )}
                </MKBox>
                <MKBox mt={4}>
                  <BotonLuminoso type="submit" text="Actualizar contraseña" />
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}
