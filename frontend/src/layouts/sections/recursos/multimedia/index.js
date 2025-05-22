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
      // title="recursos multimedia"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos multimèdia" },
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
        VÍDEOS FORMATIUS
      </MKTypography>
      <CarruselMultimedia tipo="video" />
      <MKBox mt={6} />
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
        PÒDCASTS/ENTREVISTES
      </MKTypography>
      <CarruselMultimedia tipo="podcast" />
    </BaseLayout>
  );
}

export default RecursMultimedia;
