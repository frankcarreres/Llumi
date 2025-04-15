import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CarruselNoticias from "./components/CarruselNoticias";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";

function RecursInfo() {
  return (
    <BaseLayout
      title="Recursos informatius"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos informatius" },
      ]}
    >
      <MKBox mt={2} />
      <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Notícies Destacades{" "}
      </MKTypography>
      <CarruselNoticias destacadas={true} />
      <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Últimes Notícies{" "}
      </MKTypography>
      <CarruselNoticias />
    </BaseLayout>
  );
}

export default RecursInfo;
