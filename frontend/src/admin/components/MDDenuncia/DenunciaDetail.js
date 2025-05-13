// src/components/DenunciaDetail.js

import React from "react";
import PropTypes from "prop-types";

// @mui
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "admin/components/MDTypography";
import MDBox from "admin/components/MDBox";

// Material Dashboard 2 React components

export default function DenunciaDetail({ denuncia }) {
  // formatea fechas a algo legible
  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }) : "-";

  // si las evidencias vienen como JSON-string, parsea
  const evidencias = (() => {
    if (!denuncia.evidencias) return [];
    try {
      return JSON.parse(denuncia.evidencias);
    } catch {
      return Array.isArray(denuncia.evidencias) ? denuncia.evidencias : [];
    }
  })();

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Detalle de la Denuncia #{denuncia.id_denuncia}
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <Grid cdisplay="flex" justifyContent="space-between" alignItems="center" p={3}>
          {/* Fila 1 */}
          <Grid item xs={12} sm={6}>
            <MDTypography variant="subtitle2" color="text">
              Fecha de denuncia
            </MDTypography>
            <MDTypography>{formatDate(denuncia.fecha_denuncia)}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="subtitle2" color="text">
              Estado
            </MDTypography>
            <MDTypography>{denuncia.estado}</MDTypography>
          </Grid>

          {/* Fila 2 */}
          <Grid item xs={12} sm={6}>
            <MDTypography variant="subtitle2" color="text">
              Tipo de acoso
            </MDTypography>
            <MDTypography>{denuncia.tipo_acoso}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="subtitle2" color="text">
              Usuario (ID)
            </MDTypography>
            <MDTypography>{denuncia.id_usuario}</MDTypography>
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <MDTypography variant="subtitle2" color="text">
              Descripción
            </MDTypography>
            <MDBox px={1}>
              <MDTypography>{denuncia.descripcion}</MDTypography>
            </MDBox>
          </Grid>

          {/* Evidencias */}
          <Grid item xs={12}>
            <MDTypography variant="subtitle2" color="text">
              Evidencias
            </MDTypography>
            {evidencias.length > 0 ? (
              <MDBox component="ul" pl={2} mt={0}>
                {evidencias.map((e, i) => (
                  <MDTypography component="li" key={i}>
                    {e}
                  </MDTypography>
                ))}
              </MDBox>
            ) : (
              <MDTypography color="text">—</MDTypography>
            )}
          </Grid>

          {/* Campos opcionales */}
          {denuncia.es_testigo && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                ¿Es testigo?
              </MDTypography>
              <MDTypography>{denuncia.es_testigo}</MDTypography>
            </Grid>
          )}
          {denuncia.nombre_victima && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                Nombre víctima
              </MDTypography>
              <MDTypography>{denuncia.nombre_victima}</MDTypography>
            </Grid>
          )}
          {denuncia.relacion_victima && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                Relación con víctima
              </MDTypography>
              <MDTypography>{denuncia.relacion_victima}</MDTypography>
            </Grid>
          )}
          {denuncia.nombre_acosador && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                Nombre acosador
              </MDTypography>
              <MDTypography>{denuncia.nombre_acosador}</MDTypography>
            </Grid>
          )}
          {denuncia.testigos && (
            <Grid item xs={12}>
              <MDTypography variant="subtitle2" color="text">
                Testigos
              </MDTypography>
              <MDBox px={1}>
                <MDTypography>{denuncia.testigos}</MDTypography>
              </MDBox>
            </Grid>
          )}
          {denuncia.nombre_testigo_extra && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                Nombre testigo extra
              </MDTypography>
              <MDTypography>{denuncia.nombre_testigo_extra}</MDTypography>
            </Grid>
          )}
          {denuncia.intervencion_docente && (
            <Grid item xs={12}>
              <MDTypography variant="subtitle2" color="text">
                Intervención docente
              </MDTypography>
              <MDBox px={1}>
                <MDTypography>{denuncia.intervencion_docente}</MDTypography>
              </MDBox>
            </Grid>
          )}
          {denuncia.nombre_docente && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                Nombre docente
              </MDTypography>
              <MDTypography>{denuncia.nombre_docente}</MDTypography>
            </Grid>
          )}
          {denuncia.fecha_resolucion && (
            <Grid item xs={12} sm={6}>
              <MDTypography variant="subtitle2" color="text">
                Fecha de resolución
              </MDTypography>
              <MDTypography>{formatDate(denuncia.fecha_resolucion)}</MDTypography>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

DenunciaDetail.propTypes = {
  denuncia: PropTypes.shape({
    id_denuncia: PropTypes.number.isRequired,
    id_usuario: PropTypes.number.isRequired,
    id_centro: PropTypes.number.isRequired,
    fecha_denuncia: PropTypes.string.isRequired,
    tipo_acoso: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    evidencias: PropTypes.string,
    es_testigo: PropTypes.string,
    nombre_victima: PropTypes.string,
    relacion_victima: PropTypes.string,
    nombre_acosador: PropTypes.string,
    testigos: PropTypes.string,
    nombre_testigo_extra: PropTypes.string,
    intervencion_docente: PropTypes.string,
    nombre_docente: PropTypes.string,
    estado: PropTypes.string.isRequired,
    fecha_resolucion: PropTypes.string,
  }).isRequired,
};
