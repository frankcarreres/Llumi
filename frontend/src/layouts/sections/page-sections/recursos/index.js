// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";

// PageHeaders page components
import CarruselTarjetes from "./components/CarruselTarjetes";

// PageHeaders page components code
function PageHeaders() {
  return (
    <BaseLayout
      title="Recursos"
      breadcrumb={[
        { label: "Inici", route: "/sections/page-sections/featuers" },
        { label: "Recursos" },
      ]}
    >
      <CarruselTarjetes />
    </BaseLayout>
  );
}

export default PageHeaders;
