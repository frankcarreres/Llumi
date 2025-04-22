import React, { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [rowsData, setRowsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
  // Suponiendo que el token se obtiene, por ejemplo, desde localStorage:
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9jZW50cm8iOjEsIm5vbWJyZSI6IklFUyBHYWxpbGVvIiwiaWF0IjoxNzQ0Nzk2OTE4LCJleHAiOjE3NDU0MDE3MTh9.TZQcEFWb-wm56mhxP6IuNTwX6gtnO-mSHGolFsC5a90";

  // Función para obtener los datos de la API con petición POST
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/denuncias/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        new Error("Error al obtener datos de la API");
      }
      const data = await response.json();
      // Se espera que la respuesta tenga una propiedad "denuncias"
      setRowsData(data.denuncias);
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // eslint-disable-next-line react/prop-types
  const Denuncia = ({ id_denuncia, descripcion }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`Denuncia #${id_denuncia}`}
        </MDTypography>
        <MDTypography variant="caption">{descripcion}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // Componente para la columna "Tipo de acoso"
  // eslint-disable-next-line react/prop-types
  const Tipo = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  // Función para convertir la respuesta de la API en las filas del DataTable
  const getRows = () => {
    if (loading) return [];

    return rowsData.map((row) => {
      // Determinar el color del badge en función del estado
      // Se utiliza toLowerCase() para una comparación insensible a mayúsculas/minúsculas.
      let badgeColor = "error";
      if (row.estado.toLowerCase() === "resuelto") badgeColor = "success";
      else if (row.estado.toLowerCase() === "en progreso") badgeColor = "info";
      else if (row.estado.toLowerCase() === "pendiente") badgeColor = "warning";

      // Formatear la fecha de denuncia a un formato legible
      const formattedDate = new Date(row.fecha_denuncia).toLocaleDateString();

      return {
        casos: <Denuncia id_denuncia={row.id_denuncia} descripcion={row.descripcion} />,
        tipos: <Tipo title={row.tipo_acoso} />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={row.estado} color={badgeColor} variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {formattedDate}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      };
    });
  };

  return {
    columns: [
      { Header: "Denuncia", accessor: "casos", width: "30%", align: "left" },
      { Header: "Tipo de acoso", accessor: "tipos", align: "left" },
      { Header: "Estado", accessor: "estodo", align: "center" },
      { Header: "Fecha de incidencia", accessor: "fecha", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],
    rows: getRows(),
  };
}
