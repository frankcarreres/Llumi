// Sections components
import BaseLayout from "../../components/BaseLayout";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import React from "react";

// PageHeaders page components code
function RecursCentre() {
  return (
    <BaseLayout
      title="Recursos centre"
      breadcrumb={[
        { label: "Inici", route: "/pages/presentation" },
        { label: "Recursos", route: "/sections/recursos/inici" },
        { label: "Recursos centre" },
      ]}
    >
      {" "}
      <MKBox mt={2} />
      <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        {" "}
      </MKTypography>{" "}
      <MKBox mt={6} />
      <MKTypography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        {" "}
      </MKTypography>{" "}
    </BaseLayout>
  );
}

export default RecursCentre;
