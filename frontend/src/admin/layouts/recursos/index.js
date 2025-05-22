import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import hayCambiosSinGuardar from "hooks/confirmacionCambios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import useCrearNoticia from "hooks/crearNoticias";
import DashboardNavbar from "admin/widgets/Navbars/DashboardNavbar";
import DashboardLayout from "admin/widgets/LayoutContainers/DashboardLayout";
import MDBox from "admin/components/MDBox";
import EditorArticulo from "admin/components/MDQuill/MDEditor";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { exportToPDF } from "utils/exportToPDF";

function CreateNoticiaForm({ onCreated }) {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [url, setUrl] = useState("");
  const [destacada, setDestacada] = useState(false);
  const [hayCambios, setHayCambios] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "" });

  const { createNoticia, loading, error: apiError, data: apiData } = useCrearNoticia();

  /* ── Aviso antes de salir ── */
  hayCambiosSinGuardar(hayCambios);

  /* ── Recuperar borrador ── */
  useEffect(() => {
    const guardado = localStorage.getItem("borrador_articulo");
    if (guardado) setContenido(guardado);
  }, []);
  /* ---------- handlers ---------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setImgError("La imagen supera 5 MB ✖");
      setImgFile(null);
    } else {
      setImgError(null);
      setImgFile(file);
    }
  };

  const handleEditorChange = (html) => {
    setContenido(html);
    setHayCambios(true);
    localStorage.setItem("borrador_articulo", html);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!titulo || !contenido || contenido.replace(/<[^>]+>/g, "").trim() === "") {
      setFormError("Título y contenido son obligatorios");
      return;
    }

    try {
      const data = await createNoticia({
        titulo,
        contenido,
        url,
        img: null,
        destacada: destacada ? 1 : 0,
      });

      if (onCreated) onCreated(data);
      setTitulo("");
      setContenido("");
      setUrl("");
      setDestacada(false);
      setHayCambios(false);
      localStorage.removeItem("borrador_articulo");
    } catch (_) {
      /* apiError ya lo muestra */
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      // 👉  crea URL temporal y guarda
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setHayCambios(true);
    } else {
      // si no es PDF lo sigues tratando como .html o .txt
      file.text().then((text) => {
        setContenido(text);
        setHayCambios(true);
      });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          <Card component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                mx: 2,
                mt: -3,
                py: 3,
                px: 2,
                borderRadius: 2,
                background: (t) => t.palette.info.main,
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
                  <Typography variant="subtitle2">Contenido *</Typography>
                  <EditorArticulo value={contenido} onChange={handleEditorChange} />
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
                        {imgFile ? "Imagen seleccionada ✔" : "Subir imagen (≤5 MB)"}
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
                      />
                    }
                    label="Destacar noticia"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    onClick={() => exportToPDF(contenido, titulo)}
                    fullWidth
                    startIcon={<Icon>picture_as_pdf</Icon>}
                    sx={{ color: "#000" }}
                  >
                    <Typography component="span" variant="body2" sx={{ color: "#000" }}>
                      Descargar PDF
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    startIcon={<Icon>upload_file</Icon>}
                    sx={{ color: "#000" }}
                  >
                    <Typography component="span" variant="body2" sx={{ color: "#000" }}>
                      Cargar artículo
                    </Typography>
                    <input
                      type="file"
                      accept=".html,.txt, .pdf"
                      hidden
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Grid>

                {pdfUrl && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Vista previa PDF:</Typography>
                    <iframe
                      src={pdfUrl}
                      style={{ width: "100%", height: 500, border: "1px solid #ccc" }}
                      title="preview-pdf"
                    />
                  </Grid>
                )}
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
                  <Button
                    type="submit"
                    onClick={() => exportToPDF(contenido, titulo)}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    <Typography component="span" variant="body2" sx={{ color: "#000" }}>
                      {loading ? "Creando…" : "Crear"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </MDBox>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ open: false, msg: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" sx={{ width: "100%" }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

CreateNoticiaForm.propTypes = {
  onCreated: PropTypes.func,
};
export default CreateNoticiaForm;
