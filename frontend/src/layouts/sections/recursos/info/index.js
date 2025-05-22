import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CarruselNoticias from "./components/CarruselNoticias";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";

function RecursInfo() {
  return (
    <BaseLayout
      breadcrumb={[
        { label: "Inicio", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos informativos" },
      ]}
    >
      <MKBox mt={2} />
      <MKTypography
        variant="h4"
        fontWeight="light"
        textAlign="center"
        mb={3}
        sx={{
          backgroundColor: "#7b869b",
          color: "white !important",
          display: "inline-block",
          px: 2,
          py: 1,
          borderRadius: "3px",
        }}
      >
        NOTICIAS DESTACADAS
      </MKTypography>

      <CarruselNoticias destacadas={true} />
      <MKBox mt={8} />
      <MKTypography
        variant="h4"
        fontWeight="light"
        textAlign="center"
        mb={3}
        sx={{
          backgroundColor: "#7b869b",
          color: "white !important",
          display: "inline-block",
          px: 2,
          py: 1,
          borderRadius: "3px",
        }}
      >
        ÚLTIMAS NOTICIAS
      </MKTypography>
      <CarruselNoticias />
    </BaseLayout>
  );
}

export default RecursInfo;
