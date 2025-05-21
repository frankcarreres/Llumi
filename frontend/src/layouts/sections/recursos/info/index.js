import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CarruselNoticias from "./components/CarruselNoticias";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";

function RecursInfo() {
  return (
    <BaseLayout
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "recursos", route: "/sections/recursos/inici" },
        { label: "recursos informatius" },
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
        NOTÍCIES DESTACADES
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
        ÚLTIMES NOTÍCIES
      </MKTypography>
      <CarruselNoticias />
    </BaseLayout>
  );
}

export default RecursInfo;
