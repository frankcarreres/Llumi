// Sections components
import BaseLayout from "../../components/BaseLayout";
import CarruselMultimedia from "./components/CarruselMultimedia";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";
import React from "react";

// PageHeaders page components code
function RecursMultimedia() {
  return (
    <BaseLayout
      title="Recursos multimedia"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos multimèdia" },
      ]}
    >
      <MKBox mt={2} />
      <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Vídeos{" "}
      </MKTypography>{" "}
      <CarruselMultimedia tipo="video" />
      <MKBox mt={6} />
      <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Pòdcasts/Entrevistes{" "}
      </MKTypography>{" "}
      <CarruselMultimedia tipo="podcast" />
    </BaseLayout>
  );
}

export default RecursMultimedia;
