import React from "react";
// Sections components
import BaseLayout from "../../components/BaseLayout";
import CarruselMultimedia from "components/RecursosComponents/CarruselMultimedia";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";
import { keyframes } from "@mui/system";

// Animación de fade-in y slide-up
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function RecursMultimedia() {
  return (
    <BaseLayout
      breadcrumb={[
        { label: "Inicio", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos multimedia" },
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
          animation: `${fadeInUp} 1s ease-out`,
        }}
      >
        VIDEOS FORMATIVOS
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
          animation: `${fadeInUp} 1s ease-out`,
          animationDelay: "0.5s",
          animationFillMode: "both",
        }}
      >
        PODCASTS/ENTREVISTAS
      </MKTypography>

      <CarruselMultimedia tipo="podcast" />
    </BaseLayout>
  );
}

export default RecursMultimedia;
