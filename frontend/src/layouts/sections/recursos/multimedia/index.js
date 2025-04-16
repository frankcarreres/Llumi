// Sections components
import BaseLayout from "../../components/BaseLayout";

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
    ></BaseLayout>
  );
}

export default RecursMultimedia;
