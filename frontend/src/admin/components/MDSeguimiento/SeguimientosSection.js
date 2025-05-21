import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";
import MDInput from "admin/components/MDInput";
import MDButton from "admin/components/MDButton";
import { useSeguimientos } from "admin/hooks/seguimientos";

export default function SeguimientosSection({ idDenuncia }) {
  const { seguimientos, loading, crearSeguimiento } = useSeguimientos(idDenuncia);
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) {
      setError("El comentario no puede estar vacío.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const result = await crearSeguimiento(comentario.trim());

    if (!result.ok) {
      setError(result.error || "Error al guardar seguimiento.");
    } else {
      setComentario("");
    }

    setSubmitting(false);
  };

  const formatDate = (iso) =>
    iso
      ? new Date(iso).toLocaleString("es-ES", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-";

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h6" gutterBottom>
          Seguimientos
        </MDTypography>
        <MDBox component="form" onSubmit={handleSubmit} mb={2}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={9}>
              <MDInput
                multiline
                rows={3}
                fullWidth
                placeholder="Añadir seguimiento..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                disabled={submitting}
              />
              {error && (
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              <MDButton
                type="submit"
                variant="gradient"
                color="info"
                fullWidth
                disabled={submitting}
              >
                {submitting ? "Guardando..." : "Guardar"}
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>

        {loading ? (
          <MDTypography> Cargando seguimientos... </MDTypography>
        ) : seguimientos.length === 0 ? (
          <MDTypography>No hay seguimientos aún.</MDTypography>
        ) : (
          <MDBox>
            {seguimientos.map((s) => (
              <MDBox
                key={s.id_seguimiento}
                mb={2}
                p={2}
                borderRadius="lg"
                variant="gradient"
                bgColor="light"
              >
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <MDTypography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {s.comentario}
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <MDTypography variant="caption" color="text">
                      {formatDate(s.fecha)}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            ))}
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

SeguimientosSection.propTypes = {
  idDenuncia: PropTypes.number.isRequired,
};
