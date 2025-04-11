/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Casos = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Tipo = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Casos", accessor: "casos", width: "30%", align: "left" },
      { Header: "Tipo de acoso", accessor: "tipos", align: "left" },
      { Header: "Estado", accessor: "estodo", align: "center" },
      { Header: "Fecha de incidencia", accessor: "fecha", align: "center" },
      { Header: "Acciones", accessor: "action", align: "center" },
    ],

    rows: [
      {
        casos: <Casos name="John Michael" email="john@creative-tim.com" />,
        tipos: <Tipo title="Ciberbullying" />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="En Proceso" color="info" variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        casos: <Casos name="Alexa Liras" email="alexa@creative-tim.com" />,
        tipos: <Tipo title="Social" />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Resuelto" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        casos: <Casos name="Laurent Perrier" email="laurent@creative-tim.com" />,
        tipos: <Tipo title="Psicológico" />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="En proceso" color="info" variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        casos: <Casos name="Michael Levi" email="michael@creative-tim.com" />,
        tipos: <Tipo title="Social" />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pendiente" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        casos: <Casos name="Richard Gran" email="richard@creative-tim.com" />,
        tipos: <Tipo title="Ciberbullying" />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Resuelto" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        casos: <Casos name="Miriam Eric" email="miriam@creative-tim.com" />,
        tipos: <Tipo title="Social" />,
        estodo: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Rechazada" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        fecha: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
