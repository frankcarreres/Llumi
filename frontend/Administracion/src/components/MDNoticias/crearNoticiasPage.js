// src/components/CreateNoticiaForm.js
// Formulario para crear noticias (tipo fijo "artículo").
// Usa el hook useCrearNoticia para realizar la petición y mantiene
// validación de imagen ≤ 5 MB. Convierte la imagen a Base64 antes de enviar.

import React, { useState } from "react";
import PropTypes from "prop-types";

// @mui
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Hook para crear noticias
import useCrearNoticia from "hook/crearNoticias";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../MDBox";
import Icon from "@mui/material/Icon"; // ajusta la ruta según tu estructura

export default function CreateNoticiaForm({ onCreated }) {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [url, setUrl] = useState("");
  const [destacada, setDestacada] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [formError, setFormError] = useState(null); // validación local

  const { createNoticia, loading, error: apiError, data: apiData } = useCrearNoticia();

  /* ---------- utils ---------- */
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /* ---------- handlers ---------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setImgError("La imagen supera 5 MB ✖");
      setImgFile(null);
    } else {
      setImgError(null);
      setImgFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!titulo || !contenido) {
      setFormError("Título y contenido son obligatorios");
      return;
    }
    if (imgError) return;

    try {
      let imgBase64 = null;
      if (imgFile) {
        imgBase64 = await fileToBase64(imgFile);
      }

      const respuesta = await createNoticia({
        titulo,
        contenido,
        url,
        img: imgBase64, // puede ser null
        destacada: destacada ? 1 : 0,
      });

      if (onCreated) onCreated(respuesta);
      // limpia el formulario tras éxito
      setTitulo("");
      setContenido("");
      setUrl("");
      setDestacada(false);
      setImgFile(null);
    } catch (_) {
      /* El error ya viene del hook → apiError */
    }
  };

  /* ---------- render ---------- */
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          <Card component="form" onSubmit={handleSubmit}>
            {/* Header */}
            <Box
              sx={{
                mx: 2,
                mt: -3,
                py: 3,
                px: 2,
                borderRadius: "12px",
                background: (theme) => theme.palette.info.main,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" color="common.white">
                Nueva noticia
              </Typography>
            </Box>

            <Box pt={3} px={3} pb={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Título *"
                    fullWidth
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Contenido *"
                    multiline
                    rows={6}
                    fullWidth
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="URL (opcional)"
                    fullWidth
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Grid>

                {/* Selector de imagen */}
                <Grid item xs={12} sm={6}>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="img-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="img-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      startIcon={<Icon>upload_file</Icon>}
                      sx={{
                        color: imgFile ? "success.main" : "text.primary",
                        borderColor: imgFile ? "success.main" : "primary.main",
                        textTransform: "none",
                      }}
                    >
                      <Typography component="span" variant="body2" sx={{ color: "inherit" }}>
                        {imgFile ? "Imagen seleccionada ✔" : "Subir imagen (≤5 MB)"}
                      </Typography>
                    </Button>
                  </label>
                  {imgError && (
                    <Typography variant="caption" color="error">
                      {imgError}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={destacada}
                        onChange={(e) => setDestacada(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Destacar noticia"
                  />
                </Grid>

                {/* Mensajes de error/éxito */}
                {(formError || apiError) && (
                  <Grid item xs={12}>
                    <Typography color="error.main">{formError || apiError}</Typography>
                  </Grid>
                )}
                {apiData && (
                  <Grid item xs={12}>
                    <Typography color="success.main">
                      Artículo creado con id #{apiData.id_recurso} ✔
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? "Creando…" : "Crear"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

CreateNoticiaForm.propTypes = {
  /** Callback con la respuesta del backend */
  onCreated: PropTypes.func,
};
